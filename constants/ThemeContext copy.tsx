// ThemeContext.tsx

import { ColorPalette, ThemeContextType } from '@/types/type';
import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// --- COLOR PALETTES ---

const lightColors: ColorPalette = {
  background: '#F8F8F8',
  card: '#FFFFFF',
  tripCardSmall: '#1F1F1F',
  tripCardBig: '#e5e5e5',
  textPrimary: '#1F1F1F',
  textSecondary: '#666666',
  border: '#EAEAEA',
  accent: '#007AFF',
  ratingStar: '#FFC107',
  uberGold: '#FDD835',
  buttonBackground: '#E0E0E0',
  buttonText: '#1F1F1F',
  editButtonBg: '#F0F0F0',
  primary: '#0286FF',
  warning:'#FF4D4D',
  warningBackground: '#FFF1F0',
  success: '#38C172',
};

const darkColors: ColorPalette = {
  background: '#121212',
  card: '#1F1F1F',
  tripCardSmall: '#ffffff',
  tripCardBig: '#171717',
  textPrimary: '#E0E0E0',
  textSecondary: '#A0A0A0',
  border: '#333333',
  accent: '#7AA0F0',
  ratingStar: '#FFD700',
  uberGold: '#FFEA00',
  buttonBackground: '#2F2F2F',
  buttonText: '#E0E0E0',
  editButtonBg: '#282828',
  primary: '#0286FF',
  warning:'#FF4D4D',
  warningBackground: '#FFF1F0',
  success: '#66bb6a'
};

// --- CONTEXT SETUP ---

// Define a default context value
const defaultThemeContext: ThemeContextType = {
  isDark: true, // Defaulting to dark
  colors: darkColors, // Defaulting to dark colors
};

// Create the context with the defined type
export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  
  // Theme logic: If the system is explicitly light, use light. Otherwise, default to dark.
  const isDark = systemColorScheme !== 'light'; 

  const colors: ColorPalette = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext);