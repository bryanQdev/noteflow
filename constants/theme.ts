import { useColorScheme } from 'react-native';

export const colors = {
    light: {
        primary: '#6200EE',
        secondary: '#03DAC6',
        background: '#F6F6F6',
        surface: '#FFFFFF',
        text: '#1C1C1E',
        textSecondary: '#6B6B6B',
        error: '#B00020',
        border: '#E0E0E0',
    },
    dark: {
        primary: '#BB86FC',
        secondary: '#03DAC6',
        background: '#121212',
        surface: '#1E1E1E',
        text: '#FFFFFF',
        textSecondary: '#A0A0A0',
        error: '#CF6679',
        border: '#2C2C2C',
    },

};

export const typography = {
     sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const useAppTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? colors.dark : colors.light;
};
