import { StatusesEnum } from "../../../src/core/interfaces/types/Complaint";
import { getComplaintStatusTranslation } from "../../../src/core/shared/getComplaintStatusTranslation";

describe('getComplaintStatusTranslation', () => {
  it('returns correct translation for each status', () => {
    expect(getComplaintStatusTranslation(StatusesEnum.WAITING)).toBe('Aguardando');
    expect(getComplaintStatusTranslation(StatusesEnum.DOING)).toBe('Fazendo');
    expect(getComplaintStatusTranslation(StatusesEnum.SOLVED)).toBe('Resolvido');
    expect(getComplaintStatusTranslation(StatusesEnum.REJECTED)).toBe('Rejeitado');
  });

  it('returns default translation for unknown status', () => {
    expect(getComplaintStatusTranslation(999 as any)).toBe('Aguardando');
  });
});
