import _ from 'underscore';

/**
 * Enum for account statuses.
 * @readonly
 * @enum {string}
 */
export const ACCOUNT_INFO_STATUSES = {
  free: 'free',
  active: 'active',
};

/**
 * Enum for account statuses.
 * @readonly
 * @enum {string}
 */
export const ACCOUNT_INFO_TOP_DOMAIN = {
  ru: 'ru',
  en: 'en',
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
const infoStatusIsValid = (status) => {
  let statusValid = typeof status === 'string';
  return statusValid && typeof ACCOUNT_INFO_STATUSES[status] !== 'undefined';
};

/**
 * @classdesc Client for promo site
 */
class PromoClientClass {
  /**
   * @param {RequesterClass} request
   */
  constructor(request) {
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
  getAccountInfoBySubdomain(subdomain) {
    return new Promise((resolve, reject) => {
      const url = 'https://www.amocrm.ru/api/accounts/domains/';
      const form = {domains: [subdomain]};
      this._request.post({url, form}, (err, httpResponse, body) => {
        /**
         * @type {AccountInfoFromPromo}
         */
        let account;

        if (err !== null) {
          return reject(err);
        }

        body = JSON.parse(body);

        if (_.isObject(body) && typeof body.error === 'string') {
          return reject({message: body.error});
        }

        if (!_.isArray(body)) {
          return reject({message: 'Invalid body type', body});
        }

        account = _.first(_.toArray(body));

        if (!_.isObject(account)) {
          return reject({message: 'Invalid body first element', body});
        }

        let subdomainValid = typeof account.subdomain !== 'undefined';
        subdomainValid = subdomainValid && account.subdomain === subdomain;

        if (!subdomainValid || !infoStatusIsValid(account.status)) {
          return reject({message: 'Invalid body: ' + JSON.stringify(body)});
        }

        return resolve(account);
      });
    });
  }
}

export default PromoClientClass;
