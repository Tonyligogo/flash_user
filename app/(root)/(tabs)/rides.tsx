import { ThemedText } from '@/components/themed-text';
import { ThemedTouchableOpacity } from '@/components/themed-view';
import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RideDetails from '../(screens)/ride-details';


// --- TYPE DEFINITIONS FOR RIDES ---
export interface Ride {
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
  {
    id: 'RIDE-1004',
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
    id: 'RIDE-1005',
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

// --- MAIN COMPONENT ---
const Rides: React.FC = () => {
  const { colors } = useTheme();
  const themedStyles = styles(colors);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  // --- RENDERERS ---
  const renderRideItem = (ride: Ride) => (
      <ThemedTouchableOpacity
        key={ride.id}
        activeOpacity={0.8}
        style={[themedStyles.rideCard]}
        onPress={() => setSelectedRide(ride)}
      >
        <View style={themedStyles.rideCardHeader}>
          <View style={themedStyles.rideCardTitleContainer}>
            <ThemedText style={[themedStyles.rideDate]}>
              {ride.date}
            </ThemedText>
            <ThemedText style={[themedStyles.rideCost]}>
              KSh {ride.cost.toFixed(2)}
            </ThemedText>
          </View>
        </View>
        
        <View style={themedStyles.locationDetail}>
          <View style={[themedStyles.locationText, {marginBottom:10}]}>
            <ThemedText style={[themedStyles.locationTextSecondary,{color:colors.textSecondary}]}>
              From:
            </ThemedText>
            <ThemedText style={[themedStyles.locationTextSecondary]}>
              {ride.pickup}
            </ThemedText>
          </View>
          <View style={themedStyles.locationText}>
            <ThemedText style={[themedStyles.locationTextSecondary,{color:colors.textSecondary}]}>
              To:
            </ThemedText>
            <ThemedText style={[themedStyles.locationTextPrimary]}>
              {ride.destination}
            </ThemedText>
          </View>
        </View>
      </ThemedTouchableOpacity>
  );

  // --- MAIN RENDER LOGIC ---
  return (
    <SafeAreaView style={[themedStyles.safeArea]}>
      
      {selectedRide ? (
        // RideDetail(selectedRide)
        <RideDetails ride={selectedRide} onGoBack={() => setSelectedRide(null)} />
      ) : (
        <ScrollView 
          style={themedStyles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText style={[themedStyles.pageTitle]}>
            Your Trips
          </ThemedText>

          <View style={themedStyles.ridesListContainer}>
            {mockRides.map(renderRideItem)}
          </View>
          
          <ThemedText style={[themedStyles.footerText, { color: colors.textSecondary }]}>
             End of trip history. Trips are available for 6 months.
          </ThemedText>
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
    paddingVertical:30,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight:50
  },
  ridesListContainer: {
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
    marginTop: 10,
  },
  locationText: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
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
    marginVertical: 30,
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
    marginBottom: 15
  },
  detailTimelineRow: {
    flexDirection: 'row',
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