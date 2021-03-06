import { gql } from "@apollo/client";

type EventInput = {
  title: string;
  description: string;
  price: number;
  date: string;
};

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

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $price: Float!
    $description: String!
    $date: String!
  ) {
    createEvent(
      eventInput: {
        title: $title
        price: $price
        description: $description
        date: $date
      }
    ) {
      _id
      title
      description
      price
      date
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      title
      description
      date
      price
    }
  }
`;

export const BOOK_EVENT = gql`
  mutation BookEvent($id: ID!) {
    bookEvent(eventId: $id) {
      _id
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($id: ID!) {
    cancelBooking(bookingId: $id) {
      _id
    }
  }
`;
