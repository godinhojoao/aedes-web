import { Complaint } from "../types/Complaint";

export interface FindComplaintInput {
  input: {
    id: string;
  }
}

export interface FindComplaintResponse {
  findComplaint: Complaint;
}