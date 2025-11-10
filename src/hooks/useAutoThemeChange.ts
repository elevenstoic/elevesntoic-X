import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';
import { ThemeType } from '../types';

const TIME_BASED_THEMES: Record<number, ThemeType> = {
  6: 'gradient-5', // Morning - soft
  9: 'elevenstoic-blue', // Work hours
  12: 'gradient-2', // Afternoon - energetic
  17: 'gradient-1', // Evening - calming
  20: 'dark', // Night
  23: 'gradient-4', // Late night - deep
};

export function useAutoThemeChange() {
  const { autoChangeEnabled, setTheme } = useThemeStore();

  useEffect(() => {
    if (!autoChangeEnabled) return;

    const updateTheme = () => {
      const hour = new Date().getHours();

      // Find the appropriate theme for current time
      const timeKeys = Object.keys(TIME_BASED_THEMES)
        .map(Number)
        .sort((a, b) => a - b);

      let selectedTheme: ThemeType = 'elevenstoic-blue';

      for (let i = timeKeys.length - 1; i >= 0; i--) {
        if (hour >= timeKeys[i]) {
          selectedTheme = TIME_BASED_THEMES[timeKeys[i]];
          break;
        }
      }

      setTheme(selectedTheme);
    };

    // Update theme immediately
    updateTheme();

    // Check every hour for theme updates
    const interval = setInterval(updateTheme, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoChangeEnabled]);
}
