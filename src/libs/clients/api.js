import _ from 'underscore';

/**
 * @classdesc Base client for amoCRM accounts
 * @abstract
 */
class AmoApiClient {
  /**
   * @param {RequesterClass} request
   * @param {PromoClientClass} promoClient
   */
  constructor(request, promoClient) {
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
      'account/current': 'private/api/v2/json/accounts/current/',
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
  _initCookie() {
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
  auth(subdomain, login, key) {
    return new Promise((resolve, reject) => {
      const authData = `${subdomain}_${login}_${key}`;

      if (this._lastAuthInfo.authData === authData) {
        return resolve(this._lastAuthInfo.auth);
      }

      this._resolveAccountAddress(subdomain).then((address) => {
        this._setBaseUrl(address);
        let form = {
          USER_LOGIN: login,
          USER_HASH: key,
        };

        this._initCookie();
        this._post('auth', form, {type: 'json'}).then((auth) => {
            this._lastAuthInfo = {auth, authData};
            resolve(auth);
          },
          reject
        );
      }, reject);
    });
  }

  /**
   * @return {Promise}
   * @memberOf AmoApiClient
   * @instance
   * @public
   */
  current() {
    return new Promise((resolve, reject) => {
      this._get('account/current').then((res) => {
          if (res.account) {
            resolve(res.account);
          } else {
            reject(res);
          }
        },
        reject
      );
    });
  }

  /**
   * @param {string} subdomain
   * @return {Promise}
   * @private
   * @memberOf AmoApiClient
   * @instance
   */
  _resolveAccountAddress(subdomain) {
    return new Promise((resolve, reject) => {
      this._promo.getAccountInfoBySubdomain(subdomain).then(
        (info) => resolve(`https://${info.account_domain}`),
        reject
      );
    });
  }

  /**
   * @param {string} address
   * @private
   * @memberOf AmoApiClient
   * @instance
   */
  _setBaseUrl(address) {
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
  _buildUrl(path, reject) {
    if (!this._url) {
      return reject({
        message: 'Can\'t resolve path: empty baseUrl',
        baseUrl: this._url,
        path: path,
        allPaths: this._pathMatch,
      });
    }

    if (!_.has(this._pathMatch, path)) {
      return reject({
        message: 'Can\'t resolve path: path not found',
        baseUrl: this._url,
        path: path,
        allPaths: this._pathMatch,
      });
    }

    return `${this._url}/${this._pathMatch[path]}`;
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
  _get(path, qs) {
    return new Promise((resolve, reject) => {
      const url = this._buildUrl(path, reject);
      if (url !== null) {
        this._query('get', {url, qs}, resolve, reject);
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
  _post(path, form, qs) {
    return new Promise((resolve, reject) => {
      if (!form) {
        return reject({message: 'Empty form data', form: form});
      }

      if (!_.isObject(form)) {
        return reject({message: 'Form data must be an Object', form: form});
      }

      const url = this._buildUrl(path, reject);
      if (url !== null) {
        this._query('post', {url, form, qs}, resolve, reject);
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
  _query(type, params, resolve, reject) {
    params.jar = this._cookie;

    this._request[type](params, (err, httpResponse, body) => {
      let tmp;

      if (err !== null) {
        return reject(err);
      }

      if (!body) {
        return resolve([]);
      }

      tmp = JSON.parse(body);

      if (!_.isObject(tmp)) {
        return reject({message: 'Body is not valid json', body});
      }

      body = tmp;

      if (body.response) {
        body = body.response;
      }

      resolve(body);
    });
  }
}

export default AmoApiClient;
