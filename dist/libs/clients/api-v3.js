'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiV = require('./api-v2');

var _apiV2 = _interopRequireDefault(_apiV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @classdesc Client for api v2 of amoCRM
 */
var AmoV3ApiClient = function (_AmoV2ApiClient) {
  _inherits(AmoV3ApiClient, _AmoV2ApiClient);

  function AmoV3ApiClient() {
    _classCallCheck(this, AmoV3ApiClient);

    return _possibleConstructorReturn(this, (AmoV3ApiClient.__proto__ || Object.getPrototypeOf(AmoV3ApiClient)).apply(this, arguments));
  }

  return AmoV3ApiClient;
}(_apiV2.default);

exports.default = AmoV3ApiClient;