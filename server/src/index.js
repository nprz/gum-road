const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

// Resolvers
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Product = require("./resolvers/Product");

const resolvers = {
  Query,
  Mutation,
  Product,
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
