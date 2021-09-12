const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    product: (parent, { productId }, { prisma }) => {
      return prisma.product.findUnique({
        where: { id: productId },
        include: {
          reviews: true,
        },
      });
    },
  },
  Mutation: {
    createProduct: (parent, { title }, { prisma }) => {
      return prisma.product.create({
        data: {
          title,
        },
      });
    },
    addReview: (parent, { productId, rating }, { prisma }) => {
      return prisma.review.create({
        data: {
          rating,
          productId,
        },
      });
    },
  },
  Product: {
    reviews: ({ reviews }) => {
      return reviews ? reviews : [];
    },
  },
};

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
