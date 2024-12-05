export interface ReportDetail {
  noOfEvents: number;
  noOfOrganizers: number;
  organizers: ReportData[];
}
export interface ReportData {
  userId: string;
  username: string;
  avatarUrl?: string;
  noOfEvents: number;
}
