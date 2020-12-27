"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = function getUserId(request, secretKey) {
    var header = request.request.headers.authorization;
    if (!header) {
        throw new Error("invalid token");
    }
    var token = header.replace("Bearer ", "");
    var decoded = _jsonwebtoken2.default.verify(token, secretKey);
    return decoded.userId;
};
exports.default = getUserId;