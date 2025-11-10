# Assets Directory

This directory contains all static assets for the Elevenstoic app.

## Required Assets

### App Icons

Create the following files:

1. **icon.png** (1024x1024)
   - Main app icon
   - Used for both iOS and Android
   - Should feature the Elevenstoic branding
   - Background color: #26436B (Elevenstoic Blue)

2. **adaptive-icon.png** (1024x1024)
   - Android adaptive icon foreground
   - Transparent background
   - Keep important content in safe zone (center 66%)

3. **splash.png** (1242x2436)
   - Launch screen image
   - Background: #26436B
   - Center logo or "JUST ONE LIFE" text

4. **favicon.png** (48x48)
   - Web favicon
   - Simple Elevenstoic logo

5. **notification-icon.png** (96x96)
   - Android notification icon
   - Monochrome, transparent background
   - White foreground

### Fonts (Optional)

If using custom fonts, add them here:

```
fonts/
├── Elevenstoic-Regular.ttf
├── Elevenstoic-Medium.ttf
├── Elevenstoic-Bold.ttf
└── Elevenstoic-Light.ttf
```

Then load in App.tsx:

```typescript
import * as Font from 'expo-font';

await Font.loadAsync({
  'Elevenstoic-Regular': require('./assets/fonts/Elevenstoic-Regular.ttf'),
  'Elevenstoic-Bold': require('./assets/fonts/Elevenstoic-Bold.ttf'),
});
```

### Wallpapers

For production, store wallpapers on a CDN. For local development, you can add sample wallpapers:

```
wallpapers/
├── wallpaper-1.jpg (1080x1920)
├── wallpaper-2.jpg (1080x1920)
├── wallpaper-3.jpg (1080x1920)
└── ...
```

### Lottie Animations (Optional)

For enhanced animations, add Lottie JSON files:

```
animations/
├── heart-animation.json
├── bookmark-animation.json
└── loading-animation.json
```

## Design Guidelines

### App Icon
- Clean, minimal design
- Represents "Just One Life" philosophy
- Recognizable at small sizes
- Works on both light and dark backgrounds

### Splash Screen
- Instant visual impact
- Calm, centered design
- Elevenstoic brand colors
- Fast loading perception

### Wallpapers
- High resolution (1080x1920 minimum)
- Cinematic aesthetic
- Match brand gradients
- Inspirational without text (usually)
- Work well as phone backgrounds

## Creating Assets

### Tools Recommended
- **Figma** - UI design and exports
- **Adobe Illustrator** - Vector graphics
- **Adobe Photoshop** - Image editing
- **Sketch** - macOS design tool

### Export Guidelines

#### App Icons
```bash
# iOS sizes
20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80,
87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

# Android sizes
48x48, 72x72, 96x96, 144x144, 192x192, 512x512
```

#### Splash Screens
```bash
# iOS
640x1136, 750x1334, 1242x2208, 1125x2436, 1242x2688, 2048x2732

# Android
320x480, 480x800, 720x1280, 1080x1920
```

## Asset Generation

### Using Expo

Expo can generate icons and splash screens automatically:

```json
// app.json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#26436B"
    }
  }
}
```

Run:
```bash
expo prebuild
```

### Manual Generation

Use tools like:
- https://www.appicon.co/
- https://apetools.webprofusion.com/app/#/tools/imagegorilla

## Placeholder Assets

For development, you can use:
- **Icon**: Simple text "E11" on #26436B background
- **Splash**: Text "ELEVENSTOIC" centered on #26436B
- **Wallpapers**: Use https://picsum.photos/ or https://unsplash.com/

## Brand Colors Reference

```
Elevenstoic Blue: #26436B
Cream White: #F5F5DC
Deep Blue: #1a2942
Soft Gray: #E8E8E8
```

## Copyright

All assets should be:
- Original creations or properly licensed
- Comply with platform guidelines (iOS Human Interface Guidelines, Material Design)
- Represent the Elevenstoic brand accurately

---

**Remember: Every pixel matters. Make it beautiful.**
