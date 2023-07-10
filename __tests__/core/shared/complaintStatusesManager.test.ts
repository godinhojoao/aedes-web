import { complaintStatusesManager } from "../../../src/core/shared/complaintStatusesManager";

describe('complaintStatusesManager', () => {
  describe('getComplaintStatusTranslation', () => {
    it('returns correct translation for each status', () => {
      expect(complaintStatusesManager.getComplaintStatusTranslation('WAITING')).toBe('Pendente');
      expect(complaintStatusesManager.getComplaintStatusTranslation('DOING')).toBe('Em andamento');
      expect(complaintStatusesManager.getComplaintStatusTranslation('SOLVED')).toBe('Resolvida');
      expect(complaintStatusesManager.getComplaintStatusTranslation('REJECTED')).toBe('Rejeitada');
    });

    it('returns default translation for unknown status', () => {
      expect(complaintStatusesManager.getComplaintStatusTranslation(999 as any)).toBe('Pendente');
    });
  });

  describe('getCurrentComplaintStatus', () => {
    it('returns the matching status for valid status value', () => {
      const status = 'REJECTED';
      const result = complaintStatusesManager.getCurrentComplaintStatus(status);
      expect(result).toEqual({ label: "Rejeitada", value: "REJECTED", color: "purple" });
    });

    it('returns undefined for unknown status value', () => {
      const status = 'UNKNOWN_STATUS';
      const result = complaintStatusesManager.getCurrentComplaintStatus(status);
      expect(result).toBeUndefined();
    });
  });

});

