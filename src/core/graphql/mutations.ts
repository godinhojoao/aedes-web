import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation createAccount ($input: CreateAccountInputDto!) {
    createAccount (input: $input) {
      id
      name
      email
      cpf
      role
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn ($input: SignInInputDto!) {
    signIn (input: $input) {
      token
      account {
        id
        name
        email
        cpf
        role
      }
    }
  }
`;