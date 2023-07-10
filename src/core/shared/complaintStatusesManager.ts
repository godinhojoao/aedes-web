import { StatusesEnum } from "../interfaces/types/Complaint";

interface ComplaintStatus {
  label: string;
  value: StatusesEnum;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

class ComplaintStatusesManager {
  public complaintStatuses: ComplaintStatus[] = [
    { label: "Pendente", value: "WAITING", color: "blue" },
    { label: "Rejeitada", value: "REJECTED", color: "purple" },
    { label: "Resolvida", value: "SOLVED", color: "green" },
    { label: "Em andamento", value: "DOING", color: "orange" },
  ]

  getCurrentComplaintStatus(status: string): ComplaintStatus | undefined {
    const matchingStatus = this.complaintStatuses.find((complaintStatus) => complaintStatus.value === status);
    return matchingStatus;
  }

  getComplaintStatusTranslation(status: StatusesEnum): string {
    const translations = {
      WAITING: this.complaintStatuses[0].label,
      REJECTED: this.complaintStatuses[1].label,
      SOLVED: this.complaintStatuses[2].label,
      DOING: this.complaintStatuses[3].label,
    };
    return translations[status] || 'Pendente';
  }
}

export const complaintStatusesManager = new ComplaintStatusesManager();
