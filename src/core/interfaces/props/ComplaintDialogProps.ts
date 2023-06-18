import { ComplaintTableRow } from "./ComplaintTableProps";
import { HiddableComponentProps } from "./HiddableComponentProps";

export interface ComplaintDialogProps extends HiddableComponentProps {
  currentComplaint: ComplaintTableRow | null;
}
