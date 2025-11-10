export type ThemeType =
  | 'elevenstoic-blue'
  | 'cream-white'
  | 'dark'
  | 'gradient-1'
  | 'gradient-2'
  | 'gradient-3'
  | 'gradient-4'
  | 'gradient-5'
  | 'gradient-6'
  | 'gradient-7'
  | 'gradient-8'
  | 'gradient-9'
  | 'gradient-10';

export type FocusArea = 'Peace' | 'Discipline' | 'Clarity' | 'Purpose' | 'Focus';

export interface Quote {
  id: string;
  text: string;
  author?: string;
  category: FocusArea;
  tags: string[];
}

export interface Wallpaper {
  id: string;
  url: string;
  thumbnailUrl: string;
  unlockDate: Date;
  isNew: boolean;
  gradient: string[];
}

export interface UserProfile {
  id: string;
  hasCompletedOnboarding: boolean;
  focusAreas: FocusArea[];
  reminderCount: number;
  selectedTheme: ThemeType;
  savedQuotes: string[];
  savedWallpapers: string[];
  likedQuotes: string[];
  onboardingResponses: OnboardingResponse[];
  subscriptionStatus: 'trial' | 'active' | 'expired' | 'none';
  trialStartDate?: Date;
  trialEndDate?: Date;
}

export interface OnboardingResponse {
  questionId: string;
  answer: string | string[];
  emotionalWeight: number;
}

export interface NotificationConfig {
  enabled: boolean;
  count: number;
  focusAreas: FocusArea[];
  times?: string[];
}

export type RootStackParamList = {
  Onboarding: undefined;
  Paywall: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Wallpapers: undefined;
  Settings: undefined;
};
