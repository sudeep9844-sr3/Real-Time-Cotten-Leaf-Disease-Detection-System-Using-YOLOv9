@echo off
echo ========================================
echo Cotton Disease Detection - Frontend
echo ========================================
echo.

cd frontend

echo Checking Node version...
node --version
echo.

echo Starting frontend development server...
echo Frontend will be available at: http://localhost:3000
echo.

npm run dev
