import { ColorPalette } from '@/types/type';
import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';

// --- TYPES (Assuming these exist in '@/types/type') ---
// Re-defining them here for context completeness
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
    isDark: boolean;
    colors: ColorPalette;
    theme: ThemeMode; // Added state for user-selected theme
    setTheme: (mode: ThemeMode) => void; // Added function to change theme
}


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
    success: '#66bb6a',
};

// --- CONTEXT SETUP ---

// Define a default context value (will be overwritten by Provider)
const defaultThemeContext: ThemeContextType = {
    isDark: false,
    colors: lightColors,
    theme: 'system',
    setTheme: () => console.warn('setTheme not available outside ThemeProvider'),
};

// Create the context with the defined type
export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

// Custom hook to reliably determine the current effective color scheme
const useAppColorScheme = (mode: ThemeMode) => {
    // 1. Get the system preference
    const systemColorScheme = useColorScheme(); 
    
    // 2. Determine the effective color scheme based on user choice
    const isDark = useMemo(() => {
        if (mode === 'light') return false;
        if (mode === 'dark') return true;
        
        // If 'system', use the OS preference
        return systemColorScheme === 'dark';
    }, [mode, systemColorScheme]);

    // 3. Return the derived colors
    const colors = isDark ? darkColors : lightColors;

    return { isDark, colors };
}


export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // State to hold the user's explicit theme choice (defaults to 'system')
    const [theme, setTheme] = useState<ThemeMode>('system');
    
    // Custom hook handles the logic of mapping 'theme' and system settings to colors
    const { isDark, colors } = useAppColorScheme(theme);

    // Provide the theme state and setter to the context
    const contextValue = useMemo(() => ({
        isDark,
        colors,
        theme,
        setTheme,
    }), [isDark, colors, theme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext);