@echo off
REM Shopping Agent Setup Script for Windows

echo ================================
echo Shopping Agent Setup
echo ================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detected
echo.

REM Setup Backend
echo ================================
echo Setting up Backend...
echo ================================
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
)

echo ✓ Backend dependencies installed

REM Check for .env file
if not exist ".env" (
    echo.
    echo ⚠️  .env file not found!
    echo Please create a .env file with:
    echo   GEMINI_API_KEY=your_api_key_here
    echo   PORT=5000
    echo   NODE_ENV=development
    echo.
    echo Get your API key from: https://makersuite.google.com/app/apikey
    echo.
    pause
)

cd ..
echo.

REM Setup Frontend
echo ================================
echo Setting up Frontend...
echo ================================
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

echo ✓ Frontend dependencies installed
cd ..
echo.

echo ================================
echo Setup Complete!
echo ================================
echo.
echo To start the application:
echo.
echo 1. Terminal 1 - Backend:
echo    cd backend
echo    npm start
echo.
echo 2. Terminal 2 - Frontend:
echo    cd frontend
echo    npm start
echo.
echo Frontend will open at: http://localhost:4200
echo Backend API at: http://localhost:5000
echo.
pause
