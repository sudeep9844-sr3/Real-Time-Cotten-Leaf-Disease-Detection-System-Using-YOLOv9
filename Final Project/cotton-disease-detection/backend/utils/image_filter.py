"""
Image Pre-filtering Module
Filters out non-leaf images before YOLO inference to reduce false positives
"""

import cv2
import numpy as np
from typing import Tuple, Dict

def analyze_image_for_leaves(image: np.ndarray) -> Dict:
    """
    Analyze if image likely contains leaves based on color distribution
    
    Args:
        image: BGR image array
    
    Returns:
        analysis: Dictionary with leaf likelihood metrics
    """
    
    # Convert to HSV for better color analysis
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Define green color range for leaves (in HSV)
    # Lower green (darker leaves)
    lower_green1 = np.array([35, 40, 40])
    upper_green1 = np.array([85, 255, 255])
    
    # Create mask for green pixels
    green_mask = cv2.inRange(hsv, lower_green1, upper_green1)
    
    # Calculate percentage of green pixels
    total_pixels = image.shape[0] * image.shape[1]
    green_pixels = np.count_nonzero(green_mask)
    green_percentage = (green_pixels / total_pixels) * 100
    
    # Analyze color variance (leaves have more uniform color than complex scenes)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    variance = np.var(gray)
    
    # Calculate average saturation (leaves tend to have moderate saturation)
    avg_saturation = np.mean(hsv[:, :, 1])
    
    return {
        'green_percentage': green_percentage,
        'variance': variance,
        'avg_saturation': avg_saturation,
        'likely_contains_leaves': green_percentage > 15,  # At least 15% green
        'confidence': min(green_percentage / 50, 1.0)  # Normalize to 0-1
    }

def should_process_image(image: np.ndarray, min_green_percentage: float = 10.0) -> Tuple[bool, str]:
    """
    Determine if image should be processed for disease detection
    
    Args:
        image: BGR image array
        min_green_percentage: Minimum percentage of green pixels required
    
    Returns:
        should_process: Boolean indicating if image should be processed
        reason: Reason for decision
    """
    
    analysis = analyze_image_for_leaves(image)
    
    if analysis['green_percentage'] < min_green_percentage:
        return False, f"Insufficient green content ({analysis['green_percentage']:.1f}%). Point camera at cotton leaves."
    
    return True, "Image appears to contain vegetation"

def filter_detections_by_context(
    detections: list,
    image: np.ndarray,
    min_confidence: float = 0.4
) -> Tuple[list, str]:
    """
    Filter detections based on image context and confidence
    
    Args:
        detections: List of YOLO detections
        image: Original image
        min_confidence: Minimum confidence threshold
    
    Returns:
        filtered_detections: Filtered list of detections
        message: Information message
    """
    
    if not detections:
        return [], "No detections found"
    
    # Analyze image
    analysis = analyze_image_for_leaves(image)
    
    # If image doesn't look like it contains leaves, filter aggressively
    if not analysis['likely_contains_leaves']:
        # Only keep very high confidence detections
        filtered = [d for d in detections if d['confidence'] > 0.7]
        if len(filtered) < len(detections):
            return filtered, "Low vegetation content - only high-confidence detections kept"
        return filtered, "Warning: Image may not contain cotton leaves"
    
    # Normal filtering - remove low confidence
    filtered = [d for d in detections if d['confidence'] >= min_confidence]
    
    if len(filtered) < len(detections):
        return filtered, f"Filtered {len(detections) - len(filtered)} low-confidence detections"
    
    return filtered, "All detections passed filtering"
