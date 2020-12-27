"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logInPrecheck = exports.signUpPrecheck = undefined;

var _emailValidator = require("email-validator");

var _emailValidator2 = _interopRequireDefault(_emailValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signUpPrecheck = exports.signUpPrecheck = function signUpPrecheck(name, email, password) {
  if (password.length < 6) {
    throw new Error("short password");
  } else if (name.length < 3) {
    throw new Error("short name");
  } else if (name.length > 15) {
    throw new Error("name too long");
  } else if (!_emailValidator2.default.validate(email)) {
    throw new Error("invalid email");
  }
};

var logInPrecheck = exports.logInPrecheck = function logInPrecheck(email, password) {
  if (password.length < 6) {
    throw new Error("short password");
  } else if (!_emailValidator2.default.validate(email)) {
    throw new Error("invalid email");
  }
};