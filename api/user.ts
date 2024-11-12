import { InforUser, Password } from "@/constants/model/User";
import { api } from "@/lib/axios";

import { getAuthToken } from "./auth";

export const getUser = async () => {
  const token = await getAuthToken();
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

export const updateUser = async (userData: Partial<InforUser>) => {
  const token = await getAuthToken();
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

export const getNotifications = async () => {
  const token = await getAuthToken();

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

export const getUserParticipant = async () => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(`/users/participant`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};
