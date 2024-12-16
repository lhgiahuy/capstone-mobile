import { api } from "@/lib/axios";
import { getAuthToken } from "./auth";
import { Review } from "@/constants/model/Comment";

interface getEventProps {
  SearchKeyword?: string;
  PageSize?: number;
  PageNumber?: number;
  isDescending?: boolean;
  orderBy?: string;
  EventTypes?: string;
  eventTag?: string;
  Status?: string;
  inMonth?: number;
  inYear?: number;
}

// Event

export async function getEvent(props?: getEventProps) {
  try {
    const event = await api.get("/events", { params: props });
    return event.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export const getEventById = async (eventId: string) => {
  const response = await api.get(`/events/${eventId}`);
  return response.data;
};

export const getEventTypes = async () => {
  const response = await api.get("/event-types");
  return response.data;
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

export const getEventByStatus = async (Status: string) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(`/events?SearchKeyword=${Status}`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};

export const getEventRecommendation = async () => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get(`/events/recommendation`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data.items;
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

// Banner

export const getListBanner = async () => {
  const response = await api.get(`/events/banners`);
  return response.data;
};

// Review

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

// sumbit register-form

export const sumbitForm = async (eventId: string, data: any) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.post(`/events/${eventId}/submit-form`, data, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};

//CheckIn
export const checkIn = async (eventId: string) => {
  const token = await getAuthToken();
  console.log("day la token:", token);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.put(`/events/${eventId}/checkin`, {
    headers: {
      Cookie: `authCookie=${token}`,
    },
  });
  return response.data;
};
