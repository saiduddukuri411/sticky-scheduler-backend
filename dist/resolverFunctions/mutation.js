"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcrypt = require("../utils/bcrypt");

var _prechecks = require("./prechecks");

var _jwtToken = require("../utils/jwtToken");

var _getUser = require("../utils/getUser");

var _getUser2 = _interopRequireDefault(_getUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var secretKey = "stickySchedulerSecretKeyForJWT";
var mutation = {
  signUp: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, _ref2, info) {
      var data = _ref.data;
      var prisma = _ref2.prisma;
      var name, email, password, hashedPassword, finalInputData, user, token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return prisma.exists.User({ email: email });

            case 2:
              if (!_context.sent) {
                _context.next = 4;
                break;
              }

              throw new Error("email exists");

            case 4:
              name = data.name, email = data.email, password = data.password;

              (0, _prechecks.signUpPrecheck)(name, email, password);
              _context.next = 8;
              return (0, _bcrypt.getHashedPassword)(password);

            case 8:
              hashedPassword = _context.sent;
              finalInputData = { data: _extends({}, data, { password: hashedPassword }) };
              _context.next = 12;
              return prisma.mutation.createUser(finalInputData);

            case 12:
              user = _context.sent;
              token = (0, _jwtToken.getToken)({ userId: user.id }, secretKey);
              return _context.abrupt("return", {
                user: user,
                token: token
              });

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function signUp(_x, _x2, _x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return signUp;
  }(),
  logIn: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref4, _ref5, info) {
      var data = _ref4.data;
      var prisma = _ref5.prisma;
      var email, password, user, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              email = data.email, password = data.password;

              (0, _prechecks.logInPrecheck)(email, password);
              _context2.next = 4;
              return prisma.exists.User({ email: email });

            case 4:
              if (_context2.sent) {
                _context2.next = 6;
                break;
              }

              throw new Error("email doesnt exist");

            case 6:
              _context2.next = 8;
              return prisma.query.user({ where: { email: email } });

            case 8:
              user = _context2.sent;
              _context2.next = 11;
              return (0, _bcrypt.comparePasswords)(password, user.password);

            case 11:
              if (_context2.sent) {
                _context2.next = 13;
                break;
              }

              throw new Error("wrong password");

            case 13:
              token = (0, _jwtToken.getToken)({ userId: user.id }, secretKey);
              return _context2.abrupt("return", { user: user, token: token });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    function logIn(_x5, _x6, _x7, _x8) {
      return _ref6.apply(this, arguments);
    }

    return logIn;
  }(),
  createSchedule: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, _ref7, _ref8, info) {
      var data = _ref7.data;
      var prisma = _ref8.prisma,
          request = _ref8.request;
      var title, date, priority, currDate, id;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              title = data.title, date = data.date, priority = data.priority;
              currDate = new Date(date);
              id = (0, _getUser2.default)(request, secretKey);
              return _context3.abrupt("return", prisma.mutation.createSchedule({ data: _extends({}, data, { date: currDate, user: { connect: { id: id } } }) }, info));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    function createSchedule(_x9, _x10, _x11, _x12) {
      return _ref9.apply(this, arguments);
    }

    return createSchedule;
  }()
};
exports.default = mutation;