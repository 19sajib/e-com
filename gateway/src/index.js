const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway } = require('@apollo/gateway');
const express = require('express');

const app = express();

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'orders', url: 'http://localhost:4001/graphql' },
    { name: 'products', url: 'http://localhost:4002/graphql' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer().then(() => {
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Gateway server running at http://localhost:${PORT}`);
  });
});
