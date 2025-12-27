import { registerApi } from "@/api/auth.api";
import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import { icons, images } from "@/constants";
import COLORS from "@/constants/Colors";
import { getRegistrationProgress, saveRegistrationProgress } from "@/store/registrationProgress";
import { RegistrationProgress } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState('')
  const { mutate, isPending, isError, error:registrationError } = useMutation({
    mutationFn:registerApi,
    onSuccess:async(data)=>{
      const existingProgress = await getRegistrationProgress();

    if (!existingProgress) return router.replace("/(auth)/otp-verification");

    const updatedProgress: RegistrationProgress = {
      ...existingProgress,
      step: "EMAIL_OTP",
      activation_token: data.activationToken,
    };
    await saveRegistrationProgress(updatedProgress)
      router.replace("/(auth)/email-otp");
    }
  });

  const onSignUpPress = async() => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const progress = await getRegistrationProgress();
    const phone = progress?.phone;
    if(!phone) return setError("Phone number not verified")
  const data = {
    first_name:form.name,
    surname:form.surname,
    email:form.email,
    user_password:form.password,
    phone
  }
  mutate(data)
  };
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingBottom:20 }}>
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
            Create Your Account
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingBlockEnd: 50 }}>
          <InputField
            label="First name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            handleChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
          />
          <InputField
            label="Last name"
            placeholder="Enter your surname"
            icon={icons.person}
            value={form.surname}
            handleChangeText={(text) => setForm(prev => ({ ...prev, surname: text }))}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            handleChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            handleChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
          />
          <InputField
            label="Confirm Password"
            placeholder="Re-enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.confirmPassword}
            handleChangeText={(text) => setForm(prev => ({ ...prev, confirmPassword: text }))}
          />
          {isError ?
           <Text style={{color:'red'}}>{registrationError.message}</Text>
           : null}
          {error ?
           <Text style={{color:'red'}}>{error}</Text>
           : null}
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className={{ paddingBlock: 16, marginBlockStart: 20 }}
            isLoading={isPending}
          />
          <Link
            href="/sign-in"
            style={{
              textAlign: "center",
              marginBlockStart: 8,
              color: COLORS.textGray,
              fontSize: 18,
            }}
          >
            <Text>Already have an account? </Text>
            <Text style={{ color: COLORS.primary }}>Log in</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
