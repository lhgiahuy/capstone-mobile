import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "@/lib/axios";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;

      // Lưu token vào SecureStore
      await SecureStore.setItemAsync("authToken", token);
      console.log(token);

      return true;
    } catch (error) {
      // console.error("Đăng nhập thất bại:", error);
      console.log("Đăng nhập thất bại");

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
