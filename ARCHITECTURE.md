# Elevenstoic App - Architecture Documentation

## Overview

The Elevenstoic app is built with a clean, modular architecture focusing on emotional impact, personalization, and user experience.

## Architecture Principles

1. **Separation of Concerns** - Clear boundaries between UI, business logic, and data
2. **Type Safety** - Full TypeScript coverage for reliability
3. **State Management** - Centralized state with Zustand
4. **Service Layer** - Business logic isolated in services
5. **Personalization First** - AI-driven content filtering based on user profile

## Technology Stack

### Core
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type safety and developer experience

### Navigation
- **React Navigation** - Stack and tab navigation
- **@react-navigation/stack** - Stack navigator
- **@react-navigation/bottom-tabs** - Tab navigator

### State Management
- **Zustand** - Lightweight state management
- **AsyncStorage** - Local persistence

### UI/UX
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions
- **Expo Linear Gradient** - Beautiful gradients
- **Expo Haptics** - Tactile feedback

### Services
- **Expo Notifications** - Push notifications
- **Expo Media Library** - Wallpaper downloads
- **Expo File System** - File management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── QuoteWidget.tsx
│   └── JustOneLifeWidget.tsx
│
├── constants/           # Static data and configuration
│   └── quotes.ts        # Quote database
│
├── hooks/              # Custom React hooks
│   ├── usePersonalizedQuotes.ts
│   └── useAutoThemeChange.ts
│
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
│
├── screens/            # Screen components
│   ├── OnboardingScreen.tsx
│   ├── PaywallScreen.tsx
│   ├── HomeScreen.tsx
│   ├── WallpapersScreen.tsx
│   └── SettingsScreen.tsx
│
├── services/           # Business logic layer
│   ├── notificationService.ts
│   ├── personalizationService.ts
│   └── analyticsService.ts
│
├── store/              # State management
│   ├── themeStore.ts
│   └── userStore.ts
│
├── theme/              # Design system
│   ├── colors.ts
│   └── typography.ts
│
└── types/              # TypeScript definitions
    └── index.ts
```

## Data Flow

### User Journey Flow

```
1. App Launch
   ↓
2. Check User State
   ├─ Not Onboarded → Onboarding Screen
   │                   ↓
   │                   AI Analysis → Focus Areas
   │                   ↓
   ├─ No Subscription → Paywall Screen
   │                    ↓
   │                    Trial Start
   │                    ↓
   └─ Active User → Main App (Home/Wallpapers/Settings)
```

### Quote Personalization Flow

```
1. User completes onboarding
   ↓
2. Responses analyzed by PersonalizationService
   ↓
3. Focus areas identified
   ↓
4. Quotes filtered and ranked
   ↓
5. Personalized feed generated
   ↓
6. User interactions (likes/saves) → Re-ranking
```

### Notification Flow

```
1. User sets reminder count and focus areas
   ↓
2. NotificationService schedules notifications
   ↓
3. Notifications distributed throughout day
   ↓
4. Each notification includes personalized message
   ↓
5. User opens notification → Analytics tracked
```

## State Management

### Theme Store
```typescript
interface ThemeState {
  currentTheme: ThemeType
  autoChangeEnabled: boolean
  setTheme: (theme) => void
  toggleAutoChange: () => void
}
```

**Responsibilities:**
- Theme selection and persistence
- Auto-change theme functionality
- Gradient management

### User Store
```typescript
interface UserState {
  user: UserProfile
  completeOnboarding: (responses, focusAreas) => void
  toggleLikeQuote: (quoteId) => void
  toggleSaveQuote: (quoteId) => void
  updateReminderCount: (count) => void
  updateSubscriptionStatus: (status) => void
}
```

**Responsibilities:**
- User profile management
- Onboarding state
- Quote interactions
- Subscription status
- Reminder preferences

## Service Layer

### PersonalizationService

**Purpose:** AI-driven content personalization

**Key Methods:**
- `getPersonalizedQuotes()` - Filter and rank quotes
- `suggestFocusAreas()` - Analyze onboarding responses
- `getPersonalizedNotification()` - Generate reminder messages

**Algorithm:**
```typescript
Quote Score =
  (User Liked Before × 10) +
  (Keyword Match × 5) +
  (Emotional Weight × 0.5) +
  (Random Factor × 2)
```

### NotificationService

**Purpose:** Push notification management

**Key Methods:**
- `requestPermissions()` - Get notification permissions
- `scheduleReminders()` - Schedule daily notifications
- `notifyNewWallpaper()` - Trigger wallpaper notifications

**Distribution Algorithm:**
```typescript
Distribute N reminders between 8 AM - 10 PM
Interval = 14 hours / N reminders
```

### AnalyticsService

**Purpose:** Track user behavior and metrics

**Key Events:**
- Onboarding complete
- Quote interactions (like/save)
- Wallpaper downloads
- Theme changes
- Notification opens
- Subscription events

## Component Architecture

### Screen Components

#### OnboardingScreen
- Multi-step emotional questionnaire
- Progress tracking
- Response collection
- AI analysis trigger

#### PaywallScreen
- Subscription options
- Trial management
- Payment integration point
- Feature showcase

#### HomeScreen
- Personalized quote feed
- Vertical scroll with pagination
- Like/save interactions
- Dynamic theming

#### WallpapersScreen
- Grid layout
- Download functionality
- New wallpaper badges
- Media library integration

#### SettingsScreen
- Theme customization
- Reminder configuration
- Focus area management
- Subscription status

### Reusable Components

#### QuoteWidget
- Home screen widget display
- Gradient background
- Quote + author rendering

#### JustOneLifeWidget
- Static motivational widget
- Brand typography
- Customizable colors

## Theming System

### Theme Types
- `elevenstoic-blue` - Brand primary
- `cream-white` - Light mode
- `dark` - Dark mode
- `gradient-1` to `gradient-10` - Cinematic gradients

### Auto-Change Logic
```typescript
Time Slots:
06:00 - Morning (soft gradients)
09:00 - Work hours (brand blue)
12:00 - Afternoon (energetic)
17:00 - Evening (calming)
20:00 - Night (dark)
23:00 - Late night (deep gradients)
```

### Dynamic Text Color
- Auto-calculated based on gradient brightness
- High contrast for readability
- Consistent across all themes

## Personalization Engine

### Onboarding Analysis

**Input:** User responses to emotional questions

**Processing:**
1. Extract keywords from answers
2. Calculate emotional weight (1-10 scale)
3. Match keywords to focus areas
4. Rank focus areas by relevance
5. Suggest top 3 focus areas

**Output:** Personalized focus areas and quote filtering

### Quote Ranking

**Factors:**
- Previous likes/saves
- Focus area alignment
- Keyword matching
- Emotional resonance
- Freshness (random factor)

**Re-ranking:** Dynamic based on continued interactions

### Notification Personalization

**Per Focus Area Messages:**
- Peace: Calming, grounding messages
- Discipline: Action-oriented, accountability
- Clarity: Focus, direction
- Purpose: Meaning, legacy
- Focus: Attention, presence

## Performance Considerations

### Optimizations
1. **Lazy Loading** - Screens loaded on demand
2. **Memoization** - Quote lists memoized
3. **Virtual Lists** - FlatList for scrolling
4. **Image Optimization** - Thumbnail previews
5. **State Persistence** - AsyncStorage for offline

### Memory Management
- Clear notification cache
- Limit stored events
- Optimize image loading
- Minimize re-renders

## Security Considerations

1. **Local Data** - AsyncStorage encrypted on iOS
2. **API Keys** - Environment variables
3. **Payment** - PCI compliance via providers
4. **Push Tokens** - Secure storage
5. **User Privacy** - Minimal data collection

## Scalability

### Backend Integration Points
- Quote API endpoint
- Wallpaper CDN
- Analytics ingestion
- Payment webhooks
- User sync service

### Future Considerations
- Cloud sync
- Social features
- Advanced AI personalization
- ML-based recommendations
- A/B testing framework

## Testing Strategy

### Unit Tests
- Services (personalization, notifications, analytics)
- Store actions and selectors
- Utility functions

### Integration Tests
- Navigation flows
- User journeys
- Payment flows

### E2E Tests
- Complete onboarding
- Quote interactions
- Wallpaper downloads
- Settings changes

## Deployment Pipeline

```
1. Development
   ↓
2. Type Check + Lint
   ↓
3. Unit Tests
   ↓
4. Build (iOS + Android)
   ↓
5. Internal Testing (TestFlight/Internal Track)
   ↓
6. Beta Release
   ↓
7. Production Release
   ↓
8. OTA Updates (minor changes)
```

## Monitoring & Analytics

### Key Metrics
1. **Engagement**
   - Daily Active Users (DAU)
   - Session duration
   - Quotes viewed per session
   - Interactions per session

2. **Retention**
   - Day 1, 7, 30 retention
   - Churn rate
   - Cohort analysis

3. **Conversion**
   - Trial start rate
   - Trial-to-paid conversion
   - Revenue per user

4. **Emotional Impact**
   - User feedback sentiment
   - NPS score
   - Review ratings

## Documentation

### Code Documentation
- JSDoc comments for services
- Type definitions for all interfaces
- README in each major directory

### External Documentation
- README.md - Overview and setup
- SETUP.md - Detailed installation
- ARCHITECTURE.md - This file
- API.md - Backend integration (if applicable)

---

This architecture is designed to scale, maintain, and evolve as Elevenstoic grows. The focus is on emotional impact, personalization, and user experience.

**Remember: You only get one life. Build it intentionally.**
