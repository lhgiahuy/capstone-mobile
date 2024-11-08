import { Register } from "@/constants/model/User";
import { api } from "@/lib/axios";
import * as SecureStore from "expo-secure-store";

export const getAuthToken = async (): Promise<string | null> => {
  const token = await SecureStore.getItemAsync("authToken");
  return token;
};

export const userRegister = async (userData: Partial<Register>) => {
  const response = await api.post(`users/register`, userData);
  return response.data;
};
