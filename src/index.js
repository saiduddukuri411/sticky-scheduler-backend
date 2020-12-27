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

server.start(() => {
    console.log( "started in port 4000" ) 
})