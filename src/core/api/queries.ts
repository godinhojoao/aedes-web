import { gql } from '@apollo/client';

export const GENERIC = gql`
  query generic(
    $last: Int!,
    $skip: Int,
    $where: GenericWhereInput
  ) {
    generic(
      last: $last,
      skip: $skip,
      where: $where
    ) {
      id
    }
  }
`;
