const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const safeAwait = require("safe-await");
const cors = require("cors");
const multer = require("multer");

//Apoolo server
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./Schema/typeDef/typeDefs");
const resolvers = require("./Schema/resolvers/resolvers");

//dot env
dotenv.config({ path: "./config.env" });

/** EXPRESS GRAPHQL PART
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
**/

//auth
const isAuth = require("./middleware/is-auth");

//monogoose
const mongoose = require("mongoose");

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use(isAuth);

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

/** EXPRESS GRAPHQL PART
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: graphQlSchema,
//     rootValue: graphQlResolvers,
//     graphiql: true,
//   })
// );
**/
