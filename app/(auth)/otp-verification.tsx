import { generateOtpApi, verifyPhoneOtpApi } from "@/api/auth.api";
import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import { ThemedText } from "@/components/themed-text";
import { images } from "@/constants";
import COLORS from "@/constants/Colors";
import { Colors } from "@/constants/theme";
import { clearRegistrationProgress, getRegistrationProgress, saveRegistrationProgress } from "@/store/registrationProgress";
import { RegistrationProgress } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

const OtpVerification = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone_entry')
  const [savedPhone, setSavedPhone] = useState<string | null>(null)
  const registrationProgress = async()=>{
    const progress = await getRegistrationProgress();
    const phone = progress?.phone;
    const step = phone ? 'otp_entry' : 'phone_entry';
    if(phone){
      return router.replace("/sign-up");
    }
    setSavedPhone(phone ?? null)
    setStep(step)
  }
  useEffect(()=>{
    registrationProgress()
  },[]);

  const { mutate: sendPhoneOtp, isPending:sendingPhone, isError, error } = useMutation({
    mutationFn:generateOtpApi,
    onSuccess:async()=>{
      const progress: RegistrationProgress = {
        step:"OTP_SUBMISSION",
        phone
      };
      await saveRegistrationProgress(progress)
      setStep('otp_entry')
    }
  });
  const { mutate: verifyPhoneOtp, isPending:verifyingPhone } = useMutation({
    mutationFn:verifyPhoneOtpApi,
    onSuccess: async () => {
      const progress: RegistrationProgress = {
        step: "PROFILE_DETAILS",
        phone,
        phoneVerified: true,
      };
      await saveRegistrationProgress(progress);
      router.replace("/sign-up");
    }
  });


  const onSignUpPress = async() => {
    if(step === 'phone_entry'){
      if(!phone) return
      const data = {phone}
      sendPhoneOtp(data)
    }else if(step === 'otp_entry'){
      if(!savedPhone || !otp) return;
      const data = {
        code:otp,
        phone:savedPhone
      };
      verifyPhoneOtp(data);
    }
  };

  const handleStartAfresh = async()=>{
      await clearRegistrationProgress();
  }

  return (
    <ScrollView style={{ flex: 1}}>
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
            Verify phone number
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          {step === 'phone_entry' ?
            <InputField
            label="Phone number"
            placeholder="Enter your phone number"
            value={phone}
            handleChangeText={(text) => setPhone(text)}
            keyboardType="phone-pad"
          />
          :
          <InputField
            label="Verify OTP"
            placeholder="Enter your OTP"
            value={otp}
            handleChangeText={(text) => setOtp(text)}
          />}
          {isError ? <ThemedText>{step}-{error.message}</ThemedText> : null}
          <CustomButton
            title={step === 'phone_entry' ? 'Submit' : 'Verify'}
            onPress={onSignUpPress}
            className={{ paddingBlock: 16, marginBlockStart: 20 }}
            isLoading={sendingPhone || verifyingPhone}
          />
          {step === 'phone_entry' ? null :  <ThemedText style={{textAlign:'center', marginTop:12}}>We have sent an OTP to the number provided</ThemedText>}
           {step === 'phone_entry' ? null :
            <Link
                       href="/sign-up"
                       style={{
                         textAlign: "center",
                         marginTop: 8,
                         color: COLORS.textGray,
                         fontSize: 14,
                       }}
                     >
                       <ThemedText>Not received? </ThemedText>
                       <ThemedText style={{ color: COLORS.primary }}>Resend it</ThemedText>
                     </Link>}
          {step === 'phone_entry' ? null : 
          <TouchableWithoutFeedback onPress={handleStartAfresh}>
            <ThemedText style={{color:Colors['dark'].primary, textAlign:'center', marginTop:8}}>Start afresh</ThemedText>
          </TouchableWithoutFeedback>
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default OtpVerification;
