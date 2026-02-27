# Calculator Images

This folder contains plant and seed images for the Garden Horizons Calculator.

## Folder Structure
```
calculator/images/
├── seeds/          # Seed images (26 plants)
├── plants/         # Produce/plant images (26 plants)
└── mutations/      # Mutation icons (optional, 16 mutations)
```

## Required Images

### Seeds (26 images)
All seed images should be named in lowercase with the plant ID:
- `carrot.webp`, `corn.webp`, `dandelion.webp`, etc.

### Plants (26 images)
All plant/produce images should be named in lowercase with the plant ID:
- `carrot.webp`, `corn.webp`, `dandelion.webp`, etc.

## Image Specifications
- **Format**: WebP (preferred) or PNG
- **Size**: 128x128px or 256x256px recommended
- **Background**: Transparent preferred
- **Quality**: High quality, clear visibility

## How to Get Images

### Option 1: Download from Wiki
Visit the official Garden Horizons Wiki and download images from each plant page:
https://garden-horizons.fandom.com/wiki/Plants

See `IMAGE_SOURCES.md` for direct links to each plant's Wiki page.

### Option 2: Extract from Game
If you have access to the game files, you can extract images directly.

### Option 3: Use Existing Images
Some images may already exist in other project folders. Check:
- `Epics_Horizon_macro_v1.0.0/images/Seeds/` (if available)

## Usage in Calculator

Images are referenced in the calculator using relative paths:
```javascript
const plantImage = `images/seeds/${plant.id}.webp`;
```

If an image is missing, the calculator will fall back to emoji display.

## Attribution
All images are sourced from the official Garden Horizons Wiki and are used for educational purposes.
