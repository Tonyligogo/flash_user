import { api } from "@/lib/api";

// login api
export const loginApi = async (data: { email: string; user_password: string }) => {
  const res = await api.post("/api/user/login", data);
  return res.data;
};

// register api
export const registerApi = async (data:{
    first_name:string;
    surname:string;
    email:string;
    user_password:string;
    phone:string
}) => {
    const res = await api.post("/api/user/registration", data)
    return res.data;
}

// OTP generation
export const generateOtpApi = async (payload: {
  phone: string;
}) => {
  const res = await api.post("/api/user/phone-otp-generation", payload);
  return res.data;
};

// OTP generation
export const verifyPhoneOtpApi = async (payload: {
  phone: string;
  code:string
}) => {
  const res = await api.post("/api/user/phone-otp-verification", payload);
  return res.data;
};