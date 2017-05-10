'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPromoClient = exports.getApiV2Client = undefined;

var _requester = require('./libs/helpers/requester');

var _requester2 = _interopRequireDefault(_requester);

var _promo = require('./libs/clients/promo');

var _promo2 = _interopRequireDefault(_promo);

var _apiV = require('./libs/clients/api-v2');

var _apiV2 = _interopRequireDefault(_apiV);

var _apiV3 = require('./libs/clients/api-v3');

var _apiV4 = _interopRequireDefault(_apiV3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Return API client for amoCRM promo site
 * @return {PromoClientClass}
 */
function getPromoClient() {
  return new _promo2.default(_requester2.default);
}

/**
 * @description Return API client for amoCRM account v2
 * @return {AmoV2ApiClient}
 */
function getApiV2Client() {
  return new _apiV2.default(_requester2.default, getPromoClient());
}

/**
 * @description Return API client for amoCRM account v3
 * @return {AmoV3ApiClient}
 */
function getApiV3Client() {
  return new _apiV4.default(_requester2.default, getPromoClient());
}

exports.getApiV2Client = getApiV2Client;
exports.getPromoClient = getPromoClient;
exports.default = getApiV3Client;