#!/usr/bin/env node

// Enhanced VN CLI for complete project lifecycle
// Commands:
//   vn help
//   vn create <project-name>
//   vn validate <script.json>
//   vn init <dir>
//   vn build [project-dir]
//   vn serve [project-dir]  
//   vn dev [project-dir]
//   vn assets scan [project-dir]
//   vn assets validate [project-dir]
//   vn assets optimize [project-dir]

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function printHelp() {
  console.log(`VN CLI - Visual Novel Engine CLI

Usage:
  vn create <project-name>     Create a new VN project with all dependencies
  vn validate <script.json>    Validate a script file
  vn init <dir>               Initialize a basic script structure
  vn build [project-dir]      Build project for production
  vn serve [project-dir]      Serve built project locally
  vn dev [project-dir]        Start development server
  vn assets scan [dir]        Scan and report all assets in project
  vn assets validate [dir]    Check for missing assets referenced in scripts
  vn assets optimize [dir]    Optimize and compress assets for production
  vn preview [project-dir]    Preview project in browser (same as serve)
  vn deploy <target>          Deploy to hosting platform (github, netlify, vercel)

Examples:
  vn create my-awesome-novel
  vn validate scripts/main.json
  vn build ./my-project
  vn dev
  vn assets scan
  vn assets validate`)
}

async function validate(file) {
  try {
    const raw = fs.readFileSync(file, 'utf8')
    const json = JSON.parse(raw)
    // Lazy import to avoid resolution issues before packages are built
    const core = await import('@vn/core')
    core.loadScript(json)
    console.log(`OK: ${file} is valid.`)
    process.exit(0)
  } catch (e) {
    console.error('Validation failed:')
    console.error(e?.message || e)
    process.exit(1)
  }
}

function createProject(projectName) {
  const target = path.resolve(process.cwd(), projectName)
  
  if (fs.existsSync(target)) {
    console.error(`Directory ${projectName} already exists`)
    process.exit(1)
  }

  console.log(`Creating Visual Novel project: ${projectName}`)
  fs.mkdirSync(target, { recursive: true })

  // Create project structure
  const dirs = [
    'public/assets/backgrounds',
    'public/assets/sprites', 
    'public/assets/audio',
    'public/scripts',
    'src'
  ]

  dirs.forEach(dir => {
    fs.mkdirSync(path.join(target, dir), { recursive: true })
  })

  // Create package.json
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      serve: "vite preview",
      validate: "node ../vnEngine/packages/cli/bin/vn.js validate public/scripts/main.json"
    },
    dependencies: {
      react: "^19.2.0",
      "react-dom": "^19.2.0"
    },
    devDependencies: {
      "@types/react": "^19.2.2",
      "@types/react-dom": "^19.2.2",
      "@vitejs/plugin-react": "^5.1.0",
      typescript: "^5.9.3",
      vite: "^6.0.1"
    }
  }

  fs.writeFileSync(
    path.join(target, 'package.json'), 
    JSON.stringify(packageJson, null, 2)
  )

  // Create sample script
  const sampleScript = {
    startScene: 'intro',
    scenes: [
      {
        id: 'intro',
        start: 'greeting',
        nodes: [
          {
            type: 'command',
            id: 'setbg',
            name: 'setBackground',
            args: { key: 'room' },
            next: 'greeting'
          },
          {
            type: 'dialogue',
            id: 'greeting',
            speaker: 'Narrator',
            text: 'Welcome to your Visual Novel!',
            next: 'choice1'
          },
          {
            type: 'dialogue',
            id: 'explain',
            text: 'You can edit this story in public/scripts/main.json',
            next: 'choice1'
          },
          {
            type: 'choice',
            id: 'choice1',
            choices: [
              { text: 'Start creating!', next: 'create' },
              { text: 'Learn more', next: 'learn' }
            ]
          },
          {
            type: 'dialogue',
            id: 'create',
            speaker: 'Creator',
            text: 'Add your backgrounds to public/assets/backgrounds/',
            next: 'end'
          },
          {
            type: 'dialogue',
            id: 'learn',
            speaker: 'Guide',
            text: 'Check out the documentation for more features!',
            next: 'end'
          },
          { type: 'end', id: 'end' }
        ]
      }
    ]
  }

  fs.writeFileSync(
    path.join(target, 'public/scripts/main.json'),
    JSON.stringify(sampleScript, null, 2)
  )

  // Create basic assets
  createPlaceholderAssets(target)

  // Create src files
  createSourceFiles(target, projectName)

  // Create config files
  createConfigFiles(target)

  console.log(`✅ Project ${projectName} created successfully!

🚀 Enhanced VN Engine with Professional UI Components!
   ✨ Built-in Main Menu, Settings, Save/Load system
   🎨 4 Beautiful Themes (Modern, Fantasy, Sci-Fi, Retro)
   📱 Fully Responsive Design
   ♿ Accessibility Features

Next steps:
  cd "${projectName}"
  npm install  
  npm run dev

Project structure:
  📁 public/
    📁 assets/          # Put your images and audio here
      📁 backgrounds/   # Background images
      📁 sprites/       # Character images
      📁 audio/         # Music and sound effects
    📁 scripts/         # Your story scripts
      📄 main.json      # Main story file
  📁 src/               # Application code
    📄 App.tsx          # Main app component
    📁 components/
      📄 EnhancedVNPlayer.tsx  # Professional VN player

🎯 Ready to use! Just add your art and story!
📝 Edit public/scripts/main.json to write your visual novel!

⚠️  IMPORTANT CONTENT & CULTURAL RESPECT NOTICE:
   🙏 If using spiritual/cultural content, please ensure respectful representation
   📚 Include appropriate content warnings for sensitive themes
   💚 Credit cultural sources and use sacred teachings with love and reverence
   🩺 Remind users that content is not medical/psychological advice
`)
}

function createPlaceholderAssets(target) {
  // Create placeholder background (simple colored rectangle as SVG)
  const placeholder = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">
    Room Background
  </text>
</svg>`
  
  fs.writeFileSync(path.join(target, 'public/assets/backgrounds/room.svg'), placeholder)
  
  // Create README for assets
  const assetsReadme = `# Assets Folder

This folder contains all the visual and audio assets for your visual novel.

## Structure:
- **backgrounds/**: Background images (JPG, PNG, SVG recommended)
- **sprites/**: Character sprites and images
- **audio/**: Music and sound effects (MP3, OGG, WAV)

## Guidelines:
- Use descriptive filenames (e.g., "room_day.jpg", "character_happy.png")
- Recommended background size: 1920x1080 (will be scaled to fit)
- Recommended sprite size: 512x1024 or smaller
- Keep file sizes reasonable for web loading

## Adding Assets:
1. Drop image/audio files into the appropriate folders
2. Reference them in your script using the filename (without extension)
3. The engine will automatically find and load them

Example:
- File: backgrounds/school_courtyard.jpg
- Reference in script: "key": "school_courtyard"
`

  fs.writeFileSync(path.join(target, 'public/assets/README.md'), assetsReadme)
}

function createSourceFiles(target, projectName) {
  // Create components and utils directories
  fs.mkdirSync(path.join(target, 'src/components'), { recursive: true })
  fs.mkdirSync(path.join(target, 'src/utils'), { recursive: true })

  // Copy template files
  copyTemplateFiles(target)

  // Create main App.tsx
  const appContent = `import React, { useEffect, useState } from 'react'
import { EnhancedVNPlayer } from './components/EnhancedVNPlayer'
import { AutoAssetLoader } from './utils/AssetLoader'
import { NodeVNEngine, loadScript, type EngineContract } from '@vn/core'
import './App.css'
import './components/EnhancedStyles.css'

export default function App() {
  const [engine, setEngine] = useState<EngineContract | null>(null)
  const [assets, setAssets] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function initialize() {
      try {
        // Load assets automatically
        const loader = new AutoAssetLoader()
        const loadedAssets = await loader.loadAll()
        setAssets(loadedAssets)

        // Load main script
        const response = await fetch('/scripts/main.json')
        if (!response.ok) {
          throw new Error('Failed to load main script')
        }
        
        const scriptData = await response.json()
        const script = loadScript(scriptData)
        const vnEngine = new NodeVNEngine(script)
        
        setEngine(vnEngine)
        setLoading(false)
      } catch (err) {
        console.error('Initialization error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    initialize()
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your visual novel...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>⚠️ Loading Error</h2>
        <p>{error}</p>
        <details>
          <summary>Troubleshooting</summary>
          <ul>
            <li>Make sure public/scripts/main.json exists</li>
            <li>Check that your script has valid JSON syntax</li>
            <li>Verify all referenced assets exist in public/assets/</li>
          </ul>
        </details>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    )
  }

  if (!engine) {
    return <div className="error-screen">Engine failed to initialize</div>
  }

  return (
    <div className="app">
      <EnhancedVNPlayer 
        engine={engine} 
        assets={assets}
        config={{
          title: "${projectName}",
          subtitle: "A Visual Novel Experience",
          enableMainMenu: true,
          enableSettings: true,
          enableSaveLoad: true,
          defaultTheme: "modern",
          enableGlitchEffect: false
        }}
      />
    </div>
  )
}
`

  fs.writeFileSync(path.join(target, 'src/App.tsx'), appContent)

  // Create basic CSS
  const cssContent = `/* ${projectName} - Visual Novel Styles */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app {
  height: 100vh;
  background: #000;
  overflow: hidden;
}

.loading-screen, .error-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255,255,255,0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-screen h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.error-screen p {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.error-screen details {
  margin: 1rem 0;
  text-align: left;
  max-width: 500px;
}

.error-screen button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: white;
  color: #764ba2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.error-screen button:hover {
  background: #f0f0f0;
}
`

  fs.writeFileSync(path.join(target, 'src/App.css'), cssContent)

  // Create main.tsx
  const mainContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
`

  fs.writeFileSync(path.join(target, 'src/main.tsx'), mainContent)
}

function copyTemplateFiles(target) {
  // Get template directory relative to this CLI script
  const templateDir = path.join(__dirname, '..', 'templates')
  
  // Template files to copy
  const templates = [
    { from: 'EnhancedVNPlayer.tsx', to: 'src/components/EnhancedVNPlayer.tsx' },
    { from: 'VNPlayer.tsx', to: 'src/components/VNPlayer.tsx' },
    { from: 'AssetLoader.ts', to: 'src/utils/AssetLoader.ts' },
    { from: 'EnhancedStyles.css', to: 'src/components/EnhancedStyles.css' },
    { from: 'CONTENT_WARNING.md', to: 'CONTENT_WARNING.md' }
  ]

  for (const template of templates) {
    const sourcePath = path.join(templateDir, template.from)
    const targetPath = path.join(target, template.to)
    
    try {
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath)
      } else {
        // Fallback: create basic versions if template files don't exist
        createFallbackTemplates(target, template.to)
      }
    } catch (error) {
      console.warn(`Warning: Could not copy template ${template.from}:`, error.message)
      createFallbackTemplates(target, template.to)
    }
  }
}

function createFallbackTemplates(target, filePath) {
  const fullPath = path.join(target, filePath)
  
  if (filePath.includes('VNPlayer')) {
    const vnPlayerContent = `import React, { useState, useEffect, useCallback } from 'react'

export function VNPlayer({ engine, assets }) {
  const [currentInstruction, setCurrentInstruction] = useState(engine.next())
  const [background, setBackground] = useState('')
  const [dialogueText, setDialogueText] = useState('')
  const [speaker, setSpeaker] = useState('')
  const [choices, setChoices] = useState([])
  const [showUI, setShowUI] = useState(false)

  useEffect(() => {
    const instruction = currentInstruction
    if (!instruction) return

    switch (instruction.name) {
      case 'showDialogue':
        setDialogueText(instruction.text || '')
        setSpeaker(instruction.speaker || '')
        setChoices([])
        setShowUI(true)
        break

      case 'showChoices':
        setChoices(instruction.choices || [])
        setShowUI(true)
        break

      case 'runCommand':
        handleCommand(instruction.command)
        break

      case 'end':
        setDialogueText('The End')
        setSpeaker('')
        setChoices([])
        setShowUI(true)
        break
    }
  }, [currentInstruction])

  const handleCommand = useCallback((command) => {
    switch (command.name) {
      case 'setBackground':
        const bgKey = command.args?.key || command.key
        const bgUrl = assets.backgrounds[bgKey]
        if (bgUrl) setBackground(bgUrl)
        break
    }

    setTimeout(() => {
      setCurrentInstruction(engine.proceed())
    }, 100)
  }, [engine, assets])

  const handleProceed = useCallback(() => {
    if (currentInstruction?.name === 'end') return
    setCurrentInstruction(engine.proceed())
  }, [engine, currentInstruction])

  const handleChoice = useCallback((choiceId) => {
    setCurrentInstruction(engine.choose(choiceId))
  }, [engine])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {background && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: \`url(\${background})\`, backgroundSize: 'cover',
          backgroundPosition: 'center', zIndex: 1
        }} />
      )}
      
      {showUI && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '2rem', zIndex: 10
        }}>
          {speaker && <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{speaker}</div>}
          {dialogueText && <div style={{ marginBottom: '1rem' }}>{dialogueText}</div>}
          
          {choices.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice.id || index.toString())}
                  style={{
                    padding: '0.75rem', background: '#444', border: 'none',
                    color: 'white', borderRadius: '4px', cursor: 'pointer'
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <div onClick={handleProceed} style={{ cursor: 'pointer' }}>
              Click to continue...
            </div>
          )}
        </div>
      )}
    </div>
  )
}
`
    fs.writeFileSync(fullPath, vnPlayerContent)
  } 
  
  if (filePath.includes('AssetLoader')) {
    const assetLoaderContent = `export class AutoAssetLoader {
  async loadAll() {
    return {
      backgrounds: await this.loadAssets('backgrounds'),
      sprites: await this.loadAssets('sprites'), 
      audio: await this.loadAssets('audio')
    }
  }

  async loadAssets(type) {
    const assets = {}
    const commonNames = this.getCommonNames(type)
    const extensions = type === 'audio' ? ['mp3', 'ogg', 'wav'] : ['jpg', 'png', 'svg', 'webp']
    
    for (const name of commonNames) {
      for (const ext of extensions) {
        const url = \`/assets/\${type}/\${name}.\${ext}\`
        if (await this.assetExists(url)) {
          assets[name] = url
          break
        }
      }
    }
    
    return assets
  }

  async assetExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  getCommonNames(type) {
    const names = {
      backgrounds: ['room', 'street', 'school', 'park', 'home'],
      sprites: ['character1', 'character2', 'protagonist'],
      audio: ['music', 'bgm', 'theme', 'click']
    }
    return names[type] || []
  }
}
`
    fs.writeFileSync(fullPath, assetLoaderContent)
  }
}

function createConfigFiles(target) {
  // Create index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visual Novel</title>
    <style>
        body { margin: 0; font-family: system-ui, sans-serif; }
        #root { height: 100vh; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>`

  fs.writeFileSync(path.join(target, 'index.html'), indexHtml)

  // Create vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths for deployment
  resolve: {
    alias: {
      '@vn/core': path.resolve(__dirname, '../vnEngine/packages/core'),
      '@vn/renderer-web': path.resolve(__dirname, '../vnEngine/packages/renderer-web')
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true // Allow access from network
  },
  preview: {
    port: 3001,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          engine: ['@vn/core', '@vn/renderer-web']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'assets/images/[name].[hash][extname]'
          }
          if (/mp3|wav|ogg|aac|m4a/i.test(ext)) {
            return 'assets/audio/[name].[hash][extname]'  
          }
          return 'assets/[name].[hash][extname]'
        }
      }
    },
    target: 'es2015', // Better browser compatibility
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
`

  fs.writeFileSync(path.join(target, 'vite.config.ts'), viteConfig)

  // Create tsconfig.json
  const tsConfig = {
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      ignoreDeprecations: "6.0",
      paths: {
        "@vn/core": ["../vnEngine/packages/core/dist/src/index.d.ts"],
        "@vn/renderer-web": ["../vnEngine/packages/renderer-web/dist/index.d.ts"]
      }
    },
    include: ["src"],
    references: [{ path: "./tsconfig.node.json" }]
  }

  fs.writeFileSync(path.join(target, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2))

  // Create README.md
  const readme = `# Visual Novel Project

Created with VN Engine CLI.

## Getting Started

1. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

2. Start development server:
   \`\`\`
   npm run dev
   \`\`\`

3. Edit your story in \`public/scripts/main.json\`

4. Add your assets to \`public/assets/\`

## Commands

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run serve\` - Preview production build
- \`npm run validate\` - Validate your script

## Project Structure

- \`public/assets/\` - Images and audio files
- \`public/scripts/\` - Story scripts
- \`src/\` - Application source code

## Documentation

See the [VN Engine documentation](https://github.com/DianaABA/vnEngine) for more information.
`

  fs.writeFileSync(path.join(target, 'README.md'), readme)
}

function initDir(dir) {
  const target = path.resolve(process.cwd(), dir)
  fs.mkdirSync(target, { recursive: true })
  // Create minimal structure
  const scriptsDir = path.join(target, 'scripts')
  const assetsDir = path.join(target, 'assets', 'backgrounds')
  fs.mkdirSync(scriptsDir, { recursive: true })
  fs.mkdirSync(assetsDir, { recursive: true })
  const sample = {
    startScene: 'intro',
    scenes: [
      {
        id: 'intro',
        start: 'n1',
        nodes: [
          { type: 'dialogue', id: 'n1', speaker: 'Ava', text: 'Hello world!', next: 'end' },
          { type: 'end', id: 'end' }
        ]
      }
    ]
  }
  fs.writeFileSync(path.join(scriptsDir, 'main.json'), JSON.stringify(sample, null, 2))
  console.log(`Initialized at ${target}\n- Put backgrounds in assets/backgrounds\n- Edit scripts/main.json\n`)
}

function buildProject(dir = '.') {
  const projectDir = path.resolve(process.cwd(), dir)
  if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
    console.error('No package.json found. Are you in a VN project directory?')
    process.exit(1)
  }

  console.log('Building project for production...')
  try {
    execSync('npm run build', { 
      cwd: projectDir, 
      stdio: 'inherit',
      shell: true 
    })
    console.log('✅ Build completed successfully!')
  } catch (error) {
    console.error('❌ Build failed:', error.message)
    process.exit(1)
  }
}

function serveProject(dir = '.') {
  const projectDir = path.resolve(process.cwd(), dir)
  if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
    console.error('No package.json found. Are you in a VN project directory?')
    process.exit(1)
  }

  console.log('Starting preview server...')
  try {
    execSync('npm run serve', { 
      cwd: projectDir, 
      stdio: 'inherit',
      shell: true 
    })
  } catch (error) {
    console.error('❌ Serve failed:', error.message)
    process.exit(1)
  }
}

function devProject(dir = '.') {
  const projectDir = path.resolve(process.cwd(), dir)
  if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
    console.error('No package.json found. Are you in a VN project directory?')
    process.exit(1)
  }

  console.log('Starting development server...')
  try {
    execSync('npm run dev', { 
      cwd: projectDir, 
      stdio: 'inherit',
      shell: true 
    })
  } catch (error) {
    console.error('❌ Dev server failed:', error.message)
    process.exit(1)
  }
}

async function scanAssets(dir = '.') {
  const projectDir = path.resolve(process.cwd(), dir)
  const assetsDir = path.join(projectDir, 'public', 'assets')
  
  if (!fs.existsSync(assetsDir)) {
    console.log('📁 No assets directory found at public/assets/')
    return
  }

  console.log('🔍 Scanning assets...\n')
  
  const assetTypes = ['backgrounds', 'sprites', 'audio']
  const allAssets = {}
  
  for (const type of assetTypes) {
    const typeDir = path.join(assetsDir, type)
    allAssets[type] = {}
    
    if (fs.existsSync(typeDir)) {
      const files = fs.readdirSync(typeDir)
      const assetFiles = files.filter(file => !file.startsWith('.') && !file.endsWith('.json'))
      
      for (const file of assetFiles) {
        const key = file.replace(/\.[^/.]+$/, '') // Remove extension
        const filePath = path.join(typeDir, file)
        const stats = fs.statSync(filePath)
        
        allAssets[type][key] = {
          file,
          size: formatFileSize(stats.size),
          modified: stats.mtime.toISOString().split('T')[0]
        }
      }
    }
  }
  
  // Report findings
  Object.entries(allAssets).forEach(([type, assets]) => {
    const count = Object.keys(assets).length
    console.log(`📂 ${type.charAt(0).toUpperCase() + type.slice(1)}: ${count} files`)
    
    if (count > 0) {
      Object.entries(assets).forEach(([key, info]) => {
        console.log(`  ├─ ${key} (${info.file}, ${info.size})`)
      })
    } else {
      console.log(`  └─ (empty)`)
    }
    console.log()
  })
  
  // Generate manifest files
  for (const [type, assets] of Object.entries(allAssets)) {
    if (Object.keys(assets).length > 0) {
      const manifestPath = path.join(assetsDir, type, 'manifest.json')
      const manifest = Object.fromEntries(
        Object.entries(assets).map(([key, info]) => [key, info.file])
      )
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
      console.log(`✅ Generated ${type}/manifest.json`)
    }
  }
}

async function validateAssets(dir = '.') {
  const projectDir = path.resolve(process.cwd(), dir)
  const scriptPath = path.join(projectDir, 'public', 'scripts', 'main.json')
  const assetsDir = path.join(projectDir, 'public', 'assets')
  
  if (!fs.existsSync(scriptPath)) {
    console.error('❌ No script file found at public/scripts/main.json')
    process.exit(1)
  }
  
  console.log('🔍 Validating asset references...\n')
  
  try {
    const scriptContent = fs.readFileSync(scriptPath, 'utf8')
    const script = JSON.parse(scriptContent)
    
    const referencedAssets = extractAssetReferences(script)
    const availableAssets = getAvailableAssets(assetsDir)
    
    let hasErrors = false
    
    // Check for missing assets
    for (const [type, refs] of Object.entries(referencedAssets)) {
      if (refs.length === 0) continue
      
      console.log(`🔍 Checking ${type}:`)
      
      for (const ref of refs) {
        if (availableAssets[type] && availableAssets[type][ref]) {
          console.log(`  ✅ ${ref} → ${availableAssets[type][ref]}`)
        } else {
          console.log(`  ❌ ${ref} (MISSING)`)
          hasErrors = true
        }
      }
      console.log()
    }
    
    // Report unused assets
    for (const [type, assets] of Object.entries(availableAssets)) {
      const unused = Object.keys(assets).filter(key => 
        !referencedAssets[type] || !referencedAssets[type].includes(key)
      )
      
      if (unused.length > 0) {
        console.log(`📦 Unused ${type}:`)
        unused.forEach(key => console.log(`  ⚪ ${key}`))
        console.log()
      }
    }
    
    if (hasErrors) {
      console.log('❌ Validation failed: Missing assets found')
      process.exit(1)
    } else {
      console.log('✅ All asset references are valid!')
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message)
    process.exit(1)
  }
}

async function optimizeAssets(dir = '.') {
  const projectDir = path.resolve(process.cwd(), dir)
  
  console.log('🚧 Asset optimization is not yet implemented')
  console.log('This feature will include:')
  console.log('- Image compression and format conversion')
  console.log('- Audio format optimization') 
  console.log('- Automatic asset bundling')
  console.log('- Size analysis and recommendations')
  console.log(`\nProject directory: ${projectDir}`)
}

function previewProject(dir = '.') {
  console.log('🌐 Starting preview server...')
  serveProject(dir)
}

function deployProject(target, dir = '.') {
  const projectDir = path.resolve(process.cwd(), dir)
  
  if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
    console.error('❌ No package.json found. Are you in a VN project directory?')
    process.exit(1)
  }

  console.log(`🚀 Deploying to ${target}...`)
  
  switch (target?.toLowerCase()) {
    case 'github':
      deployToGitHub()
      break
    case 'netlify':
      deployToNetlify()
      break
    case 'vercel':
      deployToVercel()
      break
    default:
      console.log('🚧 Deploy functionality is not yet implemented')
      console.log('Supported targets will include:')
      console.log('- github (GitHub Pages)')
      console.log('- netlify (Netlify)')
      console.log('- vercel (Vercel)')
      console.log('- surge (Surge.sh)')
      console.log('')
      console.log('For now, you can manually deploy by:')
      console.log('1. Run: npm run build')
      console.log('2. Upload the dist/ folder to your hosting provider')
      console.log('3. Configure your domain (if needed)')
  }
}

function deployToGitHub() {
  console.log('📝 GitHub Pages deployment guide:')
  console.log('1. Build your project: npm run build')
  console.log('2. Create a gh-pages branch: git checkout -b gh-pages')
  console.log('3. Copy dist contents to root: cp -r dist/* .')
  console.log('4. Commit and push: git add . && git commit -m "Deploy" && git push origin gh-pages')
  console.log('5. Enable GitHub Pages in your repo settings')
  console.log('')
  console.log('🔄 Automated deployment will be available in a future version!')
}

function deployToNetlify() {
  console.log('🌐 Netlify deployment guide:')
  console.log('1. Build your project: npm run build')
  console.log('2. Install Netlify CLI: npm install -g netlify-cli')
  console.log('3. Deploy: netlify deploy --prod --dir=dist')
  console.log('4. Follow the prompts to set up your site')
  console.log('')
  console.log('🔄 One-click deployment will be available in a future version!')
}

function deployToVercel() {
  console.log('⚡ Vercel deployment guide:')
  console.log('1. Install Vercel CLI: npm install -g vercel')
  console.log('2. Deploy: vercel --prod')
  console.log('3. Follow the prompts (build command: npm run build, output directory: dist)')
  console.log('')
  console.log('🔄 Automated deployment will be available in a future version!')
}

function extractAssetReferences(script) {
  const references = {
    backgrounds: [],
    sprites: [], 
    audio: []
  }
  
  function processNode(node) {
    if (node.type === 'command' && node.name === 'setBackground') {
      const key = node.args?.key || node.key
      if (key && !references.backgrounds.includes(key)) {
        references.backgrounds.push(key)
      }
    }
    
    if (node.type === 'command' && node.name === 'showSprite') {
      const key = node.args?.id || node.id
      if (key && !references.sprites.includes(key)) {
        references.sprites.push(key)
      }
    }
    
    if (node.type === 'command' && (node.name === 'playMusic' || node.name === 'playAudio')) {
      const key = node.args?.idOrUrl || node.args?.id || node.idOrUrl || node.id
      if (key && !key.startsWith('http') && !references.audio.includes(key)) {
        references.audio.push(key)
      }
    }
  }
  
  // Process all scenes and nodes
  if (script.scenes) {
    script.scenes.forEach(scene => {
      if (scene.nodes) {
        if (Array.isArray(scene.nodes)) {
          scene.nodes.forEach(processNode)
        } else {
          Object.values(scene.nodes).forEach(processNode)
        }
      }
    })
  }
  
  return references
}

function getAvailableAssets(assetsDir) {
  const assets = {
    backgrounds: {},
    sprites: {},
    audio: {}
  }
  
  const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']
  const audioExts = ['.mp3', '.ogg', '.wav', '.aac', '.m4a']
  
  for (const type of Object.keys(assets)) {
    const typeDir = path.join(assetsDir, type)
    
    if (fs.existsSync(typeDir)) {
      const files = fs.readdirSync(typeDir)
      const exts = type === 'audio' ? audioExts : imageExts
      
      for (const file of files) {
        if (exts.some(ext => file.toLowerCase().endsWith(ext))) {
          const key = file.replace(/\.[^/.]+$/, '')
          assets[type][key] = file
        }
      }
    }
  }
  
  return assets
}

function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)}${units[unitIndex]}`
}

async function main() {
  const [, , cmd, subcmd, arg] = process.argv
  
  // Handle asset commands
  if (cmd === 'assets') {
    switch (subcmd) {
      case 'scan':
        await scanAssets(arg)
        return
      case 'validate':
        await validateAssets(arg)
        return
      case 'optimize':
        await optimizeAssets(arg)
        return
      default:
        console.error('Unknown assets command. Use: scan, validate, or optimize')
        process.exit(1)
    }
  }
  
  // Handle regular commands  
  switch (cmd) {
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      printHelp()
      break
    case 'create':
      if (!subcmd) { console.error('Missing <project-name>'); process.exit(1) }
      createProject(subcmd)
      break
    case 'validate':
      if (!subcmd) { console.error('Missing <script.json>'); process.exit(1) }
      await validate(subcmd)
      break
    case 'init':
      if (!subcmd) { console.error('Missing <dir>'); process.exit(1) }
      initDir(subcmd)
      break
    case 'build':
      buildProject(subcmd)
      break
    case 'serve':
      serveProject(subcmd)
      break
    case 'dev':
      devProject(subcmd)
      break
    case 'preview':
      previewProject(subcmd)
      break
    case 'deploy':
      if (!subcmd) { console.error('Missing <target>. Use: github, netlify, or vercel'); process.exit(1) }
      deployProject(subcmd, arg)
      break
    default:
      console.error(`Unknown command: ${cmd}`)
      printHelp()
      process.exit(1)
  }
}

main()
