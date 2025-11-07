import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme, View} from "react-native";

import { ColorPalette, GoogleInputProps } from "@/types/type";
import { useState } from "react";
import { Image } from "expo-image";
import COLORS from "@/constants/Colors";
import { useTheme } from "@/constants/ThemeContext";
import { ThemedView } from "./themed-view";
import { Colors } from "@/constants/theme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const createStyles = (colors: ColorPalette) => StyleSheet.create({
  container:{
    width:'100%',
    flexDirection: "row", 
    alignItems: "center", 
    overflow:'hidden',
    borderColor:Colors.dark.borders,
    borderWidth:2,
  },
  icon:{
    width: 24, 
    height: 24, 
    marginLeft: 16,
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
    const colorScheme = useColorScheme()
    const iconColor = colorScheme === 'dark' ? 'white' : 'black'
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={[themedStyles.container, {borderRadius:50}]}
              >
                {/* {icon && <Image source={icon} style={themedStyles.icon} />} */}
                <MaterialIcons name="search" size={24} color={iconColor} style={themedStyles.icon} />
                <TextInput
                  style={themedStyles.textInput}
                  placeholder="Where to?"
                  placeholderTextColor={iconColor}
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
              </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
  );
};

export default GoogleTextInput;
