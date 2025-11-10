import { ThemeType } from '../types';

export const ELEVENSTOIC_BLUE = '#26436B';
export const CREAM_WHITE = '#F5F5DC';
export const DEEP_BLUE = '#1a2942';
export const SOFT_GRAY = '#E8E8E8';

export const GRADIENTS = {
  'elevenstoic-blue': ['#26436B', '#3d5a8c', '#26436B'],
  'cream-white': ['#F5F5DC', '#FFFFFF', '#F5F5DC'],
  'dark': ['#0a0a0a', '#1a1a1a', '#0a0a0a'],
  'gradient-1': ['#667eea', '#764ba2', '#f093fb'],
  'gradient-2': ['#4facfe', '#00f2fe', '#43e97b'],
  'gradient-3': ['#fa709a', '#fee140', '#fa709a'],
  'gradient-4': ['#30cfd0', '#330867', '#30cfd0'],
  'gradient-5': ['#a8edea', '#fed6e3', '#a8edea'],
  'gradient-6': ['#ff9a9e', '#fecfef', '#fecfef'],
  'gradient-7': ['#ffecd2', '#fcb69f', '#ffecd2'],
  'gradient-8': ['#ff6e7f', '#bfe9ff', '#ff6e7f'],
  'gradient-9': ['#e0c3fc', '#8ec5fc', '#e0c3fc'],
  'gradient-10': ['#f093fb', '#f5576c', '#4facfe'],
};

export const getGradientForTheme = (theme: ThemeType): string[] => {
  return GRADIENTS[theme] || GRADIENTS['elevenstoic-blue'];
};

export const TEXT_COLORS = {
  'elevenstoic-blue': '#FFFFFF',
  'cream-white': '#26436B',
  'dark': '#FFFFFF',
  'gradient-1': '#FFFFFF',
  'gradient-2': '#FFFFFF',
  'gradient-3': '#FFFFFF',
  'gradient-4': '#FFFFFF',
  'gradient-5': '#26436B',
  'gradient-6': '#FFFFFF',
  'gradient-7': '#26436B',
  'gradient-8': '#FFFFFF',
  'gradient-9': '#26436B',
  'gradient-10': '#FFFFFF',
};

export const getTextColorForTheme = (theme: ThemeType): string => {
  return TEXT_COLORS[theme] || TEXT_COLORS['elevenstoic-blue'];
};
