import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// --- IMPORTS ---
import { MenuItem, MenuSection, IconProps, UserProfile, ColorPalette } from '@/types/type'; 
import { useTheme } from '@/constants/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// --- MOCK DATA ---
const user: UserProfile = {
  name: 'Tony Ligogo',
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

// --- MAIN COMPONENT ---
const Profile: React.FC = () => {
  const { colors } = useTheme();

  // Initialize dynamic styles with current theme colors
  const themedStyles = styles(colors);

  // --- HANDLERS ---
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

  // --- RENDERING HELPERS ---
  const renderMenuItem = (item: MenuItem, index: number, total: number) => (
    <TouchableOpacity
      key={index}
      style={[
        themedStyles.menuItem,
        { borderBottomColor: index < total - 1 ? colors.border : 'transparent' },
      ]}
      onPress={() => handlePress(item.action)}
    >
      <View style={themedStyles.menuItemLeft}>
        <Icon name={item.icon} color={colors.textPrimary} />
        <Text style={[themedStyles.menuItemText, { color: colors.textPrimary }]}>{item.label}</Text>
      </View>
      <Icon name="chevron-right" size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderMenuSection = (section: MenuSection, sectionIndex: number) => (
    <View key={sectionIndex} style={themedStyles.sectionContainer}>
      <Text style={[themedStyles.sectionTitle, { color: colors.textSecondary }]}>
        {section.title.toUpperCase()}
      </Text>
      <View style={[themedStyles.card, { backgroundColor: colors.card }]}>
        {section.items.map((item, index) =>
          renderMenuItem(item, index, section.items.length)
        )}
      </View>
    </View>
  );

  return (
    // Set background color from theme
    <SafeAreaView style={[themedStyles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={themedStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={themedStyles.contentContainer}
      >
        <StatusBar barStyle={themedStyles.pageTitle.color === '#E0E0E0' ? 'light-content' : 'dark-content'} />

        <Text style={[themedStyles.pageTitle, { color: colors.textPrimary }]}>Profile</Text>

        {/* 1. User Header Card */}
        <View style={[themedStyles.userCard, { backgroundColor: colors.card }]}>
          <Image 
            source={{ uri: user.profilePic }} 
            style={themedStyles.profileImage}
          />
          <View style={themedStyles.userInfo}>
            <Text style={[themedStyles.userName, { color: colors.textPrimary }]}>{user.name}</Text>
          </View>
        </View>

        {/* 2. Menu Sections */}
        {menuSections.map(renderMenuSection)}

        {/* 3. Footer / Logout */}
        <View style={themedStyles.logoutContainer}>
            <TouchableOpacity 
                style={[themedStyles.logoutButton, { borderColor: colors.border }]} 
                onPress={() => handlePress('logout')}
            >
                <Text style={[themedStyles.logoutText, { color: colors.textPrimary }]}>Sign Out</Text>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: (StatusBar.currentHeight || 0),
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#E0E0E0',
  },
  
  // --- User Card Styles ---
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 18,
    backgroundColor: colors.border,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
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