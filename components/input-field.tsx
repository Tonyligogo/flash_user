import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
    ImageStyle,
    ImageSourcePropType,
  } from "react-native";
  import COLORS from "@/constants/Colors";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
  
  // Define the props interface
  interface InputFieldProps {
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    icon?: ImageSourcePropType;
    placeholder?: string;
    secureTextEntry?: boolean;
    inputStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
    value?: string; // Added for TextInput
    onChangeText?: (text: string) => void; // Added for TextInput
  }
  
  // Functional component with typed props
  const InputField: React.FC<InputFieldProps> = ({
    label,
    labelStyle,
    icon,
    placeholder,
    secureTextEntry = false,
    inputStyle,
    containerStyle,
    iconStyle,
    style,
    value,
    onChangeText,
  }) => (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[{ marginVertical: 8, width: "100%" }, style]}>
          <ThemedText style={[{ fontSize: 18, marginBottom: 8 }, labelStyle]}>{label}</ThemedText>
          <ThemedView
            style={[{ flexDirection: "row", alignItems: "center", borderRadius: 50 }, containerStyle]}
          >
            {icon && <Image source={icon} style={[{ width: 24, height: 24, marginLeft: 16 }, iconStyle]} />}
            <TextInput
              style={[{ padding: 16, fontSize: 18, borderRadius: 50 }, inputStyle]}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor={COLORS.textGray}
              value={value}
              onChangeText={onChangeText}
            />
          </ThemedView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
  
  export default InputField;