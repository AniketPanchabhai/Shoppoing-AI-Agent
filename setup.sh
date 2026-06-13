#!/bin/bash

# Shopping Agent Setup Script for macOS/Linux

echo "================================"
echo "Shopping Agent Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js detected: $(node --version)"
echo ""

# Setup Backend
echo "================================"
echo "Setting up Backend..."
echo "================================"
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install backend dependencies"
        exit 1
    fi
fi

echo "✓ Backend dependencies installed"

# Check for .env file
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  .env file not found!"
    echo "Please create a .env file with:"
    echo "  GEMINI_API_KEY=your_api_key_here"
    echo "  PORT=5000"
    echo "  NODE_ENV=development"
    echo ""
    echo "Get your API key from: https://makersuite.google.com/app/apikey"
    echo ""
fi

cd ..
echo ""

# Setup Frontend
echo "================================"
echo "Setting up Frontend..."
echo "================================"
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install frontend dependencies"
        exit 1
    fi
fi

echo "✓ Frontend dependencies installed"
cd ..
echo ""

echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "To start the application:"
echo ""
echo "1. Terminal 1 - Backend:"
echo "   cd backend"
echo "   npm start"
echo ""
echo "2. Terminal 2 - Frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "Frontend will open at: http://localhost:4200"
echo "Backend API at: http://localhost:5000"
echo ""
