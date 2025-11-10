import { create } from 'zustand';
import { ThemeType } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  currentTheme: ThemeType;
  autoChangeEnabled: boolean;
  setTheme: (theme: ThemeType) => Promise<void>;
  toggleAutoChange: () => Promise<void>;
  initializeTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentTheme: 'elevenstoic-blue',
  autoChangeEnabled: false,

  setTheme: async (theme: ThemeType) => {
    set({ currentTheme: theme });
    await AsyncStorage.setItem('theme', theme);
  },

  toggleAutoChange: async () => {
    const newValue = !get().autoChangeEnabled;
    set({ autoChangeEnabled: newValue });
    await AsyncStorage.setItem('autoChange', JSON.stringify(newValue));
  },

  initializeTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const autoChange = await AsyncStorage.getItem('autoChange');

      if (savedTheme) {
        set({ currentTheme: savedTheme as ThemeType });
      }
      if (autoChange) {
        set({ autoChangeEnabled: JSON.parse(autoChange) });
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  },
}));
