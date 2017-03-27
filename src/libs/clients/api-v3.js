import _ from 'underscore';
import AmoV2ApiClient from './api-v2';

/**
 * @classdesc Client for api v3 of amoCRM
 * @extends AmoV2ApiClient
 */
class AmoV3ApiClient extends AmoV2ApiClient {
  /**
   * @param {RequesterClass} request
   * @param {PromoClientClass} promoClient
   */
  constructor(request, promoClient) {
    super(request, promoClient);
    const v3Elements = {
      customers: 'Customers',
      transactions: 'Transactions',
      catalogs: 'Catalogs',
      catalog_elements: 'CatalogElements',
    };
    let elementsPaths = {};

    _.each(v3Elements, (entityCamel, entity) => {
      let pagination = entity !== 'catalogs';
      elementsPaths[`${entity}/list`] = `private/api/v2/json/${entity}/list/`;
      elementsPaths[`${entity}/set`] = `private/api/v2/json/${entity}/set/`;

      this[`list${entityCamel}`] = this._buildListMethod(entity, pagination);
      this[`set${entityCamel}`] = this._buildSetMethod(entity);
      this[`add${entityCamel}`] = this._buildAddMethod(entity, true);
      this[`update${entityCamel}`] = this._buildUpdateMethod(entity, true);
      this[`delete${entityCamel}`] = this._buildDeleteMethod(entity, true);
    }, this);

    // noinspection JSAccessibilityCheck
    _.extend(this._pathMatch, elementsPaths);
  }

  /**
   * @description Get list of customers
   * @method listCustomers
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Object} [qs]
   * @param {boolean} [withPagination]
   * @return {Promise}
   */

  /**
   * @description Add customers
   * @method addCustomers
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array} customers
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Update customers
   * @method updateCustomers
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array} customers
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Execute set method of customers
   * @method setCustomers
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Object} data
   * @param {Array} [data.add]
   * @param {Array} [data.update]
   * @param {Object} [qs]
   * @return {Promise}
   */

  /**
   * @description Execute delete method of customers
   * @method deleteCustomers
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array.<Number>} ids
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Get list of transactions
   * @method listTransactions
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Object} [qs]
   * @param {boolean} [withPagination]
   * @return {Promise}
   */

  /**
   * @description Add transactions
   * @method addTransactions
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array} transactions
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Update transactions
   * @method updateTransactions
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array} transactions
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Execute set method of transactions
   * @method setTransactions
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Object} data
   * @param {Array} [data.add]
   * @param {Array} [data.update]
   * @param {Object} [qs]
   * @return {Promise}
   */

  /**
   * @description Execute delete method of transactions
   * @method deleteTransactions
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array.<Number>} ids
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Get list of catalogs
   * @method listCatalogs
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Object} [qs]
   * @return {Promise}
   */

  /**
   * @description Add catalogs
   * @method addCatalogs
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array} catalogs
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Update catalogs
   * @method updateCatalogs
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array} catalogs
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Execute set method of catalogs
   * @method setCatalogs
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Object} data
   * @param {Array} [data.add]
   * @param {Array} [data.update]
   * @param {Object} [qs]
   * @return {Promise}
   */

  /**
   * @description Execute delete method of catalogs
   * @method deleteCatalogs
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array.<Number>} ids
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Get list of catalog elements
   * @method listCatalogElements
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Object} [qs]
   * @param {boolean} [withPagination]
   * @return {Promise}
   */

  /**
   * @description Add catalog elements
   * @method addCatalogElements
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array} catalog elements
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Update catalog elements
   * @method updateCatalogElements
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array} catalog elements
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @description Execute set method of catalog elements
   * @method setCatalogElements
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Object} data
   * @param {Array} [data.add]
   * @param {Array} [data.update]
   * @param {Object} [qs]
   * @return {Promise}
   */

  /**
   * @description Execute delete method of catalog elements
   * @method deleteCatalogElements
   * @memberOf AmoV3ApiClient
   * @instance
   * @public
   * @param {Array.<Number>} ids
   * @param {boolean} [keepErrorsInResponse]
   * @return {Promise}
   */

  /**
   * @param {string} entity
   * @param {boolean} [checkErrors]
   * @return {function(*)}
   * @protected
   * @instance
   * @memberOf AmoV3ApiClient
   */
  _buildDeleteMethod(entity, checkErrors) {
    return this._buildActionMethod('add', entity, checkErrors);
  }
}

export default AmoV3ApiClient;
