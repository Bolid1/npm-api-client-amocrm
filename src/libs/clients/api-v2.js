import _ from 'underscore';
import AmoApiClient from './api';

/**
 * @classdesc Client for api v2 of amoCRM
 * @class AmoV2ApiClient
 */
export default class AmoV2ApiClient extends AmoApiClient {
  /**
   * @param {RequesterClass} request
   * @param {PromoClientClass} promoClient
   */
  constructor(request, promoClient) {
    super(request, promoClient);
    let elementsPaths = {
      'companies/list': 'private/api/v2/json/companies/list/',
      'companies/set': 'private/api/v2/json/company/set/',
    };

    _.each(['contacts', 'leads', 'tasks', 'notes'], (entity) => {
      elementsPaths[`${entity}/list`] = `private/api/v2/json/${entity}/list/`;
      elementsPaths[`${entity}/set`] = `private/api/v2/json/${entity}/set/`;
    });

    // noinspection JSAccessibilityCheck
    _.extend(this._pathMatch, elementsPaths);

    _.each(_.keys(elementsPaths), (path) => {
      let entity;
      let method;
      let entityCamel;

      [entity, method] = path.split('/');
      entityCamel = entity.substr(0, 1).toUpperCase() + entity.substr(1);

      switch (method) {
        case 'list':
          this[`${method}${entityCamel}`] = this._buildListMethod(entity);
          break;
        case 'set':
          this[`${method}${entityCamel}`] = this._buildSetMethod(entity);
          this[`add${entityCamel}`] = this._buildAddMethod(entity);
          this[`update${entityCamel}`] = this._buildUpdateMethod(entity);
          break;
      }
    }, this);
  }

  /**
   * @description Get list of companies
   * @method listCompanies
   * @memberOf AmoV2ApiClient
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @description Add companies
   * @method addCompanies
   * @memberOf AmoV2ApiClient
   * @param {Array} companies
   * @return {Promise}
   */

  /**
   * @description Update companies
   * @method updateCompanies
   * @memberOf AmoV2ApiClient
   * @param {Array} companies
   * @return {Promise}
   */

  /**
   * @description Execute set method of companies
   * @method setCompanies
   * @memberOf AmoV2ApiClient
   * @param {Object} data
   * @param {Array} [data.add]
   * @param {Array} [data.update]
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @description Get list of contacts
   * @method listContacts
   * @memberOf AmoV2ApiClient
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @description Add contacts
   * @method addContacts
   * @memberOf AmoV2ApiClient
   * @param {Array} contacts
   * @return {Promise}
   */

  /**
   * @description Update contacts
   * @method updateContacts
   * @memberOf AmoV2ApiClient
   * @param {Array} contacts
   * @return {Promise}
   */

  /**
   * @description Execute set method of contacts
   * @method setContacts
   * @memberOf AmoV2ApiClient
   * @param {Object} data
   * @param {Array} [data.add]
   * @param {Array} [data.update]
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @description Get list of leads
   * @method listLeads
   * @memberOf AmoV2ApiClient
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @description Add leads
   * @method addLeads
   * @memberOf AmoV2ApiClient
   * @param {Array} leads
   * @return {Promise}
   */

  /**
   * @description Update leads
   * @method updateLeads
   * @memberOf AmoV2ApiClient
   * @param {Array} leads
   * @return {Promise}
   */

  /**
   * @description Execute set method of leads
   * @method setLeads
   * @memberOf AmoV2ApiClient
   * @param {Object} data
   * @param {Array} [data.add]
   * @param {Array} [data.update]
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @description Get list of tasks
   * @method listTasks
   * @memberOf AmoV2ApiClient
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @description Add tasks
   * @method addTasks
   * @memberOf AmoV2ApiClient
   * @param {Array} tasks
   * @return {Promise}
   */

  /**
   * @description Update tasks
   * @method updateTasks
   * @memberOf AmoV2ApiClient
   * @param {Array} tasks
   * @return {Promise}
   */

  /**
   * @description Execute set method of tasks
   * @method setTasks
   * @memberOf AmoV2ApiClient
   * @param {Object} data
   * @param {Array} [data.add]
   * @param {Array} [data.update]
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @description Get list of notes
   * @method listNotes
   * @memberOf AmoV2ApiClient
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @description Add notes
   * @method addNotes
   * @memberOf AmoV2ApiClient
   * @param {Array} notes
   * @return {Promise}
   */

  /**
   * @description Update notes
   * @method updateNotes
   * @memberOf AmoV2ApiClient
   * @param {Array} notes
   * @return {Promise}
   */

  /**
   * @description Execute set method of notes
   * @method setNotes
   * @memberOf AmoV2ApiClient
   * @param {Object} data
   * @param {Array} [data.add]
   * @param {Array} [data.update]
   * @param {Object} qs
   * @return {Promise}
   */

  /**
   * @param {string} entity
   * @return {function(*)}
   * @protected
   * @memberOf AmoV2ApiClient
   */
  _buildListMethod(entity) {
    return (qs) => {
      return new Promise((resolve, reject) => {
        this._get(`${entity}/list`, qs).then((res) => {
            if (res[entity]) {
              resolve(res[entity]);
            } else {
              reject(res);
            }
          },
          reject
        );
      });
    };
  }

  /**
   * @param {string} entity
   * @return {function(*)}
   * @protected
   * @memberOf AmoV2ApiClient
   */
  _buildSetMethod(entity) {
    return (data, qs) => {
      return new Promise((resolve, reject) => {
        let form = {request: {}};
        form.request[entity] = data;

        this._post(`${entity}/set`, form, qs).then((res) => {
            if (res[entity]) {
              resolve(res[entity]);
            } else {
              reject(res);
            }
          },
          reject
        );
      });
    };
  }

  /**
   * @param {string} entity
   * @return {function(*)}
   * @protected
   * @memberOf AmoV2ApiClient
   */
  _buildAddMethod(entity) {
    return (elements) => {
      let entityCamel = entity.substr(0, 1).toUpperCase() + entity.substr(1);
      let form = {};
      form['add'] = elements;

      return new Promise((resolve, reject) => {
        this[`set${entityCamel}`](form).then((resp) => {
          if (resp.add) {
            resolve(resp.add);
          } else {
            reject(resp);
          }
        }, reject);
      });
    };
  }

  /**
   * @param {string} entity
   * @return {function(*)}
   * @protected
   * @memberOf AmoV2ApiClient
   */
  _buildUpdateMethod(entity) {
    return (elements) => {
      let entityCamel = entity.substr(0, 1).toUpperCase() + entity.substr(1);
      let form = {};
      form['update'] = elements;

      return new Promise((resolve, reject) => {
        this[`set${entityCamel}`](form).then((resp) => {
          if (resp.update) {
            resolve(resp.update);
          } else {
            reject(resp);
          }
        }, reject);
      });
    };
  }
}
