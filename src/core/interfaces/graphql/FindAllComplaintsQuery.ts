import { StatusesEnum } from "../types/Complaint";

export interface FindAllComplaintsInput {
  input: {
    limit: number;
    offset: number;
  }
}

export type ComplaintTableRow = {
  id: string;
  status: StatusesEnum;
  description: string;
  city: string;
  formattedAddress: string;
  createdAt: Date;
}

export interface FindAllComplaintsResponse {
  findAllComplaints: {
    items: ComplaintTableRow[];
    totalCount: number;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    }
  };
}