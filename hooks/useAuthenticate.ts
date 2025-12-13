import { loginApi, logoutApi, verifyEmailOtpApi } from "@/api/auth.api";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      const user = {
        first_name: data.user.first_name,
        last_name: data.user.surname,
        email: data.user.email,
        phone: data.user.phone,
        id: data.user.user_id,
      }
      await login(data.accessToken, user);
    },
  });
};


export const useEmailVerification = () => {
  return useMutation({
    mutationFn:verifyEmailOtpApi,
    onSuccess:()=>{
      router.replace("/(root)/(tabs)")
    }
  })
}

export const useLogout = ()=>{
  const { logout } = useAuth();
  return useMutation({
    mutationFn:logoutApi,
    onSuccess: async () => {
      await logout();
      router.replace("/(auth)/sign-in");
    }
  })
}