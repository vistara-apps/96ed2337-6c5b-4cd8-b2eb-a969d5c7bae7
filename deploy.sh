#!/bin/bash

# CollabForge Deployment Script
# This script builds and deploys the CollabForge application

set -e

echo "🚀 Starting CollabForge deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version check passed: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the application
echo "🔨 Building application..."
npm run build

# Initialize database (optional, for development)
echo "🗄️ Initializing database..."
npm run init-db || echo "⚠️ Database initialization failed, continuing..."

# Check if build was successful
if [ ! -d ".next" ]; then
    echo "❌ Build failed. .next directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Start the application
echo "🌟 Starting CollabForge..."
echo "📱 Application will be available at http://localhost:3000"
npm start

