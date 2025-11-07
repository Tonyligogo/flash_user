import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { router } from 'expo-router'
import { useTheme } from '@/constants/ThemeContext'
import { Ride } from '../(tabs)/rides'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RideDetailsProps = {
    ride: Ride;
    onGoBack: () => void;
  };

const RideDetails = ({ ride, onGoBack }: RideDetailsProps) => {
     const { colors } = useTheme();
     const colorScheme = useColorScheme();
     const iconColor = colorScheme === 'dark' ? 'white' : 'black';
    const handleSupportButtonPress = (ride: Ride) => {
        const rideJson = JSON.stringify(ride);
        router.push({
          pathname: "/(root)/trip-help/main-details",
          params: { 
              rideDetails: rideJson,
          }, 
        });
      };
  return (
    <ScrollView 
            style={themedStyles.detailScrollView} 
            contentContainerStyle={themedStyles.detailContent}
        >
            <TouchableOpacity 
                style={themedStyles.backButton} 
                onPress={onGoBack}
            >
                <MaterialIcons name="arrow-back-ios" size={24} color={iconColor} />
                <ThemedText style={[themedStyles.backButtonText]}>
                    Rides
                </ThemedText>
            </TouchableOpacity>
    
             <ThemedText style={[themedStyles.detailTitle]}>
                                {ride.date} Ride to {ride.destination.split(',')[0]}
                            </ThemedText>
            
            {/* Cost Section */}
            <ThemedView style={[themedStyles.detailSection]}>
                                        <ThemedText style={[themedStyles.detailPrimaryText]}>
                                            KSh {ride.cost.toFixed(2)}
                                        </ThemedText>
                                        <ThemedText style={[themedStyles.detailSecondaryText]}>
                                            Final Trip Fare
                                        </ThemedText>
                            </ThemedView>
    
            {/* Driver and Car Section */}
            <ThemedView style={[themedStyles.detailSection]}>
                                        <ThemedText style={[themedStyles.detailPrimaryText]}>
                                            {ride.driver}
                                        </ThemedText>
                                        <ThemedText style={[themedStyles.detailSecondaryText]}>
                                            {ride.car}
                                        </ThemedText>
                            </ThemedView>
            
            {/* Timeline (Pickup and Destination) Section */}
            <ThemedView style={[themedStyles.detailSection]}>
                                        <ThemedText style={[themedStyles.detailPrimaryText]}>
                                            {ride.pickup} ({ride.time})
                                        </ThemedText>
                                        <ThemedText style={[themedStyles.detailSecondaryText]}>
                                            {ride.destination} ({ride.duration} mins)
                                        </ThemedText>
                            </ThemedView>
            
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
  )
}

export default RideDetails

const themedStyles = StyleSheet.create({
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
})