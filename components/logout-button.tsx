import { TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";
import { useLogout } from "@/hooks/useAuthenticate";

const LogoutButton = () => {
    const {mutate:logout} = useLogout();
    const handleLogout = async() =>{
        logout();
    }
  return (
    <TouchableOpacity
      onPress={handleLogout}
      activeOpacity={0.8}
    >
      <ThemedText>Sign Out</ThemedText>
    </TouchableOpacity>
  );
};

export default LogoutButton;
