# 🚀 GitHub Pages Deployment Guide

## Quick Setup

1. **Enable GitHub Pages in your repository:**
   - Go to repository Settings
   - Click "Pages" in the sidebar  
   - Set Source to "GitHub Actions"

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Deploy Rainbow Playground to GitHub Pages"
   git push origin main
   ```

3. **Your site will be available at:**
   ```
   https://yourusername.github.io/vibes/
   ```

## What's Configured

✅ **Next.js Static Export** - Generates static HTML/CSS/JS files
✅ **GitHub Actions Workflow** - Automatic build and deployment
✅ **Asset Optimization** - Images and fonts work correctly
✅ **Base Path Configuration** - URLs work properly on GitHub Pages
✅ **No Jekyll Processing** - `.nojekyll` file prevents conflicts

## Local Testing

Test your GitHub Pages build locally:

```bash
# Build for GitHub Pages
GITHUB_ACTIONS=true npm run build

# Serve locally (simulates GitHub Pages)
npx serve out

# Or use the provided script
./deploy-test.sh
```

## Troubleshooting

- **Site not loading?** Check that GitHub Pages is enabled and set to "GitHub Actions"
- **Assets not loading?** Verify the base path configuration in `next.config.ts`
- **404 errors?** Make sure you're accessing the correct URL with `/vibes/` path

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS to point to `yourusername.github.io`
3. Update the base path in `next.config.ts` if needed
