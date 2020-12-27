"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getToken = exports.getToken = function getToken(tokenObj, secretKey) {
  return _jsonwebtoken2.default.sign(tokenObj, secretKey);
};