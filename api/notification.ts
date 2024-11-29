import { api } from "@/lib/axios";

import { getAuthToken } from "./auth";

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

export const readNotification = async (notiId: string) => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.put(`/notifications/${notiId}/read`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};

export const removeNotification = async (notiId: string) => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.delete(`/notifications/${notiId}`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};
