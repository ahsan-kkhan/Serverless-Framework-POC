const { ApolloServer,makeExecutableSchema } = require('apollo-server-lambda');
const { resolvers } = require('./resolver');
const { typeDefs } = require('./schema');


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});