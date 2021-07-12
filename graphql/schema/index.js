const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    userEvents: [Event!]!
}


type RootMutation {
    createEvent(eventInput: EventInput): Event!
    deleteEvent(id: ID!): Event!
    createUser(userInput: UserInput): User!
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Booking!
    login(email: String!, password: String!): AuthData!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input EventInput {
  title : String!
  description : String!
  price: Float!
  date: String!
}

input UserInput {
  email: String!
  password: String!
}


type Event {
  _id : ID!
  title : String!
  description : String!
  price: Float!
  date: String!
  creator: User!
}

type User {
_id: ID!
email: String!
password: String
createdEvents: [Event!]
}

type Booking {
  _id : ID!
  event : Event!
  user : User!
  createdAt: String!
  updatedAt: String!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
