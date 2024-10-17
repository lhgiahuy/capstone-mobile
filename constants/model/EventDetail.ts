export interface EventDetail {
  title: string;
  data: EventData[];
}
export interface EventData {
  eventId: string;
  eventName: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  maxAttendees: number;
  processNote: string;
  organizerName: string;
  eventTypeName: string;
  statusId: number;
  eventTags: string;
}
