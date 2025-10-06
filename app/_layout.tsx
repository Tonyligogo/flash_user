// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '@/constants/ThemeContext';

export const unstable_settings = {
  anchor: '(root)/(tabs)',
};

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack screenOptions={{headerShown: false}}>
    //     <Stack.Screen name="index" options={{ headerShown: false }} />
    //     <Stack.Screen name="(root)" options={{ headerShown: false }} />
    //     <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    //   </Stack>
    //   <StatusBar style="auto" />
    // </ThemeProvider>
  );
}
