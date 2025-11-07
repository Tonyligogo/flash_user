import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorPalette } from '@/types/type';
import { ThemedText } from './themed-text';


interface SupportLayoutProps {
  title: string;
  children: React.ReactNode;
  isSubmitting?: boolean;
  scrollViewStyle?: ViewStyle;
}

// --- ICON PLACEHOLDER ---
const Icon = ({ name }: { name: string; }) => {
  const emojiMap: { [key: string]: string } = {
    'back': '❮',
  };
  return <ThemedText style={{ fontSize: 20}}>{emojiMap[name] || '?'}</ThemedText>;
};


const SupportLayout: React.FC<SupportLayoutProps> = ({ 
  title, 
  children, 
  isSubmitting = false,
  scrollViewStyle = {},
}) => {
  const { colors } = useTheme();
  const themedStyles = styles(colors);
  const router = useRouter();

  return (
    <SafeAreaView style={[themedStyles.container]}>
      
      {/* 1. Expo Router Stack Configuration (hides native header) */}
      <Stack.Screen 
        options={{ 
            headerShown: false, 
            gestureEnabled: true, 
        }} 
      />

      <StatusBar />

      {/* 2. Custom Header with Back Button */}
      <View style={[themedStyles.header, { borderBottomColor: colors.textSecondary }]}>
        <TouchableOpacity 
          style={themedStyles.backButton} 
          onPress={() => router.back()}
          disabled={isSubmitting} // Disable navigation during form submission
        >
          <Icon name="back" />
        </TouchableOpacity>
        <ThemedText style={[themedStyles.headerTitle]}>
          {title}
        </ThemedText>
      </View>

      {/* 3. Scrollable Content Area */}
      <ScrollView 
        style={[themedStyles.scrollView, scrollViewStyle]}
        contentContainerStyle={themedStyles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLESHEET DEFINITION ---
const styles = (colors: ColorPalette) => StyleSheet.create({
    container: { flex: 1 },
    scrollView: { flex: 1 },
    contentContainer: { 
        paddingHorizontal: 16, 
        paddingVertical: 30, 
        // paddingBottom: 40 
    },
    
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    backButton: { position: 'absolute', left: 16, padding: 5 }, 
});

export default SupportLayout;