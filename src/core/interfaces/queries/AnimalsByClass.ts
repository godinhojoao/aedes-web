import { ApolloError } from "@apollo/client";

export interface GenericResponse {
  loading: boolean;
  error?: ApolloError;
  data?: any[];
}