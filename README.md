# Hexa ⟡ - Code illuminated

An intelligent AI coding companion by **Hacktoolkit**.

## 🎨 Brand Identity

- **Product**: Hexa ⟡
- **Tagline**: "Code illuminated."
- **Colors**:
  - Electric Teal: `#00F5D4`
  - Space Black: `#0D0D0D`
  - Cyber Violet: `#7F00FF`
  - Warm White: `#F5F5F5`
- **Fonts**: JetBrains Mono (code/UI), Inter (body)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **AI Engine**: Transformers.js (Hugging Face models in browser)
- **Syntax Highlighting**: react-syntax-highlighter
- **Deployment**: GitHub Pages (static export)

## 📁 Project Structure

```
hexa.hacktoolkit.com/
├── src/
│   ├── pages/
│   │   ├── _app.tsx          # App wrapper with global styles
│   │   ├── _document.tsx     # HTML document structure
│   │   ├── index.tsx         # Main page with split-screen layout
│   │   ├── terms.tsx         # Terms of Service page
│   │   └── privacy.tsx       # Privacy Policy page
│   ├── components/
│   │   ├── Header.tsx        # Header with logo and theme toggle
│   │   ├── Footer.tsx        # Footer component
│   │   ├── ChatPanel.tsx     # Chat interface with AI interaction
│   │   ├── CodeEditor.tsx    # Syntax-highlighted code editor
│   │   ├── ProviderSwitcher.tsx # AI provider selection
│   │   └── PricingModal.tsx  # Stripe pricing modal
│   ├── lib/
│   │   ├── aiApi.ts          # Unified AI API abstraction layer
│   │   ├── mockApi.ts        # Mock AI responses for testing
│   │   ├── transformersApi.ts # Local browser AI using Transformers.js
│   │   └── useTheme.ts       # Theme management hook
│   ├── config/
│   │   └── stripe.ts         # Stripe checkout URLs (public, checked in)
│   └── styles/
│       └── globals.css       # Global styles and Tailwind imports
├── public/                   # Static assets
├── out/                      # Build output (git-ignored)
├── docs/                     # Deployed build (GitHub Pages)
├── CNAME                     # Custom domain for GitHub Pages
├── Makefile                  # Build and deploy automation
├── next.config.js            # Next.js configuration with static export
├── tailwind.config.ts        # Tailwind configuration with brand colors
├── tsconfig.json             # TypeScript configuration
├── README.md                 # This file
├── TESTING.md                # Testing guide
└── DEBUG_CHAT_FLOW.md        # Debugging guide
```

## 🛠️ Installation & Development

### Quick Start with Makefile

```bash
# Install dependencies
make install

# Start development server
make dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Make Commands

```bash
make help      # Display all available commands
make install   # Install dependencies
make dev       # Start Next.js development server
make run       # Build and run production server
make clean     # Clean previous builds
make build     # Build for production (generates docs/)
make deploy    # Build and deploy to GitHub Pages
```

### Manual Installation

```bash
npm install
npm run dev
```

## 📦 Build & Deploy

### Using Makefile (Recommended)

The project uses a Makefile for consistent builds and deployments, similar to www.hacktoolkit.com:

```bash
# Build the static site
make build
```

This will:
1. Clean previous builds
2. Install dependencies
3. Build Next.js static export to `out/`
4. Copy `CNAME` file to `out/`
5. Create `.nojekyll` file in `out/`

### Deploy to GitHub Pages

```bash
# Build and deploy in one command
make deploy
```

This will:
1. Run the build process
2. Move `out/` directory to `docs/`
3. Commit the `docs/` directory
4. Push to the master branch

GitHub Pages is configured to serve from the `docs/` directory on the master branch.

## ⌨️ Keyboard Shortcuts

- `⌘+Enter` / `Ctrl+Enter` - Send message in chat
- `⌘+K` / `Ctrl+K` - Toggle command palette
- `Esc` - Close modals

## 🎯 Features

### UI/UX
- ✅ Split-screen layout (Chat + Code Editor)
- ✅ Dark/Light theme toggle with localStorage persistence
- ✅ Syntax highlighting for multiple languages (Python, TypeScript, Rust, etc.)
- ✅ Keyboard-centric interaction
- ✅ Responsive design
- ✅ Command palette (⌘+K)
- ✅ Static export for GitHub Pages

### AI Capabilities
- ✅ **Local AI**: Transformers.js integration (runs in browser)
- ✅ **Mock AI**: Offline demo mode with pre-coded responses
- ✅ **Multiple Providers**: Pluggable AI backend system
- ✅ **Smart Fallback**: Automatically falls back to mock mode on errors
- ✅ **Language Detection**: Automatically detects target programming language
- ✅ **Status Indicators**: Real-time AI model loading/ready status

### AI Provider Options

You can switch providers anytime via **Settings (⌘+K)**.

#### 1. **Mock API** (Default) 🎭
- ✅ Instant responses for demos
- ✅ Works offline
- ✅ Pre-coded examples for common tasks
- ✅ No setup required
- **Best for:** Trying Hexa, demos, offline use

#### 2. **Transformers.js** (Local AI) 🤖
- Runs entirely in your browser
- No backend required
- Privacy-first (all processing local)
- Uses Xenova/CodeGen-350M model (~350MB download on first use)
- Status indicator shows loading/ready state
- Progress updates in browser console
- **Best for:** Privacy-conscious users, offline AI after initial download
- **Note:** First-time load may take 3-7 minutes depending on connection

#### 3. **Backend API** 🌐
- Django/FastAPI integration ready
- See `docs/BACKEND_API.md` for implementation guide
- Production-grade AI (GPT-4, Claude, etc.)
- **Best for:** Production deployments, best quality responses

### How to Enable Local AI (Transformers.js)

1. Press `⌘+K` (Mac) or `Ctrl+K` (Windows/Linux)
2. Click on **Transformers** provider
3. Open browser console (F12) to see download progress
4. Wait for model download (~350MB, one-time, 3-7 minutes)
5. Console will show: `✅ Model initialized successfully`
6. Status will show: "🤖 AI Ready"

**Note:** Downloads from `huggingface.co` - check your network if it fails!

## 🔮 Potential Enhancements

- WebSocket streaming for real-time AI responses
- Add more keyboard shortcuts
- Add code execution capability
- Multi-file editor support
- User authentication
- Save/load conversation history
- Model selection UI
- Fine-tuned models for specific languages

## 🤝 Contributing

This is a Hacktoolkit project. For contributions, please follow our coding standards and submit PRs.

## 📄 License

© 2025 Hacktoolkit — Built with Hexa ⟡

---

**Website**: [hexa.hacktoolkit.com](https://hexa.hacktoolkit.com)
**Parent Brand**: [hacktoolkit.com](https://hacktoolkit.com)
