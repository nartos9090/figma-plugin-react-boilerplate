# 🧩 Figma Plugin React Boilerplate

A modern Figma plugin boilerplate using **React**, **Tailwind CSS**, and **Vite**, built to output a single `ui.html` and `code.js` ready for Figma.

## 📁 Folder Structure

````
.
├── api/                   # Handles plugin logic, runs in Figma plugin sandbox
│   └── code.ts            # Listens for messages and manipulates the Figma document
│
├── ui/                    # React-based UI rendered in Figma iframe
│   ├── assets/            # Static assets (images, icons, etc.)
│   ├── components/        # React components (buttons, modals, etc.)
│   ├── index.css          # Main css file
│   ├── index.html
│   └── main.tsx           # Main react file
│
├── dist/                  # Final plugin build output
│   ├── ui.html            # Single inlined HTML file for Figma UI
│   └── code.js            # api logic bundled with esbuild
│
├── build-api.ts       # esbuild script to bundle api
├── manifest.json          # Figma plugin manifest definition
├── postcss.config.js      # Tailwind + Autoprefixer setup
├── tailwind.config.js     # Tailwind scanning config
├── vite.config.ts         # Vite + SingleFile config for UI
└── tsconfig.json          # Shared TypeScript setup
````

## 🎨 UI (Frontend)

- **Runs inside an iframe** in Figma
- Built with **React + Tailwind CSS**
- Bundled using **Vite** with `vite-plugin-singlefile` to produce one `ui.html`
- Used to interact with the user: buttons, inputs, previews, etc.

### ✅ Tailwind Usage

1. Add classes directly in your JSX:
   ````tsx
   <button className="bg-blue-500 text-white px-4 py-2 rounded">
     Click me
   </button>
   ````

2. Tailwind directives in `ui/index.css`:
   ```css
   @import "tailwindcss";

   ...(your css)
   ```

3. Make sure `index.css` is imported in your `main.tsx`:
   ````ts
   import './index.css'
   ````

## 🖼 Adding Assets (Images, Icons, etc.)

### ✅ UI Images

1. Place assets such as image files in: `ui/assets/`
2. Import them in React. It will be automatically converted to base64.
   ```tsx
   import logo from './assets/logo.png'
   <img src={logo} alt="Logo" />
   ```

✅ Vite will inline them in the final `ui.html`.

### ❗ No Public Folder

Since we're generating a single-file HTML, no public folder is used — all images must be imported into components so Vite can inline them.

## 🧠 API (Figma Sandbox)

- Runs inside Figma's plugin sandbox (not the iframe)
- No DOM access — only `figma` API and `postMessage`
- Handles document operations: nodes, fills, fonts, layout, etc.
- Bundled into `dist/code.js` using esbuild

### ✅ Creating Handlers

In `api/code.ts`:
```ts
figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rect') {
    const rect = figma.createRectangle()
    figma.currentPage.appendChild(rect)
    figma.closePlugin('Rectangle created!')
  }
}
```

## 🧩 Why Separate UI and api?

| UI (iframe) | api (plugin sandbox) |
|-------------|-------------------------|
| Built with React | Uses only TypeScript |
| Handles user interaction | Talks to the Figma document API |
| Uses DOM, Tailwind, events | No DOM — can only use figma API |
| Sends messages to api | Listens and responds via figma.ui |

You must use `postMessage` between the two:

```ts
// In UI:
parent.postMessage({ pluginMessage: { type: 'create-rect' } }, '*')

// In api:
figma.ui.onmessage = (msg) => { /* handle it */ }
```

## 🚀 Getting Started

```bash
# Installation
npm install

# Development
npm run watch

# Build
npm run build
```

Then in Figma Desktop:
1. **Plugins** → **Development** → **Import plugin from manifest...**
2. Select `manifest.json`
3. Run the plugin in Figma

## 🔨 Dev Scripts

| Script | Description |
|--------|-------------|
| `build` | Build both UI and api |
| `watch` | Watch UI and api live |
| `build:ui` | Build ui.html |
| `build:api` | Build code.js |