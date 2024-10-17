import axios from "axios";

const API_URL = "https://fvent.somee.com/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchEventById = async (eventId: string) => {
  const response = await api.get(`/events/${eventId}`);
  return response.data;
};

export const fetchEvents = async () => {
  const response = await api.get("/events");
  return response.data.items;
};
