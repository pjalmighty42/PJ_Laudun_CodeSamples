const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const { connectDB } = require("./config/db");
const PORT = process.env.PORT || 4000;

const app = express();

//Connect to DB
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(
  PORT,
  console.log(`SERVER RUNNING ON PORT: ${PORT}`.green.bold.underline)
);
