import { gql } from '@apollo/client';

export const FIND_ALL_COMPLAINTS_QUERY = gql`
  query findAllComplaints($input: FindAllComplaintsInputDto!) {
    findAllComplaints(input: $input) {
      items {
        id
        status
        description
        city
        createdAt
        formattedAddress
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
