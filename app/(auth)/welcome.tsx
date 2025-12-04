import CustomButton from "@/components/custom-button";
import { ThemedText } from "@/components/themed-text";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom:20 }}>
        <TouchableOpacity onPress={()=>{router.replace('/(auth)/otp-verification')}} style={{width:'100%', display:'flex', alignItems:'flex-end', padding: 20}}>
          <ThemedText style={{fontWeight:800, fontSize:18}}>Skip</ThemedText>
        </TouchableOpacity>
        <Swiper 
        ref={swiperRef} 
        loop={false} 
        dot={
        <View style={{width:32, height:4, marginInline:1, backgroundColor:"#E2E8F0", borderRadius:'15%'}}/>
      }
        activeDot={
        <View style={{width:32, height:4, marginInline:1, backgroundColor:"#0286FF", borderRadius:'15%'}}/>
      }
        onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View key={item.id} style={{flex: 1, alignItems: 'center', paddingHorizontal: 20}}>
              <Image
              source={item.image}
              style={{width: '100%', height: 300, marginBottom: 20}}
              resizeMode="contain"
              />
              <ThemedText style={{fontSize: 26, fontWeight: 'bold', marginBottom: 20}}>{item.title}</ThemedText>
              <ThemedText style={{fontSize:18, textAlign: 'center', paddingHorizontal: 20, marginBottom: 20}}>{item.description}</ThemedText>
            </View>
          ))}
        </Swiper>
        <CustomButton
        title={isLastSlide ? 'Get Started' :'Next'}
        onPress={()=> isLastSlide ? router.replace('/(auth)/otp-verification') : swiperRef.current?.scrollBy(1)} 
        className={{width:'90%'}}/>
      </SafeAreaView>
    )
}

export default Onboarding