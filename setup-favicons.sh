#!/bin/bash

# Setup script for MGB favicons
# Place your logo image as 'logo.png' in the same directory as this script

echo "🚀 Setting up MGB favicons..."

if [ ! -f "logo.png" ]; then
    echo "❌ Please place your logo image as 'logo.png' in this directory first"
    echo "💡 You can rename one of your provided logo images to 'logo.png'"
    exit 1
fi

echo "📁 Creating favicon directory..."
mkdir -p public

echo "🔄 Converting logo to different favicon sizes..."

# Check if ImageMagick is available
if command -v convert &> /dev/null; then
    echo "✅ Using ImageMagick to resize images..."
    convert logo.png -resize 16x16 public/favicon-16x16.png
    convert logo.png -resize 32x32 public/favicon-32x32.png
    convert logo.png -resize 180x180 public/apple-touch-icon.png
    convert logo.png -resize 32x32 public/favicon.ico
    echo "✅ Favicons created successfully!"
else
    echo "⚠️  ImageMagick not found. Please:"
    echo "   1. Install ImageMagick: brew install imagemagick (on macOS)"
    echo "   2. Or use online tools like favicon.io"
    echo "   3. Manually resize logo.png to the required sizes"
fi

echo "🎉 Favicon setup complete!"
echo "📝 Your logo is now configured as the website favicon"