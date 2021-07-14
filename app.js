const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const safeAwait = require("safe-await");
const cors = require("cors");
const multer = require("multer");

//Apoolo server
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./Schema/typeDef/typeDefs");
const Query = require("./Schema/resolvers/Query");
const Mutation = require("./Schema/resolvers/Mutation");
const Event = require("./Schema/resolvers/Event");
const User = require("./Schema/resolvers/User");
const Booking = require("./Schema/resolvers/Booking");

//dot env
dotenv.config({ path: "./config.env" });

//auth
const isAuth = require("./middleware/is-auth");

//monogoose
const mongoose = require("mongoose");

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: { Query, Mutation, User, Event, Booking },
    context: ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || "";

      const user = isAuth(token);

      return user;
    },
  });
  await server.start();

  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  server.applyMiddleware({
    app,
  });

  const mongoConnect = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const grapqlPromise = await new Promise((resolve) => {
    app.listen({ port: process.env.PORT }, resolve);
  });
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
}

startApolloServer();
