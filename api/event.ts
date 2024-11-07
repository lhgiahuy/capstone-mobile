import { api } from "@/lib/axios";

export const getEventById = async (eventId: string) => {
  const response = await api.get(`/events/${eventId}`);
  return response.data;
};
export const getEventType = async (eventTypeName: string) => {
  const response = await api.get(`/events?EventType=${eventTypeName}`);
  return response.data.items;
};

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data.items;
};

export const getEventsByKeyword = async (
  SearchKeyword: string,
  pageNumber: number,
  pageSize: number
) => {
  const response = await api.get(
    `/events?SearchKeyword=${SearchKeyword}&PageNumber=${pageNumber}&PageSize=${pageSize}`
  );
  return response.data;
};
