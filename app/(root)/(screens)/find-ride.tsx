import RideSelection from '@/components/ride-selection';
import RideLayout from '@/components/RideLayout';
import SearchInput from '@/components/SearchInput';
import { ThemedText } from '@/components/themed-text';
import { useLocationStore } from '@/store'
import { StyleSheet, View } from 'react-native'

const FindRide = () => {
  const {userAddress, destinationAddress, setUserLocation, setDestinationLocation } = useLocationStore();
  return (
    <RideLayout title="Ride">
    <View style={styles.locationSearch}>
        <View style={styles.fromLocation}>
      <ThemedText>From</ThemedText>
      <SearchInput
      initialLocation={userAddress || ''}
        handleSearch={(location)=>setUserLocation(location)}
        />
      </View>
      <ThemedText>To</ThemedText>
        
      <SearchInput
        initialLocation={destinationAddress || ''}
        handleSearch={(location)=>setDestinationLocation(location)}
      />
    </View>
    <View style={styles.rideSelection}>
    <RideSelection/>
    </View>
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
  },
  fromLocation:{
    marginBottom:20
  },
  ridesContainer:{
    flex:1,
    padding:16,
  },
  ridesWrapper:{
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  rideSelection:{
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
  }
})