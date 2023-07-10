import { Complaint, StatusesEnum } from "../types/Complaint";

export interface UpdateComplaintInput {
  input: {
    id: string;
    solverId: string | undefined;
    solverDescription: string;
    status: StatusesEnum;
    updatedAt: Date;
  }
}

export interface UpdateComplaintResponse {
  updateComplaint: {
    complaint: Complaint;
  }
}
