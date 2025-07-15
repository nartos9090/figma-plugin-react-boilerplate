# Figma Plugin: Asmoday

A modern Figma plugin boilerplate using **React**, **Tailwind CSS**, and **Vite**, built to output a single `ui.html` and `code.js` ready for Figma.

## Project Structure

```
.
├── api/                   # Handles plugin logic, runs in Figma plugin sandbox
│   └── code.ts            # Listens for messages and manipulates the Figma document
│
├── ui/                    # React-based UI rendered in Figma iframe
│   ├── assets/            # Static assets (images, icons, etc.)
│   ├── components/        # React components (buttons, modals, etc.)
│   ├── index.css
│   ├── index.html
│   └── main.tsx
│
├── dist/                  # Final plugin build output
│   ├── ui.html            # Single inlined HTML file for Figma UI
│   └── code.js            # Api logic bundled with esbuild
│
├── build-api.js           # esbuild script to bundle api
├── manifest.json          # Figma plugin manifest definition
├── postcss.config.cjs     # Tailwind + Autoprefixer setup
├── tailwind.config.cjs    # Tailwind scanning config
├── vite.config.ts         # Vite + SingleFile config for UI
└── tsconfig.json          # Shared TypeScript setup
```

## UI (Frontend)

The UI component runs inside an iframe within Figma and is built with React and Tailwind CSS. It is bundled using Vite with `vite-plugin-singlefile` to produce a single `ui.html` file. The UI handles user interactions such as buttons, inputs, and previews.

### Tailwind CSS Configuration

Add classes directly in your JSX components:

```tsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

Configure Tailwind directives in `ui/index.css`:

```css
@import "tailwindcss";
```

Import the CSS file in your `main.tsx`:

```ts
import './index.css'
```

## Asset Management

### UI Images

1. Place assets such as image files in: `ui/assets/`
2. Import them in React. It will be automatically converted to base64.
```tsx
import logo from './assets/logo.png'
<img src={logo} alt="Logo" />
```

Vite will automatically inline these assets in the final `ui.html` file.

### Important Note

Since the build process generates a single-file HTML output, no public folder is used. All images must be imported into components so Vite can properly inline them.

## Api (Figma Sandbox)

The api runs inside Figma's plugin sandbox environment, separate from the iframe. It has no DOM access and can only use the `figma` API and `postMessage` communication. The api handles document operations including nodes, fills, fonts, and layout management. It is bundled into `dist/code.js` using esbuild.

### Creating Message Handlers

Configure message handlers in `api/code.ts`:

```ts
figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rect') {
    const rect = figma.createRectangle()
    figma.currentPage.appendChild(rect)
    figma.closePlugin('Rectangle created!')
  }
}
```

## Architecture Overview

The plugin architecture separates concerns between UI and api components:

| UI (iframe) | Api (plugin sandbox) |
|-------------|-------------------------|
| Built with React | Uses only TypeScript |
| Handles user interaction | Communicates with Figma document API |
| Uses DOM, Tailwind, events | No DOM access — only figma API |
| Sends messages to api | Listens and responds via figma.ui |

Communication between UI and api occurs through `postMessage`:

```ts
// In UI:
parent.postMessage({ pluginMessage: { type: 'create-rect' } }, '*')

// In Api:
figma.ui.onmessage = (msg) => { /* handle message */ }
```

## Getting Started

Install dependencies and build the plugin:

```bash
# Installation
npm install

# Development
npm run watch

# Build
npm run build
```

To install in Figma Desktop:

1. Navigate to **Plugins** → **Development** → **Import plugin from manifest...**
2. Select the `manifest.json` file
3. Run the plugin in Figma

## Development Scripts

| Script | Description |
|--------|-------------|
| `build` | Build both UI and api |
| `watch` | Watch UI and api for live development |
| `build:ui` | Build ui.html only |
| `build:api` | Build code.js only |