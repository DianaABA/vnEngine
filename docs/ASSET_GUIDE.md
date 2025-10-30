# Asset Preparation Guide

This guide helps you prepare images, audio, and other assets for your visual novel.

## 📁 Asset Organization

### Folder Structure
```
public/
  assets/
    backgrounds/    # Background images
    sprites/        # Character images
    audio/          # Music and sound effects
    ui/             # UI elements (optional)
```

### File Naming
- Use **descriptive names**: `school_hallway_day.jpg` instead of `bg1.jpg`
- No spaces or special characters: Use `_` or `-` instead
- **Consistent naming**: Pick a pattern and stick to it

## 🖼️ Image Assets

### Backgrounds

**Recommended Specs:**
- **Resolution**: 1920x1080 (16:9 aspect ratio)
- **Format**: JPG for photos, PNG for illustrations, SVG for simple graphics
- **File size**: Under 500KB for web deployment

**Preparation Steps:**
1. **Resize to 1920x1080** (the engine will scale automatically)
2. **Compress images** using tools like:
   - [TinyPNG](https://tinypng.com/) - Online compression
   - [ImageOptim](https://imageoptim.com/) - Mac app
   - [GIMP](https://gimp.org/) - Free image editor
3. **Save with descriptive names**

**Example naming:**
```
school_classroom_day.jpg
school_classroom_night.jpg  
home_bedroom_morning.jpg
park_bench_sunset.jpg
```

### Character Sprites

**Recommended Specs:**
- **Resolution**: 512x1024 to 1024x2048 (1:2 aspect ratio)
- **Format**: PNG with transparency
- **File size**: Under 200KB per sprite

**Character Design Tips:**
- **Consistent art style** across all characters
- **Multiple expressions** per character (happy, sad, angry, etc.)
- **Transparent backgrounds** so they overlay properly
- **Standing poses** work best (full body or waist-up)

**Example naming:**
```
alex_neutral.png
alex_happy.png
alex_sad.png
emma_speaking.png
emma_thinking.png
```

### Creating Variations

For the same character with different emotions:
```json
// In your script
{
  "type": "command",
  "name": "showSprite", 
  "args": { "id": "alex_happy" },
  "next": "dialogue1"
}
```

## 🎵 Audio Assets

### Background Music

**Recommended Specs:**
- **Format**: MP3 (best compatibility) or OGG
- **Length**: 2-5 minutes, designed to loop seamlessly
- **Quality**: 128-192 kbps (balance of quality and file size)
- **File size**: Under 5MB per track

**Music Types:**
- **Atmospheric**: For setting mood (peaceful, tense, romantic)
- **Thematic**: Character or location themes
- **Transitional**: For scene changes

### Sound Effects

**Recommended Specs:**
- **Format**: MP3 or WAV
- **Length**: Under 5 seconds typically
- **Quality**: 44.1kHz sample rate
- **File size**: Under 100KB per effect

**Common SFX:**
- UI sounds (click, select, confirm)
- Environmental (footsteps, doors, phones)
- Emotional (gasps, sighs, laughter)

### Audio Sources

**Free Resources:**
- [Freesound.org](https://freesound.org/) - Community sound library
- [Incompetech](https://incompetech.com/) - Royalty-free music  
- [Zapsplat](https://zapsplat.com/) - Professional sound library
- [YouTube Audio Library](https://studio.youtube.com/) - Free music and SFX

**Tools for Editing:**
- [Audacity](https://audacityteam.org/) - Free audio editor
- [Reaper](https://reaper.fm/) - Professional DAW with trial
- [GarageBand](https://apple.com/mac/garageband/) - Mac only

## 🎨 Art Asset Creation

### Creating Your Own Art

**Digital Art Tools:**
- **Free**: GIMP, Krita, Paint.NET
- **Paid**: Photoshop, Clip Studio Paint, Procreate (iPad)
- **Vector**: Inkscape (free), Illustrator (paid)

**Art Styles That Work Well:**
- **Anime/Manga**: Popular in VN community
- **Semi-realistic**: Broad appeal
- **Pixel art**: Nostalgic, easier for beginners
- **Minimalist**: Focus on story over visuals

### Commissioning Art

**When to Commission:**
- You're not an artist but want professional quality
- Need consistent character designs
- Want to focus on writing/programming

**Platforms to Find Artists:**
- [Fiverr](https://fiverr.com/) - Various price points
- [DeviantArt](https://deviantart.com/) - Large artist community
- [ArtStation](https://artstation.com/) - Professional artists
- Twitter/Reddit art communities

**Commission Tips:**
- Provide **detailed character descriptions**
- Request **multiple emotions/poses** per character
- Ask for **source files** (PSD/AI) for future edits
- Establish **clear licensing** terms

## 📊 Asset Optimization

### Automated Optimization

Use the VN Engine CLI to check your assets:

```bash
# Scan all assets in your project
vn assets scan

# Validate that script references match actual files
vn assets validate

# Future: Automatic optimization
vn assets optimize
```

### Manual Optimization

**Image Compression:**
```bash
# Using ImageMagick (install separately)
magick input.jpg -quality 85 -resize 1920x1080 output.jpg

# Batch process multiple images
for file in *.jpg; do magick "$file" -quality 85 "${file%.*}_optimized.jpg"; done
```

**Audio Compression:**
```bash
# Using FFmpeg (install separately) 
ffmpeg -i input.wav -codec:a mp3 -b:a 128k output.mp3

# Batch convert WAV to MP3
for file in *.wav; do ffmpeg -i "$file" -codec:a mp3 -b:a 128k "${file%.*}.mp3"; done
```

## 🔍 Asset Validation

### Common Issues

**Images Not Loading:**
- File name doesn't match script reference
- File is in wrong folder
- Image format not supported (use JPG/PNG/SVG)

**Audio Not Playing:**
- Audio format not supported (use MP3/OGG)
- File size too large (compress audio)
- File path incorrect

### Testing Assets

1. **Use the CLI**: `vn assets validate` 
2. **Check browser console** for 404 errors
3. **Test on different devices** (mobile, desktop)
4. **Verify loading performance** on slower connections

## 📱 Mobile Considerations

### Image Optimization for Mobile
- **Smaller file sizes** for faster loading on cellular
- **Test on actual devices** - simulators aren't always accurate
- **Consider retina displays** but balance with file size

### Audio for Mobile
- **Compressed formats** essential for data usage
- **Shorter music loops** reduce memory usage
- **Test autoplay policies** (mobile browsers restrict autoplay)

## 🌐 Web Performance

### Loading Strategies
- **Preload critical assets** (main character, first background)
- **Lazy load** assets for later scenes
- **Provide loading indicators** for better UX

### CDN and Hosting
- **Use a CDN** for faster global delivery
- **Enable compression** (gzip/brotli) on your server
- **Cache assets** with appropriate headers

## ✅ Asset Checklist

Before publishing, verify:

- [ ] All images are properly sized and compressed
- [ ] Audio files are optimized and loop correctly
- [ ] File names match script references exactly
- [ ] No unused assets (clean up unused files)
- [ ] All assets load correctly in different browsers
- [ ] Total download size is reasonable (under 50MB for web)
- [ ] Assets work on mobile devices
- [ ] Copyright/licensing is handled properly

## 🎯 Pro Tips

### Workflow Efficiency
1. **Batch process** similar assets together
2. **Create templates** for consistent sizing
3. **Use version control** (Git) to track asset changes
4. **Keep source files** separate from optimized web assets

### Quality Control
- **Preview assets in-game** before finalizing
- **Get feedback** from testers on different devices
- **Have a consistent art direction** document
- **Regular backups** of all source materials

### Future-Proofing
- **Keep high-resolution sources** for later platforms
- **Document your asset pipeline** for team members
- **Plan for localization** (text in images needs translation)

---

**With well-prepared assets, your visual novel will look professional and perform smoothly across all devices! 🎨**