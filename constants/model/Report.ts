export interface ReportDetail {
  noOfEvents: number;
  noOfOrganizers: number;
  noOfCheckIn: number;
  organizers: ReportData[];
}
export interface ReportData {
  userId: string;
  username: string;
  avatarUrl?: string;
  noOfCheckIn: number;
  noOfEvents: number;
}
