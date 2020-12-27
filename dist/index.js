'use strict';

require('@babel/polyfill');

var _graphqlYoga = require('graphql-yoga');

var _prisma = require('./prisma');

var _prisma2 = _interopRequireDefault(_prisma);

var _resolver = require('./resolver');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _graphqlYoga.GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: _resolver.resolvers,
    context: function context(request) {
        return {
            prisma: _prisma2.default,
            request: request
        };
    }
});

server.start({ port: process.env.PORT || 4000 }, function () {
    console.log('started in port 4000');
});