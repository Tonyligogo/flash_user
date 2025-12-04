import LoadingScreen from "@/components/loading-screen";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

const Index = () => {
    const {isAuthenticated, isLoading} = useAuth();
    if(isLoading) return <LoadingScreen/>
  return (
    <Redirect href={!isAuthenticated ? "/(auth)/welcome" : "/(root)/(tabs)"} />
  )
}

export default Index