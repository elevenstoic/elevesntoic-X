import { create } from 'zustand';
import { UserProfile, FocusArea, OnboardingResponse } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  user: UserProfile | null;
  initializeUser: () => Promise<void>;
  completeOnboarding: (responses: OnboardingResponse[], focusAreas: FocusArea[]) => Promise<void>;
  toggleLikeQuote: (quoteId: string) => Promise<void>;
  toggleSaveQuote: (quoteId: string) => Promise<void>;
  saveWallpaper: (wallpaperId: string) => Promise<void>;
  updateReminderCount: (count: number) => Promise<void>;
  updateSubscriptionStatus: (status: 'trial' | 'active' | 'expired' | 'none') => Promise<void>;
  startTrial: () => Promise<void>;
}

const DEFAULT_USER: UserProfile = {
  id: 'user_' + Date.now(),
  hasCompletedOnboarding: false,
  focusAreas: [],
  reminderCount: 3,
  selectedTheme: 'elevenstoic-blue',
  savedQuotes: [],
  savedWallpapers: [],
  likedQuotes: [],
  onboardingResponses: [],
  subscriptionStatus: 'none',
};

export const useUserStore = create<UserState>((set, get) => ({
  user: null,

  initializeUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        set({ user: JSON.parse(userData) });
      } else {
        set({ user: DEFAULT_USER });
        await AsyncStorage.setItem('user', JSON.stringify(DEFAULT_USER));
      }
    } catch (error) {
      console.error('Error loading user:', error);
      set({ user: DEFAULT_USER });
    }
  },

  completeOnboarding: async (responses: OnboardingResponse[], focusAreas: FocusArea[]) => {
    const user = get().user;
    if (!user) return;

    const updatedUser: UserProfile = {
      ...user,
      hasCompletedOnboarding: true,
      onboardingResponses: responses,
      focusAreas,
    };

    set({ user: updatedUser });
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  },

  toggleLikeQuote: async (quoteId: string) => {
    const user = get().user;
    if (!user) return;

    const likedQuotes = user.likedQuotes.includes(quoteId)
      ? user.likedQuotes.filter(id => id !== quoteId)
      : [...user.likedQuotes, quoteId];

    const updatedUser = { ...user, likedQuotes };
    set({ user: updatedUser });
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  },

  toggleSaveQuote: async (quoteId: string) => {
    const user = get().user;
    if (!user) return;

    const savedQuotes = user.savedQuotes.includes(quoteId)
      ? user.savedQuotes.filter(id => id !== quoteId)
      : [...user.savedQuotes, quoteId];

    const updatedUser = { ...user, savedQuotes };
    set({ user: updatedUser });
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  },

  saveWallpaper: async (wallpaperId: string) => {
    const user = get().user;
    if (!user) return;

    if (user.savedWallpapers.includes(wallpaperId)) return;

    const savedWallpapers = [...user.savedWallpapers, wallpaperId];
    const updatedUser = { ...user, savedWallpapers };
    set({ user: updatedUser });
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  },

  updateReminderCount: async (count: number) => {
    const user = get().user;
    if (!user) return;

    const updatedUser = { ...user, reminderCount: count };
    set({ user: updatedUser });
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  },

  updateSubscriptionStatus: async (status: 'trial' | 'active' | 'expired' | 'none') => {
    const user = get().user;
    if (!user) return;

    const updatedUser = { ...user, subscriptionStatus: status };
    set({ user: updatedUser });
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  },

  startTrial: async () => {
    const user = get().user;
    if (!user) return;

    const now = new Date();
    const trialEnd = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days

    const updatedUser: UserProfile = {
      ...user,
      subscriptionStatus: 'trial',
      trialStartDate: now,
      trialEndDate: trialEnd,
    };

    set({ user: updatedUser });
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  },
}));
