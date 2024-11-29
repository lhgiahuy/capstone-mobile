export interface Notification {
  notiId: string;
  userId: string;
  eventId: string;
  title: string;
  message: string;
  readStatus: string;
  sendTime: string;
}

export interface ButtonRead {
  notiId: string;
  readStatus: string;
}
