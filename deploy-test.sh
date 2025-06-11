#!/bin/bash

# Build and serve the static site locally for testing GitHub Pages deployment

echo "🌈 Building Rainbow Playground for GitHub Pages..."

# Clean previous build
rm -rf out

# Build with GitHub Actions environment
GITHUB_ACTIONS=true npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 To serve locally (simulating GitHub Pages):"
    echo "   npx serve out"
    echo ""
    echo "📁 Static files are in the 'out' directory"
    echo "🌐 Ready to deploy to: https://yourusername.github.io/vibes/"
else
    echo "❌ Build failed!"
    exit 1
fi
