import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import { icons, images } from "@/constants";
import COLORS from "@/constants/Colors";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onSignUpPress = () => {
    router.replace('/(auth)/sign-in')
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <InputField
            label="Confirm Password"
            placeholder="Re-enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.confirmPassword}
            onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className={{ paddingBlock: 16, marginBlockStart: 20 }}
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
  );
};

export default SignUp;
