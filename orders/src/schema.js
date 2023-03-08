const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const OrderModel = require('./OrderModel')


const typeDefs = gql`
  type Order {
    id: ID!
    products: [ID!]!
    status: String!
    totalPrice: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    order(id: ID!): Order!
  }

  type Mutation {
    createOrder(products: [ID!]!, status: String!, totalPrice: Float!): Order!
    updateOrderStatus(id: ID!, status: String!): Order!
  }
`;

const resolvers = {
  Query: {
    order: async (_, { id }) => {
      const order = await OrderModel.findById(id);
      return order;
    },
  },
  Mutation: {
    createOrder: async (_, { products, status, totalPrice }) => {
      const order = new OrderModel({ products, status, totalPrice });
      await order.save();
      return order
    },
    updateOrderStatus: async (_, { id, status }) => {
      const order = await OrderModel.findById(id);
      order.status = status;
      await order.save();
      return order ;
    }
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;