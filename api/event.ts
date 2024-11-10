import { api } from "@/lib/axios";
import { getAuthToken } from "./auth";
import { Review } from "@/constants/model/Comment";
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

export const getEventRating = async (eventId: string) => {
  const response = await api.get(`/events/${eventId}/average-rating`);
  return response.data;
};

export const EventRegister = async (eventId: string) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.post(`/events/${eventId}/register`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};

export const EventUnregister = async (eventId: string) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.delete(`/events/${eventId}/unregister`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};

export const getListComment = async (eventId: string) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(`/events/${eventId}/comments`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};

export const postReviewEvent = async (review: Review) => {
  const token = await getAuthToken();
  console.log("Authentication token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.post(
    `/events/${review.eventId}/reviews`,
    {
      rating: review.rating,
      comment: review.comment,
    },
    {
      headers: {
        Cookie: `authCookie=${token}`,
      },
    }
  );

  return response.data;
};

export const getListReview = async (eventId: string) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(`/events/${eventId}/reviews`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};
