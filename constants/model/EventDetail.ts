export interface EventDetail {
  pageNumber: number;
  pageSize: number;
  count: number;
  totalItems: number;
  totalPages: number;
  items: EventData[];
}
export interface EventData {
  eventId: string;
  eventName: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  linkEvent: string;
  passwordMeeting: string;
  maxAttendees: number;
  processNote: string;
  organizerId: string;
  organizerName: string;
  eventTypeName: string;
  posterImg: string;
  thumbnailImg: string;
  status: string;
  isRegistered: boolean | null;
  eventTags: string[];
}

export interface Rating {
  avgRate: number;
}

export interface ButtonProps {
  eventId: string;
}
export interface NavRating {
  eventId: string;
  status: string;
}

export interface ButtonRegisterProps {
  eventId: string;
  register: boolean | null;
  status: string;
}
