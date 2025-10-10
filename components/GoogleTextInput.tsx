import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, View} from "react-native";

import { ColorPalette, GoogleInputProps } from "@/types/type";
import { useState } from "react";
import { Image } from "expo-image";
import COLORS from "@/constants/Colors";
import { useTheme } from "@/constants/ThemeContext";

const createStyles = (colors: ColorPalette) => StyleSheet.create({
  wrapper:{
    marginVertical:16,
    width:'100%'
  },
  container:{
    flexDirection: "row", 
    alignItems: "center", 
    overflow:'hidden',
    backgroundColor: colors.tripCardBig,
  },
  icon:{
    width: 24, 
    height: 24, 
    marginLeft: 16
  },
  textInput:{
    padding: 16, 
    fontSize: 18, 
    borderRadius: 50,
    color:colors.textPrimary
  }
});

const GoogleTextInput = ({
  icon,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { colors } = useTheme();
    const themedStyles = createStyles(colors);
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={themedStyles.wrapper}>
              <View
                style={[themedStyles.container, {borderRadius:50}]}
              >
                {icon && <Image source={icon} style={themedStyles.icon} />}
                <TextInput
                  style={themedStyles.textInput}
                  placeholder="e.g. Meru town"
                  placeholderTextColor={COLORS.textGray}
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
  );
};

export default GoogleTextInput;
