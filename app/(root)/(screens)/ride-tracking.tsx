import Map from '@/components/Map';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import React, { useState, useCallback } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  useColorScheme,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

// --- Type Definitions ---

// Define the shape of a selected ride object
interface RideDetails {
  id: string;
  type: string;
  price: number;
  estimatedTime: string;
}

// Define the shape of driver details
interface DriverDetails {
  name: string;
  carModel: string;
  licensePlate: string;
  distance: number; // distance in minutes
  rating: number;
}

// Define the shape of location details
interface LocationDetails {
  pickup: string;
  destination: string;
}

// Define the component's props interface
interface RideTrackingScreenProps {
  rideDetails: RideDetails | null; // Nullable if data loading isn't complete
  onGoBack: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

const STAGE = {
  ORDER_CONFIRMATION: 'ORDER_CONFIRMATION',
  DRIVER_EN_ROUTE: 'DRIVER_EN_ROUTE',
} as const; // Use 'as const' to treat values as literal strings

// Define a type for the stage state
type StageType = typeof STAGE[keyof typeof STAGE];


const mockDriverDetails: DriverDetails = {
  name: "Michael Baraza",
  carModel: "Toyota Vitz",
  licensePlate: "KAT 040M",
  distance: 3, // distance in minutes
  rating: 4.8,
};

const mockLocations: LocationDetails = {
  pickup: "Current Location: 123 Main St",
  destination: "Destination: 456 Elm Ave",
};

const RideTrackingScreen: React.FC<RideTrackingScreenProps> = ({ rideDetails, onGoBack }) => {
  // Use StageType for the state
  const [currentStage, setCurrentStage] = useState<StageType>(STAGE.ORDER_CONFIRMATION);
  const [confirmingOrder, setConfirmingOrder] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';

  const handleOrderConfirm = useCallback(() => {
    setConfirmingOrder(true);
    // Simulate booking API call success
    setTimeout(()=>{
      setConfirmingOrder(false);
      setCurrentStage(STAGE.DRIVER_EN_ROUTE);
    },10000)
  }, []);

  const handleCancelRide = (() => {
    Alert.alert(
      "Cancel Ride?",
      "Are you sure you want to cancel the trip?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: ()=>router.back(), style: "destructive" },
      ]
    );
  });
  
  // Type-safe empty functions for actions
  const handleChat = useCallback(() => Alert.alert("Chat", "Opening driver chat..."), []);
  const handleCall = useCallback(() => Alert.alert("Call", "Calling driver..."), []);

  // Ensure rideDetails is present before trying to render price
  const priceDisplay = rideDetails?.price.toFixed(2) ?? '0.00';
  const rideTypeDisplay = rideDetails?.type.toUpperCase() ?? 'RIDE';

  const renderOrderConfirmation = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailsSection}>
      <ThemedView style={[styles.confirmationBox]}>
        {/* show status when waiting for driver to accept request */}
        {confirmingOrder ? 
        <View style={{marginBottom:16}}>
        <ThemedText style={{textAlign:'center', fontWeight:600, fontSize:18, marginBottom:8}}>Connecting to driver</ThemedText>
        <ActivityIndicator/>
        </View> 
        : null}
        <ThemedText style={styles.locationTitle}>Pickup</ThemedText>
        <ThemedText style={styles.locationText}>{mockLocations.pickup.split(': ')[1]}</ThemedText>
        
        <View style={styles.separator} />
        
        <ThemedText style={styles.locationTitle}>Destination</ThemedText>
        <ThemedText style={styles.locationText}>{mockLocations.destination.split(': ')[1]}</ThemedText>

        <View style={[styles.priceSummary, {borderTopColor:Colors[colorTheme].textSecondary}]}>
          <ThemedText style={styles.priceLabel}>Price:</ThemedText>
          <ThemedText style={styles.finalPrice}>${priceDisplay}</ThemedText>
        </View>
      </ThemedView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
                  onPress={handleOrderConfirm}
                  activeOpacity={0.8}
                  style={{backgroundColor:Colors[colorTheme].primary,padding:20, borderRadius:12}}
                  >
                    <Text style={{color:'white', textAlign:'center',fontSize:16, fontWeight:600}}>{`CONFIRM ORDER - ${rideTypeDisplay}`}</Text>
                  </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.back()} style={styles.cancelLink}>
           <Text style={styles.cancelText}>Change Ride</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderDriverEnRoute = () => (
    <View style={styles.detailsSection}>
      <ThemedView style={styles.driverInfoCard}>
        <ThemedText style={styles.driverDistance}>
          {mockDriverDetails.distance} min away
        </ThemedText>
        
        <View style={[styles.driverDetailsRow, {borderBottomColor:Colors[colorTheme].textSecondary}]}>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.driverName}>
              {mockDriverDetails.name}
            </ThemedText>
            <ThemedText style={styles.carDetails}>
              {mockDriverDetails.carModel} - {mockDriverDetails.licensePlate}
            </ThemedText>
          </View>
          <ThemedText style={styles.finalPrice}>${priceDisplay}</ThemedText>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleChat}>
        <MaterialIcons name="chat" size={24} color={Colors[colorTheme].textSecondary} />
      <ThemedText style={styles.actionLabel}>Chat</ThemedText>
    </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
        <MaterialIcons name="call" size={24} color={Colors[colorTheme].textSecondary} />
      <ThemedText style={styles.actionLabel}>Call</ThemedText>
    </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleCancelRide}>
        <MaterialIcons name="cancel" size={24} color={Colors[colorTheme].textSecondary} />
      <ThemedText style={styles.actionLabel}>Cancel</ThemedText>
    </TouchableOpacity>
        </View>
      </ThemedView>
    </View>
  );

  return (
    <View style={styles.flowContainer}>
      
      {/* Map Direction (Top 1/2) */}
      <View style={{ height: screenHeight / 2 }}>
        <Map/>
      </View>

      {/* Details Component (Bottom 1/2) */}
      <View style={{ flex: 1 }}>
        {currentStage === STAGE.ORDER_CONFIRMATION
          ? renderOrderConfirmation()
          : renderDriverEnRoute()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flowContainer: {
    flex: 1,
  },
  detailsSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom:40,
    backgroundColor:'black'
  },
  buttonContainer: {
    paddingVertical: 15,
  },
  // --- Order Confirmation Styles ---
  confirmationBox: {
    paddingVertical: 20,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
  locationTitle: { fontSize: 14, fontWeight: '500'},
  locationText: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  separator: { height: 1, marginVertical: 4 },
  priceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  priceLabel: { fontSize: 16, fontWeight: '500' },
  finalPrice: { fontSize: 22, fontWeight: 'bold' },
  cancelLink: { alignSelf: 'center', marginTop: 10 },
  cancelText: { color: '#FF3B30', fontSize: 16, fontWeight: '500' },
  // --- Driver En Route Styles ---
  driverInfoCard: {
    borderRadius: 15,
    marginTop: 10,
    padding: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, },
      android: { elevation: 5, },
    }),
  },
  driverDistance: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  driverDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  driverIcon: { fontSize: 36, marginRight: 15 },
  driverName: { fontSize: 18, fontWeight: '600' },
  carDetails: { fontSize: 14, marginTop: 4 },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around' },
  actionButton: { alignItems: 'center' },
  actionIconCircle: {
    width: 50, height: 50, borderRadius: 25,
    alignItems: 'center', justifyContent: 'center', marginBottom: 5,
  },
  actionIcon: { fontSize: 24 },
  actionLabel: { fontSize: 14,marginTop:4 },
});

export default RideTrackingScreen;