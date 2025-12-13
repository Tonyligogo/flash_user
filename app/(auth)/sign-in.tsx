import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import { ThemedText } from "@/components/themed-text";
import { icons, images } from "@/constants";
import COLORS from "@/constants/Colors";
import { useLogin } from "@/hooks/useAuthenticate";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    user_password: "",
  });

  const { mutate, isPending, isError } = useLogin();

  const onSignInPress = () => {
    mutate({
      email:form.email,
      user_password:form.user_password,
    },
    {onSuccess:()=>{
      router.push('/(root)/(tabs)');
    }}
  );
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
            Welcome 👋
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingBlockEnd: 50 }}>
         
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.user_password}
            handleChangeText={(text) => setForm({ ...form, user_password: text })}
          />
          {isError ?
           <Text style={{color:'red'}}>Login failed. Check your credentials</Text>
           : null}
          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className={{ paddingBlock: 16, marginBlockStart: 20 }}
            isLoading={isPending}
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
            <ThemedText>Don&apos;t have an account? </ThemedText>
            <ThemedText style={{ color: COLORS.primary }}>Create account</ThemedText>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
