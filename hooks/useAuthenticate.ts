import { generateOtpApi, loginApi, registerApi } from "@/api/auth.api";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      await login(data.token, data.user);
    },
  });
};

export const useGenerateOtp = () => {
  return useMutation({
    mutationFn: generateOtpApi,
  });
};

export const useRegister = () => {
  const otpMutation = useGenerateOtp();

  return useMutation({
    mutationFn: registerApi,

    onSuccess: (data) => {
      const phone = data.user.phone;

      otpMutation.mutate(
        { phone },
        {
          onSuccess: () => {
            router.replace({
              pathname: "/otp-verification",
              params: { phone },
            });
          },
        }
      );
    },
  });
};
