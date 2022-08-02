"use strict";

var _reactLoadable = _interopRequireDefault(require("react-loadable"));

var _index = _interopRequireDefault(require("../components/loading/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//定义路由
global.notFound = (0, _reactLoadable["default"])({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/_404Page'));
    });
  },
  loading: _index["default"]
});
global.HomePage = (0, _reactLoadable["default"])({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/HomePage'));
    });
  },
  loading: _index["default"]
});
global.Instancemanagement = (0, _reactLoadable["default"])({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/instancemanagement/index.js'));
    });
  },
  loading: _index["default"]
});
global.Instancelist = (0, _reactLoadable["default"])({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/instancemanagement/instancelist.js'));
    });
  },
  loading: _index["default"]
});
global.SqlIndex = (0, _reactLoadable["default"])({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/sql/index.js'));
    });
  },
  loading: _index["default"]
});
global.Sqlcheck = (0, _reactLoadable["default"])({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/sql/sqlcheck.js'));
    });
  },
  loading: _index["default"]
});
global.HistoryIndex = (0, _reactLoadable["default"])({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/history/index.js'));
    });
  },
  loading: _index["default"]
});
global.Checkhistory = (0, _reactLoadable["default"])({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/history/checkhistory.js'));
    });
  },
  loading: _index["default"]
});
global.Carryouthistory = (0, _reactLoadable["default"])({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/history/carryouthistory.js'));
    });
  },
  loading: _index["default"]
});