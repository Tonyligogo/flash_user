import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback, View} from "react-native";

import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import InputField from "./input-field";
import { useState } from "react";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { Image } from "expo-image";
import COLORS from "@/constants/Colors";

const GoogleTextInput = ({
  icon,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ marginVertical: 16, width: "100%" }}>
              <ThemedView
                style={{ flexDirection: "row", alignItems: "center", borderRadius: 50 }}
              >
                {icon && <Image source={icon} style={{ width: 24, height: 24, marginLeft: 16 }} />}
                <TextInput
                  style={{ padding: 16, fontSize: 18, borderRadius: 50, color:'white' }}
                  placeholder="e.g. Meru town"
                  placeholderTextColor={COLORS.textGray}
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
              </ThemedView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
  );
};

export default GoogleTextInput;
