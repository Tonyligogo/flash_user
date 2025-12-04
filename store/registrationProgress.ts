import { RegistrationProgress } from "@/types/type";
import * as SecureStore from "expo-secure-store";

const REG_KEY = "registration-progress";

export const saveRegistrationProgress = async (data: RegistrationProgress) =>
  await SecureStore.setItemAsync(REG_KEY, JSON.stringify(data));

export const getRegistrationProgress = async (): Promise<RegistrationProgress | null> => {
  const value = await SecureStore.getItemAsync(REG_KEY);
  return value ? JSON.parse(value) : null;
};

export const clearRegistrationProgress = async () =>
  await SecureStore.deleteItemAsync(REG_KEY);
