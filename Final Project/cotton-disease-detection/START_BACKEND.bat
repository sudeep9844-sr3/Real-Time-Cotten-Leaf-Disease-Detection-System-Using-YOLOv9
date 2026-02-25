@echo off
echo ========================================
echo Cotton Disease Detection - Backend
echo ========================================
echo.

cd backend

echo Checking Python version...
python --version
echo.

echo Starting backend server...
echo Backend will be available at: http://localhost:8000
echo API docs will be at: http://localhost:8000/docs
echo.

uvicorn main:app --reload --host 0.0.0.0 --port 8000
