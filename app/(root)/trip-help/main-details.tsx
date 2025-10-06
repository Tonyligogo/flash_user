import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- ICON PLACEHOLDER ---
const Icon = ({ name, color, iconSize = 20 }: { name: string; color: string; iconSize?: number }) => {
  const emojiMap: { [key: string]: string } = {
    'close': '✕',
    'receipt': '🧾',
    'money': '💵',
    'star': '⭐',
    'lost': '📦',
    'safety': '⛑️',
    'feedback': '💬',
    'chevron-right': '❯',
  };
  return <Text style={{ fontSize: iconSize, color: color, width: 20, textAlign: 'center' }}>{emojiMap[name] || '?'}</Text>;
};

// --- MOCK SUPPORT MENU DATA ---
const supportSections = [
    {
        title: 'Payments and Receipts',
        items: [
            { icon: 'receipt', label: 'View/Download Trip Receipt', action: 'get_receipt' },
            { icon: 'money', label: 'I had an issue with my fare', action: 'fare_issue' },
        ],
    },
    {
        title: 'Trip Details and Feedback',
        items: [
            { icon: 'star', label: 'Change or Submit a Rating', action: 'change_rating' },
            { icon: 'lost', label: 'I left an item in the vehicle', action: 'lost_item' },
            { icon: 'feedback', label: 'Give feedback about my driver', action: 'driver_feedback' },
        ],
    },
    {
        title: 'Safety and Incident Reporting',
        items: [
            { icon: 'safety', label: 'Report a safety concern', action: 'report_safety' },
        ],
    },
];


// --- MAIN COMPONENT ---
const TripHelpScreen = () => {
  const { colors } = useTheme();
  const themedStyles = styles(colors);
  const { rideDetails } = useLocalSearchParams();
  const ride = rideDetails ? JSON.parse(rideDetails as string) : null;

  const handleSupportItemPress = (action: string) => {    
    switch (action) {
      case 'get_receipt':
        router.push(`/trip-help/receipt?rideId=${ride.id}`); 
        break;
      
      case 'change_rating':
        router.push(`/trip-help/rating?rideId=${ride.id}`);
        break;
        
      case 'lost_item':
        router.push(`/trip-help/lost-item?rideId=${ride.id}`);
        break;

      case 'driver_feedback':
        router.push(`/trip-help/driver-feedback?rideId=${ride.id}`);
        break;

      case 'report_safety':
        router.push(`/trip-help/report-safety?rideId=${ride.id}`);
        break;

      case 'fare_issue':
        router.push(`/trip-help/fare-issue?rideId=${ride.id}`);
        break;

      default:
        console.log(`Action not implemented: ${action}`);
        break;
    }
  };
  
  const renderSupportItem = (item: { icon: string; label: string; action: string; }, index: number, total: number) => (
    <TouchableOpacity
        key={item.action}
        style={[
            themedStyles.menuItem,
            { borderBottomColor: index < total - 1 ? colors.border : 'transparent' },
        ]}
        onPress={() => handleSupportItemPress(item.action)}
    >
        <View style={themedStyles.menuItemLeft}>
            <Icon name={item.icon} color={colors.textPrimary} />
            <Text style={[themedStyles.menuItemText, { color: colors.textPrimary }]}>{item.label}</Text>
        </View>
        <Icon name="chevron-right" color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderSupportSection = (section: typeof supportSections[0], sectionIndex: number) => (
    <View key={sectionIndex} style={themedStyles.sectionContainer}>
        <Text style={[themedStyles.sectionTitle, { color: colors.textSecondary }]}>
            {section.title.toUpperCase()}
        </Text>
        <View style={[themedStyles.card, { backgroundColor: colors.card }]}>
            {section.items.map((item, index) =>
                renderSupportItem(item, index, section.items.length)
            )}
        </View>
    </View>
  );

  return (
    <SafeAreaView style={[themedStyles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.textPrimary === '#E0E0E0' ? 'light-content' : 'dark-content'} />
      <Stack.Screen 
        options={{ 
            headerShown: false,
        }} 
      />
      
      {/* Header */}
      <View style={[themedStyles.header, { borderBottomColor: colors.border }]}>
        <Text style={[themedStyles.headerTitle, { color: colors.textPrimary }]}>Trip Help</Text>
        <TouchableOpacity style={themedStyles.closeButton} onPress={()=>router.back()}>
          <Icon name="close" color={colors.textPrimary} iconSize={32} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={themedStyles.scrollView}
        contentContainerStyle={themedStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Trip Summary Card */}
        <View style={[themedStyles.tripSummaryCard, { backgroundColor: colors.card }]}>
            <Text style={[themedStyles.summaryTitle, { color: colors.textPrimary }]}>
                {ride.date} Ride
            </Text>
            <Text style={[themedStyles.summaryDetails, { color: colors.textSecondary }]}>
                {ride.pickup} to {ride.destination}
            </Text>
            <Text style={[themedStyles.summaryCost, { color: colors.textPrimary }]}>
                KSh {ride.cost.toFixed(2)}
            </Text>
        </View>

        {/* Support Options */}
        <Text style={[themedStyles.helpHeading, { color: colors.textPrimary }]}>
            What do you need help with?
        </Text>
        
        {supportSections.map(renderSupportSection)}
        
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLESHEET DEFINITION ---
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
    },

    // --- Header Styles ---
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        padding: 5,
    },

    // --- Summary Card Styles ---
    tripSummaryCard: {
        padding: 18,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    summaryDetails: {
        fontSize: 15,
        marginBottom: 8,
    },
    summaryCost: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    // --- Menu Styles ---
    helpHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 8,
        marginBottom: 8,
        letterSpacing: 0.8,
    },
    card: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 16,
        marginLeft: 15,
    },
});

export default TripHelpScreen;
