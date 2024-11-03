import { User } from "@/constants/model/User";
import { api } from "@/lib/axios";
import * as SecureStore from "expo-secure-store";

// export const Token = async()=>{
//   const token = await SecureStore.getItemAsync("authToken");
// }

export const getUser = async () => {
  const token = await SecureStore.getItemAsync("authToken");
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(`/users/me`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};

export const updateUser = async (userData: Partial<User>) => {
  const token = await SecureStore.getItemAsync("authToken");
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.put(`/users`, userData, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};
export const getNotifications = async () => {
  const token = await SecureStore.getItemAsync("authToken");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(`/users/notifications`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};
