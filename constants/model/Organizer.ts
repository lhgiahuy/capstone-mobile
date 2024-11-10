export interface Organizer {
  userId: string;
  username: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  cardUrl: string;
  roleName: string;
}

export interface NavOrganizerProps {
  organizerId: string;
}
