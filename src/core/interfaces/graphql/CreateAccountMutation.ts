import { Account } from "../Account";

export interface CreateAccountInput {
  input: {
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: string;
  }
}

export interface CreatedAccountResponse {
  createAccount: Account;
}
