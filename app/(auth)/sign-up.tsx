import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import { icons, images } from "@/constants";
import COLORS from "@/constants/Colors";
import { useRegister } from "@/hooks/useAuthenticate";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone:""
  });
  const [error, setError] = useState('')
  const { mutate, isPending, isError } = useRegister();
  const onSignUpPress = () => {
    if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }
  const data = {
    first_name:form.name,
    surname:form.surname,
    email:form.email,
    user_password:form.password,
    phone:form.phone
  }
    mutate(data)
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
            label="First name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <InputField
            label="Last name"
            placeholder="Enter your surname"
            icon={icons.person}
            value={form.surname}
            onChangeText={(text) => setForm({ ...form, surname: text })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            keyboardType="email-address"
          />
          <InputField
            label="Phone number"
            placeholder="Enter your phone number"
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
            keyboardType="phone-pad"
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
          {isError ?
           <Text style={{color:'red'}}>Login failed. Check your credentials</Text>
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
  );
};

export default SignUp;
