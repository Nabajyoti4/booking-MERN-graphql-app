import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query {
    login(email: $email, password: $password) {
      token
    }
  }
`;
