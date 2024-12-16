import { api } from "@/lib/axios";

export const getTags = async () => {
  const response = await api.get("/tags");
  return response.data;
};
