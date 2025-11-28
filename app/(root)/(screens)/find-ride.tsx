import RideLayout from '@/components/RideLayout';
import SearchInput from '@/components/SearchInput';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocationStore } from '@/store'
import { StyleSheet, View } from 'react-native'

const FindRide = () => {
  const {userAddress, destinationAddress, setUserLocation, setDestinationLocation } = useLocationStore();
  console.log(userAddress)
  return (
    <RideLayout title="Ride">
    <View style={styles.locationSearch}>
      <ThemedText>From</ThemedText>
      <SearchInput
      initialLocation={userAddress || ''}
        handleSearch={(location)=>setUserLocation(location)}
        />
      <ThemedText>To</ThemedText>
        
      <SearchInput
        initialLocation={destinationAddress || ''}
        handleSearch={(location)=>setDestinationLocation(location)}
      />
    </View>
    <ThemedView style={styles.locationDetails}>
      <ThemedText>From</ThemedText>
      <SearchInput
      initialLocation={userAddress || ''}
        handleSearch={(location)=>setUserLocation(location)}
        />
      <ThemedText>To</ThemedText>
        
      <SearchInput
        initialLocation={destinationAddress || ''}
        handleSearch={(location)=>setDestinationLocation(location)}
      />
    </ThemedView>
    </RideLayout>
  )
}

export default FindRide

const styles = StyleSheet.create({
  locationSearch:{
    position:'absolute',
    top:60,
    left:8,
    right:8,
    zIndex:10,
    borderRadius:16,
    padding:16,
    backgroundColor:'rgba(0,0,0,0.7)',
  },
  locationDetails:{
    position:'absolute',
    bottom:8,
    left:8,
    right:8,
    zIndex:10,
    borderRadius:16,
    padding:16,
  }
})