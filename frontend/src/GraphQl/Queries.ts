import { gql } from "@apollo/client";

export const EVENTS = gql`
  query Events {
    events {
      _id
      title
      description
      price
      date
    }
  }
`;

export const USER_EVENTS = gql`
  query UserEvents {
    userEvents {
      _id
      title
      description
      price
      date
    }
  }
`;
