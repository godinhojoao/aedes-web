import { Account } from "../Account";

export interface SignInInput {
  input: {
    email: string;
    password: string;
  }
}

export interface SignInResponse {
  signIn: {
    account: Account;
    token: string;
  }
}
