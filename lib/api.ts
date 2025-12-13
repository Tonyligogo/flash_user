import axios from 'axios';
import * as SecureStore from "expo-secure-store";
// import Constants from "expo-constants";

// const API_URL = Constants.expoConfig?.extra?.API_URL
const API_URL = process.env.EXPO_PUBLIC_API_URL

export const api = axios.create({
    baseURL:API_URL,
    timeout:15000,
    headers:{
        "Content-Type":"application/json"
    }
});

// Attach token automatically
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});