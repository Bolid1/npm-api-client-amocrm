'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequesterClass = exports.slowdownTime = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var slowdownTime = exports.slowdownTime = 1000;

/**
 * @classdesc Request client for amoCRM
 */

var RequesterClass = exports.RequesterClass = function () {
  /**
   * @constructor
   * @param {request} request
   * @param {Object} [params]
   * @param {number} [params.slowdownTime]
   */
  function RequesterClass(request, params) {
    _classCallCheck(this, RequesterClass);

    params || (params = {});

    /**
     * @type {request}
     * @private
     */
    this._request = request;

    /**
     * @type {number}
     * @private
     */
    this._lastRequestAt = 0;

    /**
     * @type {number}
     * @private
     */
    this._slowdownTime = slowdownTime;
    if (typeof params.slowdownTime !== 'undefined') {
      this._slowdownTime = params.slowdownTime;
    }

    this._queueCount = 0;
  }

  /**
   * @private
   */


  _createClass(RequesterClass, [{
    key: '_markRequestTime',
    value: function _markRequestTime() {
      this._lastRequestAt = +new Date();
    }

    /**
     * @return {number}
     * @private
     */

  }, {
    key: '_getTimeFromLastRequest',
    value: function _getTimeFromLastRequest() {
      return +new Date() - this._lastRequestAt;
    }

    /**
     * @description Proxy method for defaults
     * @param {Object} params
     * @return {RequesterClass}
     */

    /**
     * @description Make cookie handler
     * @param {*} [store]
     * @return {RequestJar}
     */

  }, {
    key: 'jar',
    value: function jar(store) {
      return this._request.jar(store);
    }

    /**
     * @param {string|Object} uri
     * @param {Object|function} options
     * @param {function} [callback]
     */

  }, {
    key: 'get',
    value: function get(uri, options, callback) {
      this._makeRequest('get', uri, options, callback);
    }

    /**
     * @param {string|Object} uri
     * @param {Object|function} options
     * @param {function} [callback]
     */

  }, {
    key: 'post',
    value: function post(uri, options, callback) {
      this._makeRequest('post', uri, options, callback);
    }

    /**
     * @param {string} type
     * @param {string} uri
     * @param {Object} options
     * @param {function} callback
     */

  }, {
    key: '_makeRequest',
    value: function _makeRequest(type, uri, options, callback) {
      var timeFromLastRequest = this._getTimeFromLastRequest();
      var delay = void 0;

      this._start = this._start || +new Date();

      if (timeFromLastRequest < this._slowdownTime) {
        ++this._queueCount;

        delay = this._queueCount * this._slowdownTime;
        delay += timeFromLastRequest + this._queueCount * 10;

        _underscore2.default.delay(_underscore2.default.bind(this[type], this, uri, options, callback), delay);
        return;
      }

      this._markRequestTime();

      if (this._queueCount > 0) {
        --this._queueCount;
      }

      this._request[type](uri, options, callback);
    }
  }]);

  return RequesterClass;
}();

exports.default = new RequesterClass(_request2.default);