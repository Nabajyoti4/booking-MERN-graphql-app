const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const safeAwait = require("safe-await");

//dot env
dotenv.config({ path: "./config.env" });

//graphql
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

//monogoose
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Port Started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
