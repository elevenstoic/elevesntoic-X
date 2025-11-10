# Elevenstoic App - Setup Guide

This guide will help you get the Elevenstoic app running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** or **yarn**
   - npm comes with Node.js
   - For yarn: `npm install -g yarn`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

4. **Mobile Development Environment**

   ### For iOS Development (Mac only):
   - Install Xcode from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```
   - Install iOS Simulator

   ### For Android Development:
   - Install Android Studio from https://developer.android.com/studio
   - Install Android SDK
   - Set up Android Emulator
   - Add Android SDK to PATH

5. **Physical Device (Recommended)**
   - Install **Expo Go** app
     - iOS: https://apps.apple.com/app/expo-go/id982107779
     - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/elevenstoic/elevenstoic-app.git
cd elevenstoic-app

# Install dependencies
npm install
```

### 2. Start Development Server

```bash
npm start
```

This will open Expo DevTools in your browser and display a QR code.

### 3. Run on Device

#### Option A: Physical Device (Recommended)
1. Open Expo Go app on your phone
2. Scan the QR code from the terminal
3. Wait for the app to load

#### Option B: iOS Simulator (Mac only)
```bash
# Press 'i' in the terminal after running npm start
# Or run directly:
npm run ios
```

#### Option C: Android Emulator
```bash
# Make sure Android emulator is running
# Press 'a' in the terminal after running npm start
# Or run directly:
npm run android
```

## Configuration

### 1. Update App Configuration

Edit `app.json` to customize:
- App name
- Bundle identifier (iOS)
- Package name (Android)
- App icon and splash screen

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys for:
- Analytics services (Mixpanel, Amplitude)
- Payment provider (RevenueCat)
- Push notifications (Firebase)

### 3. Configure Push Notifications

#### iOS:
1. Create App ID in Apple Developer Portal
2. Enable Push Notifications capability
3. Generate APNs certificate
4. Add to your Expo project

#### Android:
1. Create Firebase project
2. Download `google-services.json`
3. Place in project root
4. Update `app.json` with Firebase config

## Common Issues

### Issue: Metro bundler won't start
**Solution:**
```bash
# Clear cache and restart
expo start -c
```

### Issue: "Unable to resolve module"
**Solution:**
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install
```

### Issue: iOS build fails
**Solution:**
```bash
# Clear iOS build folder
cd ios
rm -rf build
pod install
cd ..
```

### Issue: Android build fails
**Solution:**
```bash
# Clear Android build folder
cd android
./gradlew clean
cd ..
```

### Issue: TypeScript errors
**Solution:**
```bash
# Run type check
npm run type-check

# Fix any type errors shown
```

## Development Workflow

### Hot Reload
- Enabled by default
- Shake device or press `Ctrl+M` (Android) / `Cmd+D` (iOS) for dev menu
- Press `R` to reload
- Press `D` to open developer menu

### Debugging

#### React Native Debugger
1. Install React Native Debugger: https://github.com/jhen0409/react-native-debugger
2. Open dev menu
3. Select "Debug JS Remotely"

#### Reactotron
```bash
npm install --save-dev reactotron-react-native
```

### Testing
```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

## Building for Production

### iOS (Mac only)

1. **Using Expo Build:**
   ```bash
   expo build:ios
   ```

2. **Using EAS Build:**
   ```bash
   npm install -g eas-cli
   eas build --platform ios
   ```

### Android

1. **Using Expo Build:**
   ```bash
   expo build:android
   ```

2. **Using EAS Build:**
   ```bash
   npm install -g eas-cli
   eas build --platform android
   ```

## Publishing Updates

### Over-the-Air (OTA) Updates

```bash
# Classic Expo
expo publish

# EAS Update
eas update
```

## Next Steps

1. **Customize Quotes**
   - Edit `src/constants/quotes.ts`
   - Add your own quotes and categories

2. **Add Wallpapers**
   - Add wallpaper URLs in `src/screens/WallpapersScreen.tsx`
   - Or connect to a backend API

3. **Integrate Analytics**
   - Add Mixpanel/Amplitude SDK
   - Update `src/services/analyticsService.ts`

4. **Set Up Payments**
   - Integrate RevenueCat
   - Update `src/screens/PaywallScreen.tsx`

5. **Configure Notifications**
   - Set up Firebase or APNs
   - Update `src/services/notificationService.ts`

## Resources

- **Expo Docs**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/
- **React Navigation**: https://reactnavigation.org/
- **TypeScript Docs**: https://www.typescriptlang.org/

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Contact the development team

---

Happy coding! 🚀

**Remember: You only get one life. Make it count.**
