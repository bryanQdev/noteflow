import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { colors } from '../constants/theme';

export default function RootLayout() {
  const scheme = useColorScheme();

  const lightTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: colors.light.primary,
      secondary: colors.light.secondary,
      background: colors.light.background,
      surface: colors.light.surface,
      error: colors.light.error,
    },
  };

  const darkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: colors.dark.primary,
      secondary: colors.dark.secondary,
      background: colors.dark.background,
      surface: colors.dark.surface,
      error: colors.dark.error,
    },
  };

  const theme = scheme ==='dark' ? darkTheme : lightTheme
  
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
        name="nueva-nota"
        options={{
          presentation: 'modal',
          title: 'Nueva nota'

        }} 
        />
      </Stack>
    </PaperProvider>
  );  
}