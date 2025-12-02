import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
  Text,
} from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';

// Get screen height to set the container height to 50%
const { height: screenHeight } = Dimensions.get('window');
// Calculate the height for the component (50% of the screen height)
const containerHeight = screenHeight * 0.5;

const mockRides = [
  { id: '1', type: 'Economy', price: 150.50, estimatedTime: '5 min' },
  { id: '2', type: 'Comfort', price: 250.00, estimatedTime: '6 min' },
  { id: '3', type: 'Premium', price: 400.75, estimatedTime: '7 min' },
  { id: '4', type: 'XL Van', price: 550.00, estimatedTime: '8 min' },
  { id: '5', type: 'Bike', price: 80.00, estimatedTime: '4 min' },
  { id: '6', type: 'Pet Friendly', price: 300.00, estimatedTime: '10 min' },
  { id: '7', type: 'Scooter', price: 70.50, estimatedTime: '3 min' },
  { id: '8', type: 'Luxury SUV', price: 750.00, estimatedTime: '10 min' },
];

const RideSelection = () => {
  const [selectedRideId, setSelectedRideId] = useState<string|null>(null);
  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';

  const handleSelectRide = (id:string) => {
    setSelectedRideId(id);
    // make use of the setSelectedDriver from driver store
  };

  const handleConfirmRide = () => {
    if (selectedRideId) {
      const selectedRide = mockRides.find(ride => ride.id === selectedRideId);
      router.push('/(root)/(screens)/ride-tracking')
    }
  };

  const isConfirmButtonEnabled = selectedRideId !== null;

  // Find the selected ride object to display its name on the button
  const selectedRide = mockRides.find(r => r.id === selectedRideId);
  const buttonTitle = isConfirmButtonEnabled
    ? `Confirm ${selectedRide?.type} - Ksh ${selectedRide?.price}`
    : 'Select a Ride';

  return (
      <ThemedView style={styles.panel}>
        
        {/* Header */}
        <View style={[styles.headerContainer, {borderBottomColor:Colors[colorTheme].textSecondary}]}>
          <ThemedText style={styles.headerTitle}>Available Rides ({mockRides.length})</ThemedText>
        </View>

        {/* Scrollable Ride List */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {mockRides.map((ride) => {
            const isSelected = ride.id === selectedRideId;

            return (
              <TouchableOpacity
                key={ride.id}
                onPress={() => handleSelectRide(ride.id)}
                activeOpacity={0.8}
              >
                {/* Ride Details */}
                <ThemedView style={[styles.rideCard, isSelected ? {borderColor:Colors[colorTheme].primary} : {borderColor:colorTheme === 'dark' ? 'white':'black'}]}>
                <View style={styles.rideDetails}>
                  <ThemedText style={styles.rideType}>{ride.type}</ThemedText>
                  <ThemedText style={styles.rideTime}>{ride.estimatedTime} arrival</ThemedText>
                </View>
                
                {/* Price */}
                <ThemedText style={styles.ridePrice}>Ksh {ride.price.toFixed(2)}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Confirmation Button Area */}
          <TouchableOpacity
          onPress={handleConfirmRide}
          activeOpacity={1}
          disabled={!isConfirmButtonEnabled}
          style={[styles.confirmButton, {backgroundColor:Colors[colorTheme].primary}]}
          >
            <Text style={{color:'white', textAlign:'center',fontSize:16, fontWeight:600}}>{buttonTitle}</Text>
          </TouchableOpacity>
      </ThemedView>

  );
};

const styles = StyleSheet.create({
  panel: {
    height: containerHeight, 
    position:'relative',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  headerContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 70,
  },
  rideCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth:2
  },
  rideDetails: {
    flexDirection: 'column',
  },
  rideType: {
    fontSize: 16,
    fontWeight: '700',
  },
  rideTime: {
    fontSize: 12,
    marginTop: 2,
  },
  ridePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton:{
    position:'absolute',
    bottom:0,
    padding:20,
    left:0,
    right:0
  }
});

export default RideSelection;
