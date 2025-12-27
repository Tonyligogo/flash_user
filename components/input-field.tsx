import COLORS from "@/constants/Colors";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
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
    keyboardType?:KeyboardTypeOptions;
    handleChangeText?: (text: string) => void; // Added for TextInput
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
    keyboardType,
    handleChangeText,
  }) => {
      const colorScheme = useColorScheme();
      const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';
    return(
        <View style={[{ marginVertical: 8, width: "100%" }, style]}>
          <ThemedText style={[{ fontSize: 18, marginBottom: 8 }, labelStyle]}>{label}</ThemedText>
          <ThemedView
            style={[{ flexDirection: "row", alignItems: "center", borderRadius: 50, padding:6 }, containerStyle]}
          >
            {icon && <Image source={icon} style={[{ width: 24, height: 24, marginLeft: 16 }, iconStyle]} />}
            <TextInput
              style={[{ flex:1, color: colorTheme === 'dark' ? 'white':'black'}, inputStyle]}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor={COLORS.textGray}
              value={value}
              onChangeText={handleChangeText}
              keyboardType={keyboardType ?? 'default'}
            />
          </ThemedView>
        </View>
    )
  };
  
  export default InputField;