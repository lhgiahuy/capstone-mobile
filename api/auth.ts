import { Register } from "@/constants/model/User";
import { api } from "@/lib/axios";
// import * as SecureStore from "expo-secure-store";
//   const token = await SecureStore.getItemAsync("authToken");
//   console.log("day la token:", token);

//   if (!token) {
//     throw new Error("No authentication token found");
//   }

export const UserRegister = async (userData: Partial<Register>) => {
  const response = await api.post(`users/register`, userData);
  return response.data;
};
