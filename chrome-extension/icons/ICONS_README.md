# Extension Icons

You need to create three icon sizes for the Chrome extension:

## Required Sizes
- **icon16.png** - 16x16 pixels (toolbar icon)
- **icon48.png** - 48x48 pixels (extension management page)
- **icon128.png** - 128x128 pixels (Chrome Web Store)

## Design Guidelines

### Style
- Use the Garden Horizons brand colors (green #84C061)
- Include a plant/leaf motif (🌱)
- Keep it simple and recognizable at small sizes
- Use transparent background (PNG format)

### Tools to Create Icons
1. **Figma** (free, online)
2. **Canva** (free templates)
3. **GIMP** (free, desktop)
4. **Photoshop** (paid)

### Quick Method
1. Use your existing `icon.png` from the website
2. Resize to 16x16, 48x48, and 128x128
3. Save as PNG with transparency

### Example Design
```
┌─────────────┐
│             │
│     🌱      │  ← Plant icon
│   Garden    │  ← Text (optional for larger sizes)
│  Horizons   │
│             │
└─────────────┘
```

## Temporary Solution

Until you create proper icons, you can:
1. Copy your website's `icon.png` 
2. Rename it to `icon16.png`, `icon48.png`, `icon128.png`
3. Place all three in this `icons/` folder

The extension will work with any icon, but custom-sized icons look better.
