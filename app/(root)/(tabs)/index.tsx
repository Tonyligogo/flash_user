import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import GoogleTextInput from '@/components/GoogleTextInput'
import { useLocationStore } from '@/store'
import * as Location from 'expo-location';
import Map from '@/components/Map'
import { ThemedText } from '@/components/themed-text'
import { ColorPalette } from '@/types/type'
import { useTheme } from '@/constants/ThemeContext'

const createStyles = (colors: ColorPalette) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  screenContent: {
    paddingHorizontal: 8,
    paddingTop: StatusBar.currentHeight,
  },
  
  // Header Styles
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userLogo: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  greeting: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
  },
  helpButtonContainer: {
    backgroundColor: colors.card,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: 24,
    color: colors.textPrimary,
  },

  // Cards Styles
  cardsContainer: {
    marginVertical: 8,
    gap: 10,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 10,
  },
  newTripCard: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: colors.tripCardSmall,
    padding: 16,
    borderRadius: 16,
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardSmallTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.textPrimary,
  },
  homeCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.tripCardBig,
    padding: 16,
    paddingBottom: 0, 
    paddingRight: 0,
    borderRadius: 16,
  },
  cardTextContent: {
    // Basic view to wrap text content within the card
  },
  cardLargeTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.buttonText,
  },
  cardSubtitle: {
    fontSize: 16,
    maxWidth: 145,
  },
  cardLargeEmoji: {
    fontSize: 84,
  },
  
  // Map Section Styles
  mapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
});


const Index = () => {
  const { colors } = useTheme();
  const themedStyles = createStyles(colors);

  const isLoading = false;
  const {setUserLocation, userAddress} = useLocationStore();
  const [hasPermissions, setHasPermissions] = useState(false);
  
  const handleDestinationSearch = () =>{
    console.log('Destination searched')
  }

  useEffect(()=>{
    const requestLocation = async()=>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setHasPermissions(false);
        return;
      }else{
        setHasPermissions(true)
      }

      let location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude:location.coords?.latitude,
        longitude:location.coords?.longitude
      })
      setUserLocation({
        latitude:location.coords?.latitude,
        longitude:location.coords?.longitude,
        // Using safer fallback construction
        address:`${address[0]?.name || ''}, ${address[0]?.region || ''}`.trim()
      });
    }
    requestLocation()
  },[])
  
  return (
    <SafeAreaView style={themedStyles.safeArea}>
      <ScrollView style={themedStyles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={themedStyles.screenContent}>
          
          {/* Header/Greeting Section */}
          <View style={themedStyles.headerRow}>
            <View style={themedStyles.userInfo}>
              <Image source={images.userLogo} style={themedStyles.userLogo} />
              <View>
                <ThemedText style={[themedStyles.greeting, { marginBottom: 8 }]}>Tony Ligogo 👋</ThemedText>
                <ThemedText style={[themedStyles.subtitle, { color: colors.textSecondary }]}>Go anywhere, right now</ThemedText>
              </View>
            </View>
            {/* Help Button */}
            <View style={themedStyles.helpButtonContainer}>
              <Text style={themedStyles.helpButtonText}>?</Text> 
            </View>
          </View>

          {/* Search Input */}
          <GoogleTextInput
            icon={icons.search}
            textInputBackgroundColor={colors.card}
            handlePress={handleDestinationSearch}
          />

          {/* Destination Cards Section */}
          <View style={themedStyles.cardsContainer}>
            {/* Top Row */}
            <View style={themedStyles.cardRow}>
              {/* New Trip Card - Background themed */}
              <View style={themedStyles.newTripCard}>
                <Text style={themedStyles.cardEmoji}>🚗</Text>
                <Text style={themedStyles.cardSmallTitle}>New Trip</Text>
              </View>
              {/* Home Card - Background themed (Accent) */}
              <View style={themedStyles.homeCard}>
                <View style={themedStyles.cardTextContent}>
                  {/* Title color is handled by themedStyles.cardLargeTitle (set to white) */}
                  <Text style={themedStyles.cardLargeTitle}>Home</Text>
                  {/* Subtitle color uses a tertiary themed color for low contrast on accent */}
                  <Text style={[themedStyles.cardSubtitle, { color: colors.background }]}>Zimmerman, Roysambu</Text>
                </View>
                <Text style={themedStyles.cardLargeEmoji}>🏠</Text>
              </View>
            </View>

            {/* Bottom Row */}
            <View style={themedStyles.cardRow}>
              {/* School Card - Background themed (Accent) */}
              <View style={[themedStyles.homeCard, { paddingLeft: 0, paddingRight: 16 }]}>
                <Text style={themedStyles.cardLargeEmoji}>🏫</Text>
                <View style={themedStyles.cardTextContent}>
                  {/* Title color is handled by themedStyles.cardLargeTitle (set to white) */}
                  <Text style={themedStyles.cardLargeTitle}>School</Text>
                  {/* Subtitle color uses a tertiary themed color */}
                  <Text style={[themedStyles.cardSubtitle, { color: colors.background }]}>Kenyatta University</Text>
                </View>
              </View>
              {/* Office Card - Background themed */}
              <View style={themedStyles.newTripCard}>
                <Text style={themedStyles.cardEmoji}>💼</Text>
                <Text style={themedStyles.cardSmallTitle}>Office</Text>
              </View>
            </View>
          </View>

          {/* Location Map Section */}
          <View>
            {/* Map Title uses ThemedText */}
            <ThemedText style={[themedStyles.mapTitle, { marginTop: 8, marginBottom: 4 }]}>Your Current Location</ThemedText>
            {/* Text color changed */}
            <ThemedText style={{ color: colors.textSecondary }}>
              {!hasPermissions && 'Please allow Flash to access your location'}
            </ThemedText>
            <View style={themedStyles.mapContainer}>
              {/* <Map /> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index