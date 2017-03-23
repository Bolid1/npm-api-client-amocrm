'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @classdesc Client for api v2 of amoCRM
 */
var AmoV2ApiClient = function (_AmoApiClient) {
  _inherits(AmoV2ApiClient, _AmoApiClient);

  function AmoV2ApiClient() {
    _classCallCheck(this, AmoV2ApiClient);

    return _possibleConstructorReturn(this, (AmoV2ApiClient.__proto__ || Object.getPrototypeOf(AmoV2ApiClient)).apply(this, arguments));
  }

  return AmoV2ApiClient;
}(_api2.default);

exports.default = AmoV2ApiClient;