import { api } from "@/lib/axios";

import { getAuthToken } from "./auth";

export const getOrganizer = async (userId: string) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(`/users/${userId}`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};

export const getEventOfOrganizer = async (Id: string, status: string) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(
    `/events/organizer?OrganizerId=${Id}&status=${status}`,
    {
      headers: {
        Cookie: `authCookie=${token}`,
      },
    }
  );
  return response.data;
};
