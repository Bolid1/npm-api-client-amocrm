import request from 'request';
import _ from 'underscore';

export const slowdownTime = 1000;

/**
 * @classdesc Request client for amoCRM
 */
export class RequesterClass {
  /**
   * @constructor
   * @param {request} request
   * @param {Object} [params]
   * @param {number} [params.slowdownTime]
   */
  constructor(request, params) {
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
  _markRequestTime() {
    this._lastRequestAt = +new Date;
  }

  /**
   * @return {number}
   * @private
   */
  _getTimeFromLastRequest() {
    return (+new Date - this._lastRequestAt);
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
  jar(store) {
    return this._request.jar(store);
  }

  /**
   * @param {string|Object} uri
   * @param {Object|function} options
   * @param {function} [callback]
   */
  get(uri, options, callback) {
    this._makeRequest('get', uri, options, callback);
  }

  /**
   * @param {string|Object} uri
   * @param {Object|function} options
   * @param {function} [callback]
   */
  post(uri, options, callback) {
    this._makeRequest('post', uri, options, callback);
  }

  /**
   * @param {string} type
   * @param {string} uri
   * @param {Object} options
   * @param {function} callback
   */
  _makeRequest(type, uri, options, callback) {
    let timeFromLastRequest = this._getTimeFromLastRequest();
    let delay;

    this._start = this._start || +new Date;

    if (timeFromLastRequest < this._slowdownTime) {
      ++this._queueCount;

      delay = this._queueCount * this._slowdownTime;
      delay += timeFromLastRequest + this._queueCount * 10;

      _.delay(
        _.bind(this[type], this, uri, options, callback),
        delay
      );
      return;
    }

    this._markRequestTime();

    if (this._queueCount > 0) {
      --this._queueCount;
    }

    this._request[type](uri, options, callback);
  }
}

export default new RequesterClass(request);
