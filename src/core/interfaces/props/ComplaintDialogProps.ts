import { Complaint } from "../types/Complaint";
import { HiddableComponentProps } from "./HiddableComponentProps";

export interface ComplaintDialogProps extends HiddableComponentProps {
  currentComplaint: Complaint;
  setCurrentComplaint: React.Dispatch<React.SetStateAction<Complaint | null>>;
  afterSave: () => Promise<any>;
}
