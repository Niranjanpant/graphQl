const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const { MONGODB_URL } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
  }),
});

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected with data base");
    return server.listen({ port: 3000 });
  })

  .then((res) => {
    console.log(`Server is running on ${res.url}`);
  })
  .catch((e) => {
    console.log(e);
  });
