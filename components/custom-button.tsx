import COLORS from "@/constants/Colors";
import { ActivityIndicator, StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

// Define the props interface
interface ButtonProps {
  onPress: () => void;
  title: string;
  textStyle?: StyleProp<TextStyle>;
  IconLeft?: React.ComponentType;
  IconRight?: React.ComponentType;
  className?: StyleProp<ViewStyle>;
  isLoading?:boolean;
}

// Functional component with typed props
const CustomButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  textStyle,
  IconLeft,
  IconRight,
  className,
  isLoading
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{backgroundColor:COLORS.primary, width: "100%", display: "flex", alignItems: "center", borderRadius: 30, paddingBlock: 8 }, className]}
    activeOpacity={0.8}
    disabled={isLoading}
  >
    {IconLeft && <IconLeft />}
    {isLoading ? 
    <ActivityIndicator/> : 
    <Text style={[{ fontSize: 20, color: "white" }, textStyle]}>{title}</Text>
    }
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;