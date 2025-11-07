import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import GoogleTextInput from '@/components/GoogleTextInput'
import { useLocationStore } from '@/store'
import * as Location from 'expo-location';
import { ColorPalette } from '@/types/type'
import { useTheme } from '@/constants/ThemeContext'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'

const RecentRides = [
  {
    id:'1',
    name:'Mythos Taverna',
    address:'Mwanzi Market Mwanzi Rd, Nairobi'
  },
  {
    id:'2',
    name:'Western Heights',
    address:'Karuna Rd, Nairobi'
  },
]


// --- ICON PLACEHOLDER ---
const Icon = ({ name}: { name: string}) => {
  const emojiMap: { [key: string]: string } = {
      'home': '🏠',
      'new': '+',
      'school': '🏫',
      'office': '💼',
      'mall':'🏬',
      'fun':'🍻'
  };
  return <Text style={[{ fontSize: 24 }, name === 'new' ? {color:'white', fontSize:30} : {} ]}>{emojiMap[name] || '?'}</Text>;
};

const Index = () => {
  const { colors } = useTheme();
  const themedStyles = createStyles(colors);

  const {setUserLocation} = useLocationStore();
  const [hasPermissions, setHasPermissions] = useState(false);
  
  const handleDestinationSearch = () =>{}

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
        address:`${address[0]?.name || ''}, ${address[0]?.region || ''}`.trim()
      });
    }
    requestLocation()
  },[])

  const renderCard = (title: string, iconName: string) => (
    <ThemedView style={[themedStyles.card]}>
        <Icon name={iconName} />
        <ThemedText style={[themedStyles.cardTitle]}>
            {title}
        </ThemedText>
    </ThemedView>
  );
  
  return (
    <SafeAreaView style={themedStyles.safeArea}>
      <ScrollView contentContainerStyle={themedStyles.contentContainer} showsVerticalScrollIndicator={false}>
          {/* Header/Greeting Section */}
          <View style={themedStyles.headerRow}>
            <View style={themedStyles.userInfo}>
              <Image source={images.userLogo} style={themedStyles.userLogo} />
              <View>
                <ThemedText style={[themedStyles.greeting]}>Flash user 👋</ThemedText>
                <ThemedText style={[themedStyles.subtitle, { color: colors.textSecondary }]}>Anywhere in a flash</ThemedText>
              </View>
            </View>
          </View>

          {/* Search Input */}
          <GoogleTextInput
            icon={icons.search}
            textInputBackgroundColor={colors.card}
            handlePress={handleDestinationSearch}
          />
          <View style={{marginTop:20}}>
            {RecentRides.map((ride)=>(
              <ThemedView key={ride.id} style={themedStyles.recentRide}>
                <Image source={icons.pin} resizeMode="contain" style={{width:20, height:20}}/>
                <View>
                  <ThemedText style={{fontSize:16, fontWeight:'600'}}>{ride.name}</ThemedText>
                  <ThemedText style={{fontSize:14, color:colors.textSecondary}}>{ride.address}</ThemedText>
                </View>
              </ThemedView>
            ))}
            <ThemedView>

            </ThemedView>
          </View>
          {/* Your saved locations */}
          <ThemedText style={[themedStyles.sectionTitle]}>Saved Places</ThemedText>
                <View style={themedStyles.cardsRow}>
                    {renderCard('Home', 'home')}
                    {renderCard('School', 'school')}
                    {renderCard('Office', 'office')}
                </View>
                <View style={themedStyles.cardsRow}>
                    {renderCard('Mall', 'mall')}
                    {renderCard('Fun', 'fun')}
                </View>
                <View style={themedStyles.cardsRow}>
                    {renderCard('Add a new location', 'new')}
                </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const createStyles = (colors: ColorPalette) => StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {paddingVertical:30, paddingHorizontal: 16 },
  // Header Styles
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
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
    lineHeight:36
  },
  subtitle: {
    fontSize: 18,
  },
  helpButtonContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: 24,
  },
  // recent searches
  recentRide:{
    flexDirection:'row',
    gap:8,
    borderRadius:12,
    padding:16,
    marginBottom:10,
  },

 // Stats Section
 sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginVertical: 20,
},
cardsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
card: {
  flex: 1,
  alignItems: 'center',
  padding: 15,
  borderRadius: 12,
  marginHorizontal: 4,
},
cardTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 8,
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
export default Index;

