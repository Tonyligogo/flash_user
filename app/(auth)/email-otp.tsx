import { View, Text, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { getRegistrationProgress, saveRegistrationProgress } from '@/store/registrationProgress';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import CustomButton from '@/components/custom-button';
import InputField from '@/components/input-field';
import { images } from '@/constants';
import { useEmailVerification } from '@/hooks/useAuthenticate';
import { RegistrationProgress } from '@/types/type';

const EmailVerification = () => {
    const [token, setToken] = useState('');
    const [otp, setOtp] = useState('');
     const registrationProgress = async()=>{
        const progress = await getRegistrationProgress();
        const token = progress?.activation_token ?? null;
        if(!token){
          return router.replace("/sign-up");
        }
        setToken(token)
      }
      useEffect(()=>{
        registrationProgress()
      },[]);

      const { mutate:verifyEmailOtp, isPending, isError, error } = useEmailVerification();

      const handleVerify = async() => {
        if(!token) return;
        const payload = {
          activation_token: token,
          activation_code: otp
        }
        verifyEmailOtp(
          payload,
          {onSuccess:async()=>{
           const updatedProgress: RegistrationProgress = {
                step: "COMPLETED",
              };
              await saveRegistrationProgress(updatedProgress)
              router.replace("/(auth)/sign-in");
        }}
      );
      }
  return (
    <View style={{ flex: 1}}>
        <View style={{ position: "relative", width: "100%", height: 250 }}>
          <Image
            source={images.signUpCar}
            style={{ zIndex: 0, width: "100%", height: 250 }}
          />
          <Text
            style={{
              position: "absolute",
              fontSize: 28,
              fontWeight: "bold",
              bottom: 16,
              left: 20,
            }}
          >
            Verify email address
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
         
          <InputField
            label="Verify OTP"
            placeholder="Enter your OTP"
            value={otp}
            handleChangeText={(text) => setOtp(text)}
          />
          {isError ? <ThemedText>{error.message}</ThemedText> : null}
          <CustomButton
            title='Verify'
            onPress={handleVerify}
            className={{ paddingBlock: 16, marginBlockStart: 20 }}
            isLoading={isPending}
          />
          <ThemedText style={{textAlign:'center', marginTop:12}}>We have sent an OTP to the email provided</ThemedText>
        </View>
      </View>
  )
}

export default EmailVerification