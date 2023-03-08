const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const ProductModel = require('./ProductModel')


const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    image: String
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product!
  }

  type Mutation {
    createProduct(name: String!, price: Float!, description: String, image: String): Product!
  }
`;

const resolvers = {
  Query: {
    products: async () => {
      const products = await ProductModel.find();
      return products;
    },
    product: async (_, { id }) => {
      const product = await ProductModel.findById(id);
      return product;
    },
  },
  Mutation: {
    createProduct: async (_, { name, price, description, image }) => {
      const product = new ProductModel({ name, price, description, image });
      await product.save();
      return product;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
