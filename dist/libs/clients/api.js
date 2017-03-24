'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc Base client for amoCRM accounts
 * @class AmoApiClient
 * @abstract
 */
var AmoApiClient = function () {
  /**
   * @param {RequesterClass} request
   * @param {PromoClientClass} promoClient
   */
  function AmoApiClient(request, promoClient) {
    _classCallCheck(this, AmoApiClient);

    /**
     * @type {RequesterClass}
     * @private
     */
    this._request = request;

    /**
     * @type {PromoClientClass}
     * @private
     */
    this._promo = promoClient;

    /**
     * @type {Object}
     * @protected
     */
    this._pathMatch = {
      'auth': 'private/api/auth.php',
      'account/current': 'private/api/v2/json/accounts/current/'
    };

    /**
     * @type {string|null}
     * @private
     */
    this._url = null;

    /**
     * @type {Object}
     * @private
     */
    this._lastAuthInfo = {};
  }

  /**
   * @description Init new cookies for requests
   * @private
   * @memberOf AmoApiClient
   * @instance
   */


  _createClass(AmoApiClient, [{
    key: '_initCookie',
    value: function _initCookie() {
      /**
       * @type {RequestJar}
       * @private
       */
      this._cookie = this._request.jar();
    }

    /**
     * @description Auth in account
     * @param {string} subdomain
     * @param {string} login
     * @param {string} key
     * @return {Promise}
     * @memberOf AmoApiClient
     * @instance
     * @public
     */

  }, {
    key: 'auth',
    value: function auth(subdomain, login, key) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var authData = subdomain + '_' + login + '_' + key;

        if (_this._lastAuthInfo.authData === authData) {
          return resolve(_this._lastAuthInfo.auth);
        }

        _this._resolveAccountAddress(subdomain).then(function (address) {
          _this._setBaseUrl(address);
          var form = {
            USER_LOGIN: login,
            USER_HASH: key
          };

          _this._initCookie();
          _this._post('auth', form, { type: 'json' }).then(function (auth) {
            _this._lastAuthInfo = { auth: auth, authData: authData };
            resolve(auth);
          }, reject);
        }, reject);
      });
    }

    /**
     * @return {Promise}
     * @memberOf AmoApiClient
     * @instance
     * @public
     */

  }, {
    key: 'current',
    value: function current() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2._get('account/current').then(function (res) {
          if (res.account) {
            resolve(res.account);
          } else {
            reject(res);
          }
        }, reject);
      });
    }

    /**
     * @param {string} subdomain
     * @return {Promise}
     * @private
     * @memberOf AmoApiClient
     * @instance
     */

  }, {
    key: '_resolveAccountAddress',
    value: function _resolveAccountAddress(subdomain) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._promo.getAccountInfoBySubdomain(subdomain).then(function (info) {
          return resolve('https://' + info.account_domain);
        }, reject);
      });
    }

    /**
     * @param {string} address
     * @private
     * @memberOf AmoApiClient
     * @instance
     */

  }, {
    key: '_setBaseUrl',
    value: function _setBaseUrl(address) {
      this._url = address;
    }

    /**
     * @param {string} path
     * @param {function} reject
     * @return {string|null}
     * @private
     * @memberOf AmoApiClient
     * @instance
     */

  }, {
    key: '_buildUrl',
    value: function _buildUrl(path, reject) {
      if (!this._url) {
        return reject({
          message: 'Can\'t resolve path: empty baseUrl',
          baseUrl: this._url,
          path: path,
          allPaths: this._pathMatch
        });
      }

      if (!_underscore2.default.has(this._pathMatch, path)) {
        return reject({
          message: 'Can\'t resolve path: path not found',
          baseUrl: this._url,
          path: path,
          allPaths: this._pathMatch
        });
      }

      return this._url + '/' + this._pathMatch[path];
    }

    /**
     * @description Make GET request to amoCRM API
     * @param {string} path
     * @param {Object} [qs]
     * @return {Promise}
     * @protected
     * @memberOf AmoApiClient
     * @instance
     */

  }, {
    key: '_get',
    value: function _get(path, qs) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var url = _this4._buildUrl(path, reject);
        if (url !== null) {
          _this4._query('get', { url: url, qs: qs }, resolve, reject);
        }
      });
    }

    /**
     * @description Make POST request to amoCRM API
     * @param {string} path
     * @param {Object} form - Post data
     * @param {Object} [qs]
     * @return {Promise}
     * @protected
     * @memberOf AmoApiClient
     * @instance
     */

  }, {
    key: '_post',
    value: function _post(path, form, qs) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        if (!form) {
          return reject({ message: 'Empty form data', form: form });
        }

        if (!_underscore2.default.isObject(form)) {
          return reject({ message: 'Form data must be an Object', form: form });
        }

        var url = _this5._buildUrl(path, reject);
        if (url !== null) {
          _this5._query('post', { url: url, form: form, qs: qs }, resolve, reject);
        }
      });
    }

    /**
     * @description Make GET or POST query to amoCRM API
     * @param {string} type
     * @param {Object} params
     * @param {function} resolve
     * @param {function} reject
     * @private
     * @memberOf AmoApiClient
     * @instance
     */

  }, {
    key: '_query',
    value: function _query(type, params, resolve, reject) {
      params.jar = this._cookie;

      this._request[type](params, function (err, httpResponse, body) {
        var tmp = void 0;

        if (err !== null) {
          return reject(err);
        }

        if (!body) {
          return resolve([]);
        }

        tmp = JSON.parse(body);

        if (!_underscore2.default.isObject(tmp)) {
          return reject({ message: 'Body is not valid json', body: body });
        }

        body = tmp;

        if (body.response) {
          body = body.response;
        }

        resolve(body);
      });
    }
  }]);

  return AmoApiClient;
}();

exports.default = AmoApiClient;