"""
FastAPI Backend for Cotton Leaf Disease Detection System
Main application file with all API endpoints
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
from datetime import datetime
import json
import numpy as np
import cv2

# Import custom modules
from models.yolo_inference import YOLOInference
from utils.severity_analysis import analyze_severity
from utils.recommendations import get_recommendations
from utils.ai_recommendations import generate_ai_recommendations
from utils.logging_utils import log_prediction, get_prediction_history
from utils.image_filter import should_process_image, filter_detections_by_context, analyze_image_for_leaves
from api.schemas import PredictionResponse, HealthResponse, HistoryResponse

# Initialize FastAPI app
app = FastAPI(
    title="Cotton Leaf Disease Detection API",
    description="Real-time disease detection using YOLOv9",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model instance
model = None

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    global model
    
    print("="*80)
    print("Cotton Leaf Disease Detection API - Starting Up")
    print("="*80)
    
    # Model weights path
    weights_path = os.getenv('MODEL_WEIGHTS', 'weights/best.pt')
    
    if not os.path.exists(weights_path):
        print(f"⚠ Warning: Model weights not found at {weights_path}")
        print("  Please place your trained model at backend/weights/best.pt")
        print("  API will start but predictions will fail until model is loaded")
    else:
        print(f"Loading model from: {weights_path}")
        model = YOLOInference(weights_path)
        print("✓ Model loaded successfully")
    
    print("="*80)

@app.get("/", response_model=dict)
async def root():
    """Root endpoint"""
    return {
        "message": "Cotton Leaf Disease Detection API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "predict_image": "/predict-image",
            "predict_video": "/predict-video",
            "pc_app": "/pc-app-endpoint",
            "history": "/history"
        }
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    Returns system status and model information
    """
    
    model_loaded = model is not None
    
    health_status = {
        "status": "healthy" if model_loaded else "degraded",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": model_loaded,
        "version": "1.0.0"
    }
    
    if model_loaded:
        health_status["model_info"] = {
            "type": "YOLOv9",
            "classes": model.class_names,
            "num_classes": len(model.class_names)
        }
    
    return health_status

@app.post("/predict-image", response_model=PredictionResponse)
async def predict_image(
    file: UploadFile = File(...),
    conf_threshold: float = 0.25,
    language: str = 'en',
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    """
    Predict diseases in uploaded image
    
    Args:
        file: Uploaded image file
        conf_threshold: Confidence threshold for detections
        language: Language code for recommendations (en, hi, te, kn)
    
    Returns:
        PredictionResponse with detections, severity, and AI-generated recommendations
    """
    
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please check server logs."
        )
    
    # Validate file type
    content_type = file.content_type
    if content_type is None:
        # Try to guess from filename
        if not file.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
             raise HTTPException(status_code=400, detail="File must be an image")
    elif isinstance(content_type, list):
        # Handle case where content_type is a list
        if not any(ct.startswith('image/') for ct in content_type):
             raise HTTPException(status_code=400, detail="File must be an image")
    elif not content_type.startswith('image/'):
        raise HTTPException(
            status_code=400,
            detail="File must be an image"
        )
    
    try:
        # Read image
        contents = await file.read()
        
        # Convert to numpy array for pre-filtering
        import io
        from PIL import Image as PILImage
        pil_image = PILImage.open(io.BytesIO(contents))
        image_array = np.array(pil_image)
        
        # Convert RGB to BGR if needed
        if len(image_array.shape) == 3 and image_array.shape[2] == 3:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_RGB2BGR)
        
        # Pre-filter: Check if image likely contains leaves
        should_process, reason = should_process_image(image_array, min_green_percentage=8.0)
        
        # Analyze image for leaf content
        leaf_analysis = analyze_image_for_leaves(image_array)
        
        # Run inference
        results = model.predict(contents, conf_threshold=conf_threshold)
        
        # Post-filter: Filter detections based on context
        # Use higher confidence threshold if image doesn't look like leaves
        min_conf = 0.5 if not should_process else 0.35
        filtered_detections, filter_msg = filter_detections_by_context(
            results['detections'],
            image_array,
            min_confidence=min_conf
        )
        
        # Update results with filtered detections
        results['detections'] = filtered_detections
        
        # Analyze severity
        severity_info = analyze_severity(results['detections'], results['image_shape'])
        
        # Add warning if image doesn't appear to contain leaves
        if not should_process:
            severity_info['warning'] = reason
            severity_info['leaf_likelihood'] = leaf_analysis['green_percentage']
        
        # Get AI-powered recommendations (with automatic fallback to hardcoded)
        recommendations = generate_ai_recommendations(
            results['detections'], 
            severity_info,
            language=language
        )
        
        # Add filtering information to recommendations if detections were filtered
        if not should_process and len(filtered_detections) > 0:
            recommendations.insert(0, {
                'title': '⚠️ Warning',
                'content': reason + ' Detections may not be accurate.',
                'priority': 'high'
            })
        
        # Prepare response
        response = {
            "success": True,
            "timestamp": datetime.now().isoformat(),
            "filename": file.filename,
            "detections": results['detections'],
            "num_detections": len(results['detections']),
            "severity": severity_info,
            "recommendations": recommendations,
            "inference_time_ms": results['inference_time_ms'],
            "filter_info": {
                "green_percentage": round(leaf_analysis['green_percentage'], 2),
                "likely_contains_leaves": leaf_analysis['likely_contains_leaves'],
                "filter_message": filter_msg
            }
        }
        
        # Log prediction in background
        background_tasks.add_task(
            log_prediction,
            filename=file.filename,
            predictions=results['detections'],
            severity=severity_info
        )
        
        return response
        
    except Exception as e:
        import traceback
        with open("error.log", "a") as f:
            f.write(f"{datetime.now()}: {str(e)}\n")
            f.write(traceback.format_exc())
            f.write("\n")
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )

@app.post("/predict-video")
async def predict_video(
    file: UploadFile = File(...),
    conf_threshold: float = 0.25
):
    """
    Predict diseases in video frames
    Streams results for real-time detection
    
    Args:
        file: Uploaded video file
        conf_threshold: Confidence threshold
    
    Returns:
        Streaming response with frame-by-frame predictions
    """
    
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded"
        )
    
    # This is a placeholder for video streaming
    # Full implementation would process video frames
    return JSONResponse({
        "message": "Video prediction endpoint",
        "status": "Use /predict-image for individual frames or implement video streaming"
    })

@app.post("/pc-app-endpoint", response_model=PredictionResponse)
async def pc_app_endpoint(
    file: UploadFile = File(...),
    conf_threshold: float = 0.25
):
    """
    Dedicated endpoint for PC application
    Same as predict-image but with PC-specific optimizations
    
    Args:
        file: Uploaded image file
        conf_threshold: Confidence threshold
    
    Returns:
        PredictionResponse
    """
    
    # Reuse predict_image logic
    return await predict_image(file, conf_threshold, BackgroundTasks())

@app.get("/history", response_model=HistoryResponse)
async def get_history(limit: int = 50):
    """
    Get prediction history
    
    Args:
        limit: Maximum number of records to return
    
    Returns:
        List of historical predictions
    """
    
    try:
        history = get_prediction_history(limit=limit)
        
        return {
            "success": True,
            "count": len(history),
            "history": history
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve history: {str(e)}"
        )

@app.get("/stats")
async def get_statistics():
    """
    Get system statistics
    Returns aggregated statistics from prediction history
    """
    
    try:
        history = get_prediction_history(limit=1000)
        
        # Calculate statistics
        total_predictions = len(history)
        
        disease_counts = {}
        severity_counts = {"Mild": 0, "Moderate": 0, "Severe": 0, "Healthy": 0}
        
        for record in history:
            # Count diseases
            for detection in record.get('predictions', []):
                disease = detection.get('class_name', 'Unknown')
                disease_counts[disease] = disease_counts.get(disease, 0) + 1
            
            # Count severity
            severity = record.get('severity', {}).get('category', 'Unknown')
            if severity in severity_counts:
                severity_counts[severity] += 1
        
        return {
            "total_predictions": total_predictions,
            "disease_distribution": disease_counts,
            "severity_distribution": severity_counts,
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to calculate statistics: {str(e)}"
        )

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Endpoint not found", "path": str(request.url)}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": str(exc)}
    )

if __name__ == "__main__":
    # Run the application
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=1  # Use 1 worker for development, increase for production
    )


