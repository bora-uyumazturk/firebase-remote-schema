import dotenv from "dotenv";
dotenv.config();

import { ApolloServer, AuthenticationError } from "apollo-server";

import jwt from "jsonwebtoken";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    try {
      const token = req.get("Authorization").split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      throw new AuthenticationError("Invalid authorization!");
    }
  },
  introspection: true,
});

const port = process.env.PORT || 4000;

// The `listen` method launches a web server.
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
