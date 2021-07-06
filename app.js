const express = require("express");
const bodyParser = require("body-parser");

//graphql
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

//monogoose
const mongoose = require("mongoose");

//model
const Event = require("./model/event");

const app = express();

app.use(bodyParser.json());

const events = [];

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`

      type RootQuery {
          events: [Event!]!
      }

    
      type RootMutation {
          createEvent(eventInput: EventInput): Event!
      }

      input EventInput {
        title : String!
        description : String!
        price: Float!
        date: String!
      }


      type Event {
        _id : ID!
        title : String!
        description : String!
        price: Float!
        date: String!
    }

      schema {
          query: RootQuery
          mutation: RootMutation
      }
    `),
    rootValue: {
      events: async () => {
        try {
          const events = await Event.find();
          return events;
        } catch (err) {
          throw new Error("cant Create Event Try Again");
        }
      },
      createEvent: async (args) => {
        const eventData = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });

        try {
          const event = await eventData.save();
          return event;
        } catch (err) {
          throw new Error("cant Create Event Try Again");
        }
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://naba-admin:YSlCxAFSfgkYg9it@cluster0.ilr8i.mongodb.net/events-react-dev?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(8000, () => {
      console.log("Port Started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
