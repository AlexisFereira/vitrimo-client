import {gql} from '@apollo/client';

export const CONFIRM_EMAIL = gql`
  mutation confirmEmail($userId: String!) {
    confirmEmail(userId: $userId) {
      _id
      email
      firstName
      lastName
      phone
      active
      confirmed
    }
  }
`;
