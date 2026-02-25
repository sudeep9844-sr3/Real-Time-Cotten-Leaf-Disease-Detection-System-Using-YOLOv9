# Live Detection Troubleshooting Guide

## Quick Diagnostic Steps

### Step 1: Verify Backend is Running
Open a browser and go to: `http://localhost:8000/health`

You should see a JSON response with:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_info": {
    "classes": ["Bacterial Blight", "Fusarium Wilt", "Healthy Leaf", "Leaf Curl Virus"]
  }
}
```

### Step 2: Check Frontend is Running  
Open: `http://localhost:3000`

The application should load.

### Step 3: Test Live Detection

1. Navigate to the "Live Detection" page
2. Click "Start Detection"
3. Allow camera permissions when prompted
4. Point camera at a cotton leaf (or any object for testing)

## Common Issues and Solutions

### Issue 1: "Model is detecting humans/cars/other objects"
**Cause**: Wrong model file (generic YOLO instead of cotton disease model)

**Solution**: Replace the model file at `backend/weights/best.pt` with your trained cotton disease model.

To check what your current model detects:
```powershell
cd backend
python -c "from ultralytics import YOLO; m = YOLO('weights/best.pt'); print(m.names)"
```

Expected output: `{0: 'Bacterial Blight', 1: 'Fusarium Wilt', 2: 'Healthy Leaf', 3: 'Leaf Curl Virus'}`

If you see classes like `person`, `car`, `dog`, etc., you need to replace the model.

### Issue 2: "No detections appearing"
**Possible causes**:
- Confidence threshold too high
- Camera not pointing at cotton leaves
- Poor lighting
- Model not trained well

**Solutions**:
- Lower confidence threshold (try 0.1 instead of 0.25)
- Ensure good lighting
- Point camera directly at cotton leaves
- Check if you're using the correct trained model

### Issue 3: "Camera not starting"
**Causes**:
- Browser permissions denied
- Camera in use by another application
- HTTPS required (some browsers)

**Solutions**:
- Allow camera permissions in browser
- Close other apps using camera
- Use Chrome or Edge browser

### Issue 4: "Backend not responding"
**Check**:
1. Is backend running? Look for terminal with uvicorn output
2. Is it running on port 8000?
3. Any errors in the backend terminal?

**Solution**: Restart backend from correct directory:
```powershell
cd "c:\Users\Sudeep Reddy K\Downloads\Final Project\Final Project\cotton-disease-detection\backend"
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Issue 5: "CORS errors in browser console"
**Solution**: Backend already has CORS enabled. If you still see errors, check that backend is running on port 8000.

## What to Check Now

Please tell me specifically what you're seeing:

1. **Does the camera start?** (Yes/No)
2. **Do you see any detections?** (Yes/No)
3. **If yes, what classes are being detected?** (e.g., "person", "Bacterial Blight", etc.)
4. **Any errors in browser console?** (Press F12 to open developer tools)
5. **Any errors in backend terminal?**

This information will help me pinpoint the exact issue!
