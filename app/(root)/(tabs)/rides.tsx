import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// --- TYPE DEFINITIONS FOR RIDES ---
interface Ride {
  id: string;
  date: string;
  time: string;
  driver: string;
  car: string;
  cost: number;
  pickup: string;
  destination: string;
  distance: number;
  duration: number;
}

// --- MOCK DATA ---
const mockRides: Ride[] = [
  {
    id: 'RIDE-1001',
    date: 'Oct 03, 2025',
    time: '8:45 AM',
    driver: 'Mercy A.',
    car: 'Toyota Axio (KAB 123T)',
    cost: 450.00,
    pickup: 'Zimmerman, Roysambu',
    destination: 'Kenyatta University Gate B',
    distance: 12.5,
    duration: 35,
  },
  {
    id: 'RIDE-1002',
    date: 'Sep 30, 2025',
    time: '7:10 PM',
    driver: 'Peter K.',
    car: 'Subaru Impreza (KCA 456X)',
    cost: 1280.00,
    pickup: 'CBD, Nairobi',
    destination: 'Jomo Kenyatta International Airport',
    distance: 18.2,
    duration: 55,
  },
  {
    id: 'RIDE-1003',
    date: 'Sep 29, 2025',
    time: '1:30 PM',
    driver: 'Ann M.',
    car: 'Suzuki Swift (KDE 789A)',
    cost: 320.50,
    pickup: 'Thika Road Mall',
    destination: 'Pana Heights Apartment',
    distance: 4.1,
    duration: 15,
  },
];

// --- ICON PLACEHOLDER ---
const Icon = ({ name, color }: { name: string; color: string }) => {
  const emojiMap: { [key: string]: string } = {
    'car': '🚗',
    'dot': '⚫',
    'square': '◼️',
    'back': '❮',
    'location': '📍',
    'clock': '🕒',
    'money': '💰'
  };
  return <Text style={{ fontSize: 20, color: color }}>{emojiMap[name] || '?'}</Text>;
};

// --- MAIN COMPONENT ---
const Rides: React.FC = () => {
  const { colors } = useTheme();
  const themedStyles = styles(colors);
  const router = useRouter();

  // State to manage the selected ride for detail view
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const handleSupportButtonPress = (ride: Ride) => {
    const rideJson = JSON.stringify(ride);
    router.push({
      pathname: "/(root)/trip-help/main-details",
      params: { 
          rideDetails: rideJson,
      }, 
    });
  };
  // --- RENDERERS ---

  const renderRideItem = (ride: Ride) => (
    <TouchableOpacity
      key={ride.id}
      style={[themedStyles.rideCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => setSelectedRide(ride)}
    >
      <View style={themedStyles.rideCardHeader}>
        <Icon name="car" color={colors.accent} />
        <View style={themedStyles.rideCardTitleContainer}>
          <Text style={[themedStyles.rideDate, { color: colors.textPrimary }]}>
            {ride.date}
          </Text>
          <Text style={[themedStyles.rideCost, { color: colors.textPrimary }]}>
            KSh {ride.cost.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={themedStyles.locationDetail}>
        <View style={themedStyles.locationPins}>
          <Icon name="dot" color={colors.accent} />
          <View style={themedStyles.verticalLine} />
          <Icon name="square" color={colors.textPrimary} />
        </View>
        <View style={themedStyles.locationText}>
          <Text style={[themedStyles.locationTextPrimary, { color: colors.textPrimary }]}>
            {ride.pickup}
          </Text>
          <Text style={[themedStyles.locationTextSecondary, { color: colors.textSecondary }]}>
            {ride.destination}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRideDetail = (ride: Ride) => (
    <ScrollView 
        style={themedStyles.detailScrollView} 
        contentContainerStyle={themedStyles.detailContent}
    >
        <TouchableOpacity 
            style={themedStyles.backButton} 
            onPress={() => setSelectedRide(null)}
        >
            <Icon name="back" color={colors.textPrimary} />
            <Text style={[themedStyles.backButtonText, { color: colors.textPrimary }]}>
                Rides
            </Text>
        </TouchableOpacity>

        <Text style={[themedStyles.detailTitle, { color: colors.textPrimary }]}>
            {ride.date} Ride to {ride.destination.split(',')[0]}
        </Text>
        
        {/* Cost Section */}
        <View style={[themedStyles.detailSection, { backgroundColor: colors.card }]}>
            <View style={themedStyles.detailRow}>
                <Icon name="money" color={colors.accent} />
                <View style={themedStyles.detailTextContainer}>
                    <Text style={[themedStyles.detailPrimaryText, { color: colors.textPrimary }]}>
                        KSh {ride.cost.toFixed(2)}
                    </Text>
                    <Text style={[themedStyles.detailSecondaryText, { color: colors.textSecondary }]}>
                        Final Trip Fare
                    </Text>
                </View>
            </View>
        </View>

        {/* Driver and Car Section */}
        <View style={[themedStyles.detailSection, { backgroundColor: colors.card }]}>
            <View style={themedStyles.detailRow}>
                <Icon name="car" color={colors.accent} />
                <View style={themedStyles.detailTextContainer}>
                    <Text style={[themedStyles.detailPrimaryText, { color: colors.textPrimary }]}>
                        {ride.driver}
                    </Text>
                    <Text style={[themedStyles.detailSecondaryText, { color: colors.textSecondary }]}>
                        {ride.car}
                    </Text>
                </View>
            </View>
        </View>
        
        {/* Timeline (Pickup and Destination) Section */}
        <View style={[themedStyles.detailSection, { backgroundColor: colors.card }]}>
            <View style={themedStyles.detailTimelineRow}>
                <Icon name="location" color={colors.accent} />
                <View style={themedStyles.detailTimelineText}>
                    <Text style={[themedStyles.detailPrimaryText, { color: colors.textPrimary }]}>
                        {ride.pickup} ({ride.time})
                    </Text>
                    <Text style={[themedStyles.detailSecondaryText, { color: colors.textSecondary }]}>
                        {ride.destination} ({ride.duration} mins)
                    </Text>
                </View>
            </View>
        </View>
        
        {/* Button for Support/Invoice */}
        <TouchableOpacity
        style={[themedStyles.supportButton, { backgroundColor: colors.primary }]}
        onPress={() => handleSupportButtonPress(ride)}
        >
            <Text style={themedStyles.supportButtonText}>
                Get Invoice or Trip Help
            </Text>
        </TouchableOpacity>
        
    </ScrollView>
  );

  // --- MAIN RENDER LOGIC ---
  return (
    <SafeAreaView style={[themedStyles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.textPrimary === '#E0E0E0' ? 'light-content' : 'dark-content'} />
      
      {selectedRide ? (
        renderRideDetail(selectedRide)
      ) : (
        <ScrollView 
          style={themedStyles.scrollView}
          contentContainerStyle={themedStyles.listContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[themedStyles.pageTitle, { color: colors.textPrimary }]}>
            Your Trips
          </Text>

          <View style={themedStyles.ridesListContainer}>
            {mockRides.map(renderRideItem)}
          </View>
          
          <Text style={[themedStyles.footerText, { color: colors.textSecondary }]}>
             End of trip history. Trips are available for 6 months.
          </Text>
        </ScrollView>
      )}
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
  pageTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 40,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },
  ridesListContainer: {
    paddingHorizontal: 16,
    gap: 15,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 30,
  },

  // --- Ride Card (List View) Styles ---
  rideCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rideCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rideCardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  rideDate: {
    fontSize: 16,
    fontWeight: '600',
  },
  rideCost: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Location Detail Section
  locationDetail: {
    flexDirection: 'row',
    marginTop: 10,
  },
  locationPins: {
    alignItems: 'center',
    marginRight: 10,
    width: 20,
  },
  verticalLine: {
    width: 2,
    height: 30,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  locationText: {
    flex: 1,
    justifyContent: 'space-between',
  },
  locationTextPrimary: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  locationTextSecondary: {
    fontSize: 15,
  },

  // --- Ride Detail View Styles ---
  detailScrollView: {
    flex: 1,
  },
  detailContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 18,
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  detailSection: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailTimelineRow: {
    flexDirection: 'row',
  },
  detailTextContainer: {
    marginLeft: 15,
  },
  detailTimelineText: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  detailPrimaryText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailSecondaryText: {
    fontSize: 15,
  },
  supportButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Rides;