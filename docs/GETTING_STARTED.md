# VN Engine - Getting Started Guide

Welcome to VN Engine! This guide will help you create your first visual novel in just a few minutes.

## 🚀 Quick Start (5 minutes)

### Step 1: Prerequisites

You'll need:
- **Node.js 18+** ([Download here](https://nodejs.org/))
- A text editor (VS Code recommended)
- Basic familiarity with JSON (don't worry, it's simple!)

### Step 2: Create Your Project

```bash
# Clone or download the VN Engine repository
git clone https://github.com/DianaABA/vnEngine.git
cd vnEngine

# Install dependencies and build the engine
npm install
npm run build:packages

# Create your first visual novel project
node packages/cli/bin/vn.js create my-first-novel

# Navigate to your project
cd my-first-novel

# Install project dependencies
npm install

# Start the development server
npm run dev
```

Your browser will open automatically and show your visual novel running!

### Step 3: Customize Your Story

Edit `public/scripts/main.json` to change your story:

```json
{
  "startScene": "intro",
  "scenes": [
    {
      "id": "intro",
      "start": "greeting",
      "nodes": [
        {
          "type": "dialogue",
          "id": "greeting", 
          "speaker": "Your Character",
          "text": "Welcome to my visual novel!",
          "next": "choice1"
        },
        {
          "type": "choice",
          "id": "choice1",
          "choices": [
            { "text": "I'm excited!", "next": "happy" },
            { "text": "Tell me more", "next": "info" }
          ]
        },
        {
          "type": "dialogue",
          "id": "happy",
          "speaker": "Your Character", 
          "text": "Great! Let's begin your adventure!",
          "next": "end"
        },
        {
          "type": "dialogue",
          "id": "info",
          "text": "This engine makes creating visual novels super easy!",
          "next": "end"
        },
        { "type": "end", "id": "end" }
      ]
    }
  ]
}
```

### Step 4: Add Your Assets

1. **Backgrounds**: Drop images into `public/assets/backgrounds/`
2. **Characters**: Drop character images into `public/assets/sprites/`
3. **Audio**: Drop music/sounds into `public/assets/audio/`

Reference them in your script:
```json
{
  "type": "command",
  "id": "setbg",
  "name": "setBackground", 
  "args": { "key": "my_background" },
  "next": "dialogue1"
}
```

## 📚 Script Format Reference

### Node Types

#### Dialogue Node
```json
{
  "type": "dialogue",
  "id": "unique_id",
  "speaker": "Character Name", 
  "text": "What they say",
  "next": "next_node_id"
}
```

#### Choice Node
```json
{
  "type": "choice",
  "id": "unique_id",
  "choices": [
    { "text": "Option 1", "next": "node1" },
    { "text": "Option 2", "next": "node2", "visibleIf": "flag_name" }
  ]
}
```

#### Command Node
```json
{
  "type": "command",
  "id": "unique_id",
  "name": "setBackground",
  "args": { "key": "background_name" },
  "next": "next_node"
}
```

### Available Commands

- `setBackground` - Change background image
- `showSprite` - Show character sprite  
- `hideSprite` - Hide character sprite
- `playMusic` - Play background music
- `stopMusic` - Stop music
- `setFlag` - Set a story flag (for branching)
- `setVar` - Set a variable

## 🎨 Asset Guidelines

### Images
- **Backgrounds**: 1920x1080 recommended, JPG/PNG/SVG
- **Sprites**: 512x1024 or smaller, PNG recommended
- **File names**: Use descriptive names like `school_hallway.jpg`, `character_happy.png`

### Audio
- **Music**: MP3/OGG, loopable background tracks
- **Sound Effects**: Short WAV/MP3 files
- **Keep file sizes reasonable** for web loading

## 🔧 CLI Commands

```bash
# Project management
vn create <project-name>    # Create new project
vn dev                      # Start development server
vn build                    # Build for production
vn serve                    # Preview production build

# Asset management  
vn assets scan              # Scan and list all assets
vn assets validate          # Check for missing assets
vn validate scripts/main.json  # Validate script file

# Deployment helpers
vn deploy github            # GitHub Pages deployment guide
vn deploy netlify           # Netlify deployment guide
vn deploy vercel            # Vercel deployment guide
```

## 🚀 Publishing Your Visual Novel

### Web Deployment

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to any static hosting service:
   - **GitHub Pages**: Free, easy for GitHub users
   - **Netlify**: Drag-and-drop deployment
   - **Vercel**: Git-based deployment
   - **Surge.sh**: Simple command-line deployment

### Mobile (Coming Soon)
React Native support is in development for iOS/Android apps.

## 🎯 Tips for Success

### Writing Great Stories
- **Keep dialogue concise** - readers scan quickly
- **Make choices meaningful** - each should lead to different outcomes  
- **Use assets strategically** - backgrounds set mood, sprites show emotions
- **Test frequently** - use `npm run dev` to see changes instantly

### Performance  
- **Optimize images** - compress large files before adding them
- **Test on mobile** - many players use phones/tablets
- **Keep scripts organized** - use descriptive IDs and comments

### Debugging
- **Check the browser console** for error messages
- **Use `vn assets validate`** to find missing files
- **Start simple** - get basic dialogue working before adding complex features

## 🆘 Getting Help

### Troubleshooting

**"Loading script failed"**
- Check that `public/scripts/main.json` exists
- Verify JSON syntax with a validator
- Ensure all referenced assets exist

**"Asset not found"**  
- Run `vn assets scan` to see available assets
- Check file names match exactly (case-sensitive)
- Ensure files are in correct folders

**"Build fails"**
- Make sure you ran `npm run build:packages` in the engine repo
- Check that all dependencies are installed
- Try deleting `node_modules` and running `npm install` again

### Community & Support

- 📖 **Documentation**: [GitHub Wiki](https://github.com/DianaABA/vnEngine/wiki)
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/DianaABA/vnEngine/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/DianaABA/vnEngine/discussions)
- 📧 **Email**: For private inquiries

## 🎉 What's Next?

Once you've created your first visual novel:

1. **Experiment with branching stories** using flags and conditions
2. **Add sound effects and music** for better immersion
3. **Create multiple scenes** for longer narratives
4. **Share your work** with the community
5. **Contribute back** - help improve the engine!

---

**Ready to create something amazing? Let's build your visual novel! 🚀**