import LoadingScreen from "@/components/loading-screen";
import { useAuth } from "@/providers/AuthProvider";
import { getRegistrationProgress } from "@/store/registrationProgress";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const restoreProgress = async () => {
      const progress = await getRegistrationProgress();
      if (!progress) return;
  
      switch (progress.step) {
        case "OTP_SUBMISSION":
          router.replace("/(auth)/otp-verification");
          break;
        case "PROFILE_DETAILS":
          router.replace("/(auth)/sign-up");
          break;
        case "EMAIL_OTP":
          router.replace("/(auth)/email-otp");
          break;
        case "COMPLETED":
          break;
      }
    };
  
    restoreProgress();
  }, []);
  
    const {isAuthenticated, isLoading} = useAuth();
    if(isLoading) return <LoadingScreen/>
  return (
    <Redirect href={!isAuthenticated ? "/(auth)/sign-in" : "/(root)/(tabs)"} />
  )
}

export default Index