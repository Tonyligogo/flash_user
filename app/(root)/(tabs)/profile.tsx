import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import { MenuItem, MenuSection, IconProps, UserProfile, ColorPalette } from '@/types/type'; 
import { useTheme } from '@/constants/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const user: UserProfile = {
  name: 'Flash User',
  profilePic: 'https://i.pravatar.cc/100?img=68', 
};

// Mock data for menu items
const menuSections: MenuSection[] = [
  {
    title: 'Account',
    items: [
      { icon: 'user-circle', label: 'Edit Account Info', action: 'edit_account' },
      { icon: 'home', label: 'Saved Places (Home/Work)', action: 'saved_places' },
    ],
  },
  {
    title: 'Payments',
    items: [
      { icon: 'credit-card', label: 'Payment Methods', action: 'payment_methods' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'cog', label: 'App Settings', action: 'app_settings' },
      { icon: 'question-circle', label: 'Help Center', action: 'help_center' },
      { icon: 'file-alt', label: 'Legal & Privacy', action: 'legal' },
    ],
  },
];

const Icon: React.FC<IconProps> = ({ name, size = 24, color }) => {
  const emojiMap: { [key: string]: string } = {
    'user-circle': '👤',
    'credit-card': '💳',
    'map-marker-alt': '📍',
    'question-circle': '❓',
    'bell': '🔔',
    'cog': '⚙️',
    'file-alt': '📜',
    'chevron-right': '❯',
    'home': '🏠',
    'briefcase': '💼',
    'star': '⭐',
  };
  return <Text style={{ fontSize: size * 0.75, color: color }}>{emojiMap[name] || '?'}</Text>;
};

const Profile: React.FC = () => {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';
  const themedStyles = styles(colors);

  const handlePress = (action: string): void => {
     switch (action) {
          case 'edit_account':
            router.push('/profile-screens/edit-account'); 
            break;

          case 'saved_places':
            router.push('/profile-screens/saved-places'); 
            break;
            
          case 'payment_methods':
            router.push('/profile-screens/payment-methods'); 
            break;
            
          case 'app_settings':
            router.push('/profile-screens/app-settings'); 
            break;
            
          case 'help_center':
            router.push('/profile-screens/help-center'); 
            break;
            
          case 'legal':
            router.push('/profile-screens/legal-privacy'); 
            break;
            
          default:
            console.log(`Action not implemented: ${action}`);
            break;
        }
  };

  const renderMenuItem = (item: MenuItem, index: number, total: number) => (
    <TouchableOpacity
      key={index}
      style={[
        themedStyles.menuItem,
        { borderBottomColor: index < total - 1 ? Colors[colorTheme].icon : 'transparent' },
      ]}
      onPress={() => handlePress(item.action)}
    >
      <View style={themedStyles.menuItemLeft}>
        <Icon name={item.icon} color={colors.textPrimary} />
        <ThemedText style={[themedStyles.menuItemText]}>{item.label}</ThemedText>
      </View>
      <Icon name="chevron-right" size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderMenuSection = (section: MenuSection, sectionIndex: number) => (
    <View key={sectionIndex} style={themedStyles.sectionContainer}>
      <ThemedText style={[themedStyles.sectionTitle]}>
        {section.title.toUpperCase()}
      </ThemedText>
      <ThemedView style={[themedStyles.card]}>
        {section.items.map((item, index) =>
          renderMenuItem(item, index, section.items.length)
        )}
      </ThemedView>
    </View>
  );

  return (
    // Set background color from theme
    <SafeAreaView style={[themedStyles.safeArea]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={themedStyles.contentContainer}
      >
        <ThemedText style={[themedStyles.pageTitle]}>Profile</ThemedText>

        {/* 1. User Header Card */}
        <ThemedView style={[themedStyles.userCard]}>
          <Image 
            source={{ uri: user.profilePic }} 
            style={themedStyles.profileImage}
          />
            <ThemedText style={[themedStyles.userName]}>{user.name}</ThemedText>
        </ThemedView>

        {/* 2. Menu Sections */}
        {menuSections.map(renderMenuSection)}

        {/* 3. Footer / Logout */}
        <View style={themedStyles.logoutContainer}>
            <TouchableOpacity 
                style={[themedStyles.logoutButton, { borderColor: colors.border }]} 
                onPress={() => handlePress('logout')}
                activeOpacity={0.8}
            >
                <ThemedText style={[themedStyles.logoutText]}>Sign Out</ThemedText>
            </TouchableOpacity>
            <Text style={[themedStyles.appVersion, { color: colors.textSecondary }]}>
              App by Corban Technologies
            </Text>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (colors: ColorPalette) => StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical:30,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight:40
  },
  
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    marginBottom: 25,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 18,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingText: {
    fontSize: 15,
    marginLeft: 6,
  },
  membershipText: {
    fontSize: 15,
    fontWeight: '600',
  },
  editButton: {
    padding: 10,
    borderRadius: 10,
  },

  // --- Menu Styles ---
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
    letterSpacing: 0.8,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 17,
    marginLeft: 15,
  },
  
  // --- Footer Styles ---
  logoutContainer: {
      marginTop: 30,
      alignItems: 'center',
  },
  logoutButton: {
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 12,
      borderWidth: 1,
      marginBottom: 12,
  },
  logoutText: {
      fontSize: 17,
      fontWeight: '600',
  },
  appVersion: {
      fontSize: 13,
  },
});

export default Profile;