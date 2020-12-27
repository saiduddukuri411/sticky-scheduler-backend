'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _query = require('./resolverFunctions/query');

var _query2 = _interopRequireDefault(_query);

var _mutation = require('./resolverFunctions/mutation');

var _mutation2 = _interopRequireDefault(_mutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = exports.resolvers = {
  Query: _query2.default,
  Mutation: _mutation2.default
};