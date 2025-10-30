# Troubleshooting Guide

Common issues and solutions when using VN Engine.

## 🚨 Installation Issues

### "npm install" fails

**Node.js version too old:**
```bash
node --version  # Should be 18.0.0 or higher
```
Solution: Update Node.js from [nodejs.org](https://nodejs.org/)

**Permission errors (Mac/Linux):**
```bash
sudo npm install -g npm  # Update npm globally
npm config set prefix ~/.npm-global  # Set user directory
```

**Corporate firewall/proxy:**
```bash
npm config set registry https://registry.npmjs.org/
npm config set proxy http://your-proxy:port
npm config set https-proxy https://your-proxy:port
```

### "build:packages" fails

**TypeScript errors:**
```bash
npm run typecheck  # Check for type errors first
```

**Missing dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install  # Clean reinstall
```

## 🔧 Development Server Issues

### "npm run dev" fails

**Port already in use:**
```
Error: Port 3000 is already in use
```
Solution: Kill the process using port 3000 or change port in `vite.config.ts`

**Module not found errors:**
```bash
# Make sure engine packages are built
cd path/to/vnEngine
npm run build:packages
```

**Assets not loading:**
- Check file paths are correct
- Ensure files exist in `public/assets/` folders
- Run `vn assets validate` to check references

### Browser shows blank page

**Check browser console (F12)** for error messages:

**JavaScript errors:**
- Usually indicates script parsing issues
- Validate your JSON with `vn validate scripts/main.json`

**CORS errors:**
- Use the development server, don't open `index.html` directly
- Make sure `npm run dev` is running

## 📄 Script Issues

### "Failed to load script"

**File doesn't exist:**
```bash
ls public/scripts/main.json  # Check file exists
```

**Invalid JSON syntax:**
```bash
vn validate public/scripts/main.json  # Check syntax
```

Common JSON errors:
- Missing commas between objects
- Extra commas after last item
- Unmatched quotes or brackets
- Using single quotes instead of double quotes

**Example of invalid JSON:**
```json
{
  "scenes": [
    {
      "id": "intro",
      "nodes": [
        { "type": "dialogue", "id": "n1", "text": "Hello" }  // Missing comma
        { "type": "end", "id": "end" }
      ]
    }  // Extra comma here
  ],
}
```

### Script validation errors

**Missing node references:**
```
Error: Node "nonexistent" not found
```
Solution: Check all `next` properties reference valid node IDs

**Circular references:**
```
Error: Circular reference detected
```
Solution: Ensure story has proper ending paths, avoid infinite loops

## 🖼️ Asset Issues

### Images not showing

**File not found:**
```bash
vn assets scan          # See what files are detected
vn assets validate      # Check script references
```

**Supported formats:**
- ✅ JPG, JPEG, PNG, SVG, WebP, GIF
- ❌ BMP, TIFF, PSD, AI

**Case sensitivity:**
- `room.jpg` ≠ `Room.jpg` ≠ `ROOM.JPG`
- Always use lowercase filenames

### Audio not playing

**Browser autoplay policies:**
- Most browsers block autoplay until user interaction
- First audio might not play until user clicks something

**Supported formats:**
- ✅ MP3, OGG, WAV, AAC, M4A
- ❌ FLAC, WMA (not web-compatible)

**File size limits:**
- Keep individual files under 10MB
- Large files cause loading delays

## 🌐 Build & Deploy Issues

### "npm run build" fails

**Out of memory:**
```bash
export NODE_OPTIONS="--max-old-space-size=4096"  # Linux/Mac
set NODE_OPTIONS=--max-old-space-size=4096       # Windows
npm run build
```

**Asset optimization errors:**
- Check all referenced assets exist
- Remove unused large files
- Compress images before building

### Deployment issues

**Assets not loading on deployed site:**
- Check `vite.config.ts` has `base: './'`
- Ensure all paths are relative, not absolute
- Test with `npm run serve` before deploying

**404 errors on GitHub Pages:**
- Add `.nojekyll` file to disable Jekyll processing
- Check repository settings have Pages enabled
- Ensure `dist` folder contents are in correct branch

## 🔍 Debugging Tools

### Built-in CLI diagnostics

```bash
vn assets scan          # List all discovered assets
vn assets validate      # Check script-asset consistency  
vn validate script.json # Validate script syntax
```

### Browser debugging

**Open Developer Tools (F12):**
- **Console tab**: JavaScript errors and logs
- **Network tab**: Failed asset loads (red entries)
- **Application tab**: Local storage, service workers

**Common console messages:**
```
404 (Not Found) - Asset file missing
SyntaxError - Invalid JSON in script
TypeError - JavaScript/React errors
```

### VS Code debugging

**Install recommended extensions:**
- ES7+ React/Redux/JS snippets
- JSON Tools
- Error Lens

**Use integrated terminal:**
```bash
Ctrl+` (backtick) # Open terminal in VS Code
```

## 📱 Mobile Issues

### Performance on mobile devices

**Slow loading:**
- Compress images (use [TinyPNG](https://tinypng.com/))
- Reduce audio file sizes
- Test on actual devices, not just desktop browser mobile mode

**Touch controls not working:**
- Ensure click handlers work with touch events
- Test on various screen sizes
- Check viewport meta tag exists

### Mobile browser compatibility

**Audio issues:**
- iOS Safari requires user gesture for audio
- Android Chrome may have different autoplay policies
- Test background music and sound effects separately

## 🆘 Getting More Help

### Before asking for help, please:

1. **Check this guide** for your specific issue
2. **Run diagnostics:**
   ```bash
   vn assets validate
   vn validate public/scripts/main.json
   ```
3. **Check browser console** for error messages
4. **Try with a fresh project** to isolate the issue

### How to report issues effectively

**Include this information:**
- Operating System and version
- Node.js version (`node --version`)
- Browser and version
- Complete error message (copy/paste, not screenshot)
- Steps to reproduce the issue
- Sample code/script if relevant

**Where to get help:**
- 🐛 **Bug reports**: [GitHub Issues](https://github.com/DianaABA/vnEngine/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/DianaABA/vnEngine/discussions)
- 📧 **Private issues**: Contact maintainers directly

### Self-help resources

- 📖 **Documentation**: Check all files in `/docs/` folder
- 🎯 **Examples**: Look at working projects in `/apps/` folder
- 🔍 **Search**: Check if your issue was already solved in GitHub Issues

---

## 🎯 Pro Tips for Smooth Development

1. **Start simple** - Get basic dialogue working before adding complex features
2. **Save frequently** - Use version control (Git) for your projects  
3. **Test often** - Run `npm run dev` after every major change
4. **Keep backups** - Especially of working versions before big changes
5. **Use the CLI tools** - `vn assets validate` catches many issues early

**Remember: The VN Engine community is here to help! Don't hesitate to ask questions. 🚀**