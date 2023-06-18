export interface ComplaintTableRow {
  id: string;
  status: string;
  city: string;
  formattedAddress: string;
  createdAt: string;
}

export interface ComplaintTableProps {
  rows: ComplaintTableRow[];
}
