# Assets Folder

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
