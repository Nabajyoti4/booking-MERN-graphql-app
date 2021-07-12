const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const safeAwait = require("safe-await");
const cors = require("cors");
const multer = require("multer");

//dot env
dotenv.config({ path: "./config.env" });

//graphql
const { graphqlHTTP } = require("express-graphql");
const { graphqlUploadExpress } = require("graphql-upload");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

//auth
const isAuth = require("./middleware/is-auth");

//monogoose
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    // customFormatErrorFn(err) {
    //   if (!err.originalError) {
    //     return err;
    //   }
    //   const data = err.originalError.data;
    //   const message = err.message || "An error occured";
    //   const code = err.originalError.code || 500;
    //   return {
    //     message: message,
    //     status: code,
    //     data: data,
    //   };
    // },
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
