import axios from "axios";

const API_URL = "https://fvent.somee.com/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEventById = async (eventId: string) => {
  const response = await api.get(`/events/${eventId}`);
  return response.data;
};

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data.items;
};
