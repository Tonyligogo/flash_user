import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/themed-text';
import SupportLayout from '@/components/support-layout';
import { ThemedView } from '@/components/themed-view';

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
            { borderBottomColor: index < total - 1 ? colors.textSecondary : 'transparent' },
        ]}
        onPress={() => handleSupportItemPress(item.action)}
    >
        <View style={themedStyles.menuItemLeft}>
            <ThemedText>{item.label}</ThemedText>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderSupportSection = (section: typeof supportSections[0], sectionIndex: number) => (
    <View key={sectionIndex} style={themedStyles.sectionContainer}>
        <ThemedText style={[themedStyles.sectionTitle]}>
            {section.title.toUpperCase()}
        </ThemedText>
        <ThemedView style={[themedStyles.card]}>
            {section.items.map((item, index) =>
                renderSupportItem(item, index, section.items.length)
            )}
        </ThemedView>
    </View>
  );

  return (
   
    <SupportLayout title='Trip Help'>
      <>
       {/* Trip Summary Card */}
       <ThemedView style={[themedStyles.tripSummaryCard]}>
            <ThemedText style={[themedStyles.summaryTitle]}>
                {ride.date} Ride
            </ThemedText>
            <ThemedText style={[themedStyles.summaryDetails]}>
                {ride.pickup} to {ride.destination}
            </ThemedText>
            <ThemedText style={[themedStyles.summaryCost]}>
                KSh {ride.cost.toFixed(2)}
            </ThemedText>
        </ThemedView>

        {/* Support Options */}
        <ThemedText style={[themedStyles.helpHeading]}>
            What do you need help with?
        </ThemedText>
        
        {supportSections.map(renderSupportSection)}
      </>
    </SupportLayout>
  );
};

// --- STYLESHEET DEFINITION ---
const styles = (colors: ColorPalette) => StyleSheet.create({

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
});

export default TripHelpScreen;
