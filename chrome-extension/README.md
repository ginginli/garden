# Garden Horizons Helper - Chrome Extension

A Chrome extension that provides quick access to Garden Horizons tools and information while playing the game.

## Features

### 🎯 Popup Interface
- **Quick Actions**: One-click access to Calculator, Codes, and Live Stock
- **Active Codes**: View and copy current active codes
- **Shop Timers**: Real-time countdown to next shop restock (5-minute cycle)
- **Admin Abuse Countdown**: Days/hours/minutes until next event
- **Quick Links**: Fast navigation to all website sections

### 🎮 In-Game Integration
- **Floating Button**: Appears on Roblox Garden Horizons game page
- **Quick Menu**: Click the floating button for instant access to tools
- **Non-Intrusive**: Doesn't interfere with gameplay

### 🔔 Notifications (Optional)
- Shop restock alerts every 5 minutes
- Admin Abuse event reminders

## Installation

### Method 1: Load Unpacked (Development)

1. **Download the Extension**
   ```bash
   # Clone or download the chrome-extension folder
   ```

2. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Or click Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `chrome-extension` folder
   - The extension should now appear in your extensions list

5. **Pin the Extension**
   - Click the puzzle icon (🧩) in Chrome toolbar
   - Find "Garden Horizons Helper"
   - Click the pin icon to keep it visible

### Method 2: Chrome Web Store (Future)
Once published, users can install directly from the Chrome Web Store.

## Usage

### Using the Popup

1. **Click the Extension Icon** (🌱) in your Chrome toolbar
2. **Quick Actions**:
   - Click "Calculator" to open the profit calculator
   - Click "Codes" to view all active codes
   - Click "Live Stock" to check shop inventory

3. **Copy Codes**:
   - Click "Copy" next to any code
   - Paste directly into the game

4. **Monitor Timers**:
   - Shop restock countdown updates in real-time
   - Admin Abuse countdown shows days/hours/minutes

### In-Game Features

1. **Play Garden Horizons** on Roblox
2. **Look for the Floating Button** (🌱) in the bottom-right corner
3. **Click the Button** to open the quick menu
4. **Select a Tool** to open in a new tab

## File Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface HTML
├── popup.css             # Popup styles
├── popup.js              # Popup functionality
├── background.js         # Background service worker
├── content.js            # In-game content script
├── content.css           # In-game styles
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Development

### Adding New Features

1. **Popup Features**: Edit `popup.html`, `popup.css`, and `popup.js`
2. **In-Game Features**: Edit `content.js` and `content.css`
3. **Background Tasks**: Edit `background.js`

### Testing

1. Make changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon (↻) on the extension card
4. Test the changes

### Debugging

- **Popup**: Right-click the extension icon → "Inspect popup"
- **Background**: Click "Inspect views: service worker" on extension card
- **Content Script**: Open DevTools on the Roblox page

## Permissions Explained

- **storage**: Save user preferences and cached data
- **alarms**: Schedule shop restock notifications
- **host_permissions**: Access gardenhorizons.org for data fetching

## Future Enhancements

- [ ] Mini calculator in popup
- [ ] Mutation guide quick reference
- [ ] Plant database search
- [ ] Custom notification preferences
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Export/import settings
- [ ] Multi-language support

## Publishing to Chrome Web Store

### Requirements
1. Chrome Web Store developer account ($5 one-time fee)
2. Extension icons (16x16, 48x48, 128x128)
3. Screenshots for store listing
4. Privacy policy (if collecting user data)

### Steps
1. Create a ZIP file of the extension folder
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Click "New Item"
4. Upload the ZIP file
5. Fill in store listing details
6. Submit for review

### Store Listing Tips
- **Title**: "Garden Horizons Helper - Calculator & Tools"
- **Description**: Highlight key features and benefits
- **Screenshots**: Show popup interface and in-game button
- **Category**: Productivity or Gaming
- **Keywords**: garden horizons, roblox, calculator, codes

## Support

For issues or feature requests:
- Website: https://gardenhorizons.org
- GitHub: [Your Repository]
- Email: [Your Email]

## License

This extension is an unofficial fan tool for Garden Horizons. Not affiliated with Roblox Corporation or the game developers.

## Version History

### v1.0.0 (2026-03-08)
- Initial release
- Popup interface with quick actions
- Active codes display and copy
- Shop restock timers
- Admin Abuse countdown
- In-game floating button
- Quick menu overlay
