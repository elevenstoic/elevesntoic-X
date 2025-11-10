# Elevenstoic App

> Transform your phone from your biggest distraction into your strongest reminder.

## 🎯 Core Philosophy

**You only get one life.**

Most people waste it scrolling through others instead of living their own. The Elevenstoic app exists to reverse that cycle. Your phone used to distract you — now it reminds you of who you wanted to be.

This app is not another productivity tool or dopamine detox project. It's a mirror. A visual and emotional reminder of your potential — designed to make you feel grounded, inspired, and capable again.

## ✨ Features

### Daily Quote Feed
- Scroll through timeless stoic and motivational quotes
- Minimal, cinematic UI with smooth animations
- Like and save quotes to your private library
- Personalized based on your focus areas and emotional profile

### Cinematic Wallpapers
- New wallpaper unlocks every day
- Download directly to your device
- Beautiful gradients matching the Elevenstoic aesthetic
- Saved wallpapers accessible anytime

### Smart Reminders
- 1-10 daily reminders personalized to your journey
- Notifications distributed throughout the day
- Tailored messages based on your focus areas (Peace, Discipline, Clarity, Purpose, Focus)
- Genuine language that feels human, not robotic

### Theme Customization
- Elevenstoic Blue Theme
- Cream White Theme
- Dark Mode
- 10 Cinematic Gradients
- Auto-change mode: themes shift throughout the day to match your rhythm

### Home Screen Widgets
- "Just One Life" widget with iconic Elevenstoic typography
- Daily Quote widget with rotating or favorite quotes
- Customizable backgrounds and colors

### AI Personalization
- Emotional onboarding flow that understands you
- Quotes filtered based on your pain points and desires
- Reminder messages personalized to your focus areas
- Continuously learns from your likes and saves

## 🏗 Tech Stack

- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for seamless navigation
- **Zustand** for lightweight state management
- **React Native Reanimated** for smooth animations
- **Expo Notifications** for push notifications
- **Expo Linear Gradient** for beautiful gradients
- **AsyncStorage** for local data persistence

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Physical device with Expo Go app (recommended)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/elevenstoic/elevenstoic-app.git
   cd elevenstoic-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator

## 📱 Running on Devices

### iOS

```bash
npm run ios
```

Requirements:
- macOS
- Xcode installed
- iOS Simulator or physical iOS device

### Android

```bash
npm run android
```

Requirements:
- Android Studio installed
- Android Emulator set up or physical Android device

## 🎨 Customization

### Adding Quotes

Add quotes to `src/constants/quotes.ts`:

```typescript
{
  id: 'unique-id',
  text: 'Your quote here',
  author: 'Author Name',
  category: 'Peace', // or Discipline, Clarity, Purpose, Focus
  tags: ['peace', 'wisdom', 'life'],
}
```

### Adding Themes

Add new gradients to `src/theme/colors.ts`:

```typescript
'your-theme-name': ['#color1', '#color2', '#color3'],
```

### Customizing Notifications

Modify notification messages in `src/services/notificationService.ts` or personalization logic in `src/services/personalizationService.ts`.

## 📊 Analytics

The app tracks key emotional and behavioral metrics:

- **Emotional Metrics**: User feedback on peace, clarity, focus
- **Behavioral Metrics**:
  - 7-day retention rate
  - Notification open rate
  - Daily active users
  - Trial-to-paid conversion

Analytics implementation in `src/services/analyticsService.ts`. Integrate with:
- Mixpanel
- Amplitude
- Firebase Analytics
- PostHog

## 💰 Monetization

### Paywall Flow

1. User completes emotional onboarding
2. Instant paywall after onboarding
3. 3-day free trial
4. €3.99/month or €23.99/year (50% discount)

### Payment Integration

For production, integrate with:
- **RevenueCat** (recommended) - https://www.revenuecat.com/
- **Stripe** - https://stripe.com/
- Apple In-App Purchases
- Google Play Billing

Update `src/screens/PaywallScreen.tsx` with your payment provider SDK.

## 🔔 Push Notifications Setup

### iOS

1. Configure push notifications in Apple Developer Portal
2. Add push notification capability in Xcode
3. Update `app.json` with your bundle identifier
4. Test on physical device (push notifications don't work on simulator)

### Android

1. Configure Firebase Cloud Messaging
2. Add `google-services.json` to your project
3. Update `app.json` with your package name

## 🏠 Widget Setup

### iOS Widgets

1. Create Widget Extension in Xcode
2. Use `QuoteWidget` or `JustOneLifeWidget` components as reference
3. Configure widget sizes (small, medium, large)

### Android Widgets

1. Create Widget Provider
2. Use `QuoteWidget` or `JustOneLifeWidget` components as reference
3. Configure widget layouts

Reference: https://docs.expo.dev/guides/widgets/

## 📁 Project Structure

```
elevenstoic-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── QuoteWidget.tsx
│   │   └── JustOneLifeWidget.tsx
│   ├── constants/           # App constants, quotes
│   │   └── quotes.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── usePersonalizedQuotes.ts
│   │   └── useAutoThemeChange.ts
│   ├── navigation/         # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/            # App screens
│   │   ├── OnboardingScreen.tsx
│   │   ├── PaywallScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── WallpapersScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── services/           # Business logic services
│   │   ├── notificationService.ts
│   │   ├── personalizationService.ts
│   │   └── analyticsService.ts
│   ├── store/              # Zustand state management
│   │   ├── themeStore.ts
│   │   └── userStore.ts
│   ├── theme/              # Theme configuration
│   │   ├── colors.ts
│   │   └── typography.ts
│   └── types/              # TypeScript types
│       └── index.ts
├── assets/                 # Images, fonts, etc.
├── App.tsx                 # Root component
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

## 🎯 User Journey

### Onboarding Flow

1. **Introduction**: "You only get one life"
2. **Current State**: "How do you feel right now?"
3. **Pain Points**: "What's your biggest struggle?"
4. **Emotional Weight**: Rate on scale of 1-10
5. **Desired State**: "What do you want to feel instead?"
6. **Commitment**: "Are you ready to trust yourself again?"

### Post-Onboarding

1. AI analyzes responses and suggests focus areas
2. Paywall with 3-day trial
3. Main app with personalized content
4. Daily reminders based on user preferences

## 🚀 Deployment

### Build for Production

#### iOS

```bash
expo build:ios
```

Or use EAS Build:
```bash
eas build --platform ios
```

#### Android

```bash
expo build:android
```

Or use EAS Build:
```bash
eas build --platform android
```

### Publishing Updates

```bash
expo publish
```

Or with EAS Update:
```bash
eas update
```

## 🔒 Environment Variables

Create a `.env` file:

```env
# Analytics
MIXPANEL_TOKEN=your_token_here
AMPLITUDE_API_KEY=your_key_here

# Payment
REVENUECAT_API_KEY=your_key_here

# Backend API (if needed)
API_BASE_URL=https://api.elevenstoic.com
```

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 📈 Success Metrics

Track these KPIs:

1. **7-day retention rate**: Target 40%+
2. **Notification open rate**: Target 60%+
3. **Daily active users**: Target 30% of installs
4. **Trial-to-paid conversion**: Target 10-15%
5. **Average session time**: Track engagement
6. **Quotes liked per session**: Measure value

## 🎨 Brand Guidelines

### Colors

- **Elevenstoic Blue**: `#26436B`
- **Cream White**: `#F5F5DC`
- **Deep Blue**: `#1a2942`

### Typography

- Clean, minimal sans-serif fonts
- Large quote text (28px)
- Generous spacing for readability
- High contrast for accessibility

### Design Principles

1. **Emotion over information** - Every screen should make you feel
2. **Visual calm** - Empty space is intentional
3. **Cinematic aesthetic** - Minimal, elegant, timeless
4. **Micro moments of beauty** - Animations and transitions matter
5. **No clutter** - Every element must be intentional

## 🤝 Contributing

This is a proprietary project for Elevenstoic. For internal team members:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request
5. Request review from team lead

## 📄 License

© 2024 Elevenstoic. All rights reserved.

## 🆘 Support

For issues or questions:
- Email: support@elevenstoic.com
- Website: https://elevenstoic.com

## 🙏 Acknowledgments

Built with love and intention for those who want to live their one life fully.

---

**Remember: You only get one life. Make it count.**
