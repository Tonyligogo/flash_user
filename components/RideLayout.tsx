import { icons } from '@/constants'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from './themed-text'

const RideLayout = ({title,children}:{title:string, children:React.ReactNode}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <Stack.Screen 
        options={{ 
            headerShown: false, 
            gestureEnabled: true, 
        }} 
      />

      <StatusBar />
      <View style={styles.layoutWrapper}>
        {/*absolute button */}
        <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8} onPress={()=>router.back()}>
            <View style={styles.backButton}>
                <Image source={icons.backArrow} resizeMode='contain' style={styles.arrowIcon} />
            </View>
            <ThemedText style={{fontSize:20}}>{title}</ThemedText>
        </TouchableOpacity>
        {/*absolute content */}
        {children}
      </View>
    </SafeAreaView>
  )
}

export default RideLayout

const styles = StyleSheet.create({
    safeArea:{
        flex:1
    },
    layoutWrapper:{
        position:'relative',
        flex:1,
    },
    buttonWrapper:{
        position:'absolute',
        zIndex:10,
        top:0,
        left:0,
        right:16,
        flexDirection:'row',
        alignItems:'center',
        gap:6,
        // backgroundColor:'rgba(0,0,0,0.7)',
        padding:16,
        borderRadius:16
    },
    backButton:{
        backgroundColor:'white',
        width:32,
        height:32,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:16
    },
    arrowIcon:{
        width:24,
        height:24
    },
})