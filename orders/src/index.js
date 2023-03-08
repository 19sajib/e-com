const { ApolloServer } = require('apollo-server');
const { connectDB } = require('./db');
const schema = require('./schema');

const server = new ApolloServer({
  schema,
});

connectDB();

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
