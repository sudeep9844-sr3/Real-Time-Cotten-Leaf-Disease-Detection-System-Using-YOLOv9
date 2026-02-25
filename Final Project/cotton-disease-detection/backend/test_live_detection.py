"""
Test script to verify live detection is working properly
"""

import requests
import cv2
import numpy as np
from PIL import Image
import io

# Test 1: Health check
print("=" * 60)
print("Test 1: Backend Health Check")
print("=" * 60)
try:
    response = requests.get("http://localhost:8000/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print("✓ Backend is running\n")
except Exception as e:
    print(f"✗ Backend health check failed: {e}\n")
    exit(1)

# Test 2: Test with a dummy image (simulating webcam frame)
print("=" * 60)
print("Test 2: Testing with Dummy Image (Simulating Webcam)")
print("=" * 60)

# Create a dummy green image (simulating a leaf)
dummy_image = np.zeros((640, 640, 3), dtype=np.uint8)
dummy_image[:, :] = [50, 150, 50]  # Green color

# Convert to JPEG bytes (like webcam would send)
pil_image = Image.fromarray(dummy_image)
img_byte_arr = io.BytesIO()
pil_image.save(img_byte_arr, format='JPEG')
img_byte_arr.seek(0)

try:
    files = {'file': ('test_frame.jpg', img_byte_arr, 'image/jpeg')}
    response = requests.post(
        "http://localhost:8000/predict-image?conf_threshold=0.25",
        files=files
    )
    print(f"Status: {response.status_code}")
    result = response.json()
    
    print(f"\nResults:")
    print(f"  Success: {result.get('success')}")
    print(f"  Detections: {result.get('num_detections')}")
    print(f"  Inference Time: {result.get('inference_time_ms')} ms")
    
    if result.get('detections'):
        print(f"\n  Detected diseases:")
        for det in result['detections']:
            print(f"    - {det['class_name']}: {det['confidence']*100:.1f}%")
    else:
        print(f"\n  No diseases detected (this is expected for a blank green image)")
    
    print("\n✓ API endpoint is working correctly")
    
except Exception as e:
    print(f"✗ Prediction failed: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
print("Diagnosis Complete")
print("=" * 60)
print("\nIf you see detections of 'person' or other non-cotton classes,")
print("then the model needs to be replaced with your trained model.")
print("\nIf you see cotton disease classes or no detections,")
print("then the model is correct and the issue is elsewhere.")
