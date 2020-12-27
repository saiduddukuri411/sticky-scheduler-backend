'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _prismaBinding = require('prisma-binding');

var prisma = new _prismaBinding.Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: 'stickySchedularPrismaSecret'
});

exports.default = prisma;