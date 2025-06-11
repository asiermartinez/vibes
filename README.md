# 🌈 Rainbow Playground

An interactive web application featuring rainbow emojis and hyperspace effects! Press keys to create magical rainbows that grow, shake, and fall with physics. Press the space bar to enter hyperspace mode with flying emojis and scrolling text.

## ✨ Features

- **Interactive Rainbows**: Press any key (except space) to create rainbow emojis at random locations
- **Dynamic Animations**: Rainbows grow and shake while keys are held, then fall with gravity when released
- **Hyperspace Mode**: Press and hold space bar for a dramatic hyperspace effect with:
  - Dark space background transition
  - Flying stars, rockets, unicorns, and space emojis
  - Scrolling "I LOVE STARS" marquee text
  - 3D perspective projection for realistic depth
- **Mobile Support**: Touch events work on mobile devices
- **Optimized Performance**: Smooth 60fps animations with hardware acceleration

## 🚀 Live Demo

Visit the live deployment: **https://yourusername.github.io/vibes/**

(Replace `yourusername` with your actual GitHub username)

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📦 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Navigate to "Pages" in the sidebar
   - Set Source to "GitHub Actions"

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Automatic Deployment:**
   - GitHub Actions will automatically build and deploy your site
   - Visit `https://yourusername.github.io/vibes/` once deployment completes

### Manual Build:

```bash
# Build static export
npm run build

# The static files will be in the 'out' directory
```
- **GitHub Integration**: Built-in tools for GitHub-related tasks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub Personal Access Token (for AI models)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd octo-prototypes
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your GitHub Personal Access Token:
```
GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── chat/          # Chat completion endpoint
│   │   ├── models/        # Available models endpoint
│   │   └── mcp/           # MCP tools endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main chat interface
├── components/            # React components
│   ├── ConversationView.tsx
│   ├── MessageInput.tsx
│   ├── ModelsDialog.tsx
│   └── ...
├── contexts/              # React contexts
│   ├── ModelSelectionContext.tsx
│   └── UserTierContext.tsx
├── mcp/                   # MCP client configuration
└── models/                # Type definitions and model data
```

## Usage

### Chat Interface

- Type messages in the input field and press Enter to send
- Use Shift+Enter for line breaks
- Navigate message history with Arrow Up/Down keys

### Model Selection

- Click the model button in the top bar to see available models
- Different models are available based on your tier
- Use keyboard shortcuts:
  - `Cmd+Shift+M`: Cycle through recent models
  - `Cmd+Shift+D`: Reset to default model

### Tier Management

- Click the tier selector to change your subscription level
- Different tiers provide access to different models and usage limits

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: Primer React
- **Styling**: CSS Modules with Primer primitives
- **AI Integration**: OpenAI SDK with GitHub Models
- **MCP**: Model Context Protocol SDK
- **TypeScript**: Full type safety

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## License

[Add your license here]