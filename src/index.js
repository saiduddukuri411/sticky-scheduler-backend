import '@babel/polyfill';
import { GraphQLServer } from 'graphql-yoga';

import prisma from './prisma';
import { resolvers } from './resolver';

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: ( request ) => {
        return{
            prisma,
            request
        }
    }
});

server.start(
    { port: process.env.PORT || 4000},
    ( ) => {
    console.log( `started in port 4000` ) 
})