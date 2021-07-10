import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      tokenExpiration
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SignUp($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
    }
  }
`;
