import { InforUser, Password } from "@/constants/model/User";
import { api } from "@/lib/axios";

import { getAuthToken } from "./auth";

export const getUser = async () => {
  const token = await getAuthToken();

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

export const updateUser = async (userData: Partial<InforUser>) => {
  const token = await getAuthToken();

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

export const changePassword = async (Password: Partial<Password>) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.put(`/users/change-password`, Password, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post(`/users/forgot-password`, { email });
  return response.data;
};

export const getUserParticipant = async (isCompleted: boolean) => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(
    `/users/participant?isCompleted=${isCompleted}`,
    {
      headers: {
        Cookie: `authCookie=${token}`,
      },
    }
  );
  return response.data;
};

export const getUserReport = async () => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get("/users/report", {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};
