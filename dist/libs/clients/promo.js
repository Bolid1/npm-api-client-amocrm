'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACCOUNT_INFO_TOP_DOMAIN = exports.ACCOUNT_INFO_STATUSES = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Enum for account statuses.
 * @readonly
 * @enum {string}
 */
var ACCOUNT_INFO_STATUSES = exports.ACCOUNT_INFO_STATUSES = {
  free: 'free',
  active: 'active'
};

/**
 * Enum for account statuses.
 * @readonly
 * @enum {string}
 */
var ACCOUNT_INFO_TOP_DOMAIN = exports.ACCOUNT_INFO_TOP_DOMAIN = {
  ru: 'ru',
  en: 'en'
};

/**
 * @typedef {Object} AccountInfoFromPromo
 * @property {ACCOUNT_INFO_STATUSES} status - Indicates the subdomain status
 * @property {string} subdomain - Account subdomain
 * @property {string} base_domain - Account base domain "amocrm.ru" for example
 * @property {string} account_domain - Account domain to use in requests
 * @property {string} account_type - Account registration origin (ru|com)
 * @property {ACCOUNT_INFO_TOP_DOMAIN} top_domain - Account top level domain
 */

/**
 * @description Checks that account status is valid
 * @param {string} status
 * @return {boolean}
 * @private
 */
var infoStatusIsValid = function infoStatusIsValid(status) {
  var statusValid = typeof status === 'string';
  return statusValid && typeof ACCOUNT_INFO_STATUSES[status] !== 'undefined';
};

/**
 * @classdesc Client for promo site
 */

var PromoClientClass = function () {
  /**
   * @param {RequesterClass} request
   */
  function PromoClientClass(request) {
    _classCallCheck(this, PromoClientClass);

    /**
     * @type {RequesterClass}
     * @private
     */
    this._request = request;
  }

  /**
   * @description Get account info by its subdomain
   * @param {string} subdomain
   * @return {Promise}
   * @memberOf PromoClientClass
   * @instance
   * @public
   */


  _createClass(PromoClientClass, [{
    key: 'getAccountInfoBySubdomain',
    value: function getAccountInfoBySubdomain(subdomain) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var url = 'https://www.amocrm.ru/api/accounts/domains/';
        var form = { domains: [subdomain] };
        _this._request.post({ url: url, form: form }, function (err, httpResponse, body) {
          /**
           * @type {AccountInfoFromPromo}
           */
          var account = void 0;

          if (err !== null) {
            return reject(err);
          }

          body = JSON.parse(body);

          if (_underscore2.default.isObject(body) && typeof body.error === 'string') {
            return reject({ message: body.error });
          }

          if (!_underscore2.default.isArray(body)) {
            return reject({ message: 'Invalid body type', body: body });
          }

          account = _underscore2.default.first(_underscore2.default.toArray(body));

          if (!_underscore2.default.isObject(account)) {
            return reject({ message: 'Invalid body first element', body: body });
          }

          var subdomainValid = typeof account.subdomain !== 'undefined';
          subdomainValid = subdomainValid && account.subdomain === subdomain;

          if (!subdomainValid || !infoStatusIsValid(account.status)) {
            return reject({ message: 'Invalid body: ' + JSON.stringify(body) });
          }

          return resolve(account);
        });
      });
    }
  }]);

  return PromoClientClass;
}();

exports.default = PromoClientClass;