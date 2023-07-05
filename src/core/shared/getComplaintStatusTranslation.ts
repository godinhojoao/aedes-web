import { StatusesEnum } from '../interfaces/types/Complaint';

export function getComplaintStatusTranslation(status: StatusesEnum): string {
  const translations = {
    [StatusesEnum.WAITING]: 'Aguardando',
    [StatusesEnum.DOING]: 'Fazendo',
    [StatusesEnum.SOLVED]: 'Resolvido',
    [StatusesEnum.REJECTED]: 'Rejeitado',
  };

  return translations[status] || 'Aguardando';
}