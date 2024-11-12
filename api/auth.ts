import { Register } from "@/constants/model/User";
import { api } from "@/lib/axios";
import * as SecureStore from "expo-secure-store";

export const getAuthToken = async (): Promise<string | null> => {
  const token = await SecureStore.getItemAsync("authToken");
  return token;
};

export const userRegister = async (userData: Partial<Register>) => {
  const response = await api.post(`/users/register`, userData);
  return response.data;
};

export const addVerifyCard = async (cardUrl: string) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }
  const response = await api.put(
    `/users/addCard`,
    { cardUrl },
    {
      headers: {
        Cookie: `authCookie=${token}`,
      },
    }
  );
  return response.data;
};
