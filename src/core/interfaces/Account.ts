export interface Account {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: 'USER' | 'ADMIN';
}