import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import { ThemedText } from "@/components/themed-text";
import {  images } from "@/constants";
import COLORS from "@/constants/Colors";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const OtpVerification = () => {
  const [form, setForm] = useState({
    otp: "",
  });

  const onSignUpPress = () => {
    router.push('/(root)/(tabs)')
  };
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
            Verify OTP
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingBlockEnd: 50 }}>
         
          <InputField
            label="OTP"
            placeholder="Enter your OTP"
            value={form.otp}
            onChangeText={(text) => setForm({ ...form, otp: text })}
          />
          <CustomButton
            title="Verify"
            onPress={onSignUpPress}
            className={{ paddingBlock: 16, marginBlockStart: 20 }}
          />
           <Link
                       href="/sign-up"
                       style={{
                         textAlign: "center",
                         marginBlockStart: 8,
                         color: COLORS.textGray,
                         fontSize: 18,
                       }}
                     >
                       <ThemedText>Not received? </ThemedText>
                       <ThemedText style={{ color: COLORS.primary }}>Resend it</ThemedText>
                     </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default OtpVerification;
