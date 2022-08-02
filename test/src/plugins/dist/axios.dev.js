"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _reactRouterDom = require("react-router-dom");

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.withCredentials = true;

_axios["default"].interceptors.request.use(function _callee(config) {
  var token, tokenHead;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = localStorage.getItem('token');
          tokenHead = localStorage.getItem('tokenHead');
          console.log(process.env.NODE_ENV);

          if (token) {
            config.headers.common['authorization'] = tokenHead + token;
          }

          return _context.abrupt("return", config);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}, function (error) {
  return Promise.reject(error);
}); //响应拦截


_axios["default"].interceptors.response.use(function _callee2(response) {
  var router, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          router = new _reactRouterDom.BrowserRouter();
          console.log('axios.interceptors.response', response);
          data = response.data;

          if (response.status === 400) {
            // console.log('token 失败 跳转到login',router);
            localStorage.clear();
            window.location.href = "https://sso.i.wxblockchain.com/user/login?redirectUrl= https://sql.i.wxblockchain.com";
          }

          return _context2.abrupt("return", response);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}, function (error) {
  return Promise.reject(error);
});

_react["default"].axios = _axios["default"]; //axios绑到对象包上

_react["default"].Component.prototype.axios = _axios["default"]; // axios绑定到Component类的原型 组件|this.axios

window.axios = _axios["default"]; //× 希望全局使用axios , 使用webpack 来配置

var _default = _axios["default"];
exports["default"] = _default;