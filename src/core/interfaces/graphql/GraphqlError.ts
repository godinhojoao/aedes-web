export interface GraphqlError {
  code: string;
  detailedMessage: string;
  message: string;
  path: string[];
}