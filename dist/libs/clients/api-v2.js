'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @classdesc Client for api v2 of amoCRM
 */
var AmoV2ApiClient = function (_AmoApiClient) {
  _inherits(AmoV2ApiClient, _AmoApiClient);

  /**
   * @param {RequesterClass} request
   * @param {PromoClientClass} promoClient
   */
  function AmoV2ApiClient(request, promoClient) {
    _classCallCheck(this, AmoV2ApiClient);

    var _this = _possibleConstructorReturn(this, (AmoV2ApiClient.__proto__ || Object.getPrototypeOf(AmoV2ApiClient)).call(this, request, promoClient));

    var elementsPaths = {
      'companies/list': 'private/api/v2/json/companies/list/',
      'companies/set': 'private/api/v2/json/company/set/'
    };

    _underscore2.default.each(['contacts', 'leads', 'tasks', 'notes'], function (entity) {
      elementsPaths[entity + '/list'] = 'private/api/v2/json/' + entity + '/list/';
      elementsPaths[entity + '/set'] = 'private/api/v2/json/' + entity + '/set/';
    });

    _underscore2.default.extend(_this._pathMatch, elementsPaths);

    _underscore2.default.each(_underscore2.default.keys(elementsPaths), function (path) {
      var entity = void 0;
      var method = void 0;
      var entityCamel = void 0;

      var _path$split = path.split('/');

      var _path$split2 = _slicedToArray(_path$split, 2);

      entity = _path$split2[0];
      method = _path$split2[1];

      entityCamel = entity.substr(0, 1).toUpperCase() + entity.substr(1);

      switch (method) {
        case 'list':
          _this['' + method + entityCamel] = _this._buildListMethod(entity);
          break;
        case 'set':
          _this['' + method + entityCamel] = _this._buildSetMethod(entity);
          _this['add' + entityCamel] = _this._buildAddMethod(entity);
          _this['update' + entityCamel] = _this._buildUpdateMethod(entity);
          break;
      }
    }, _this);
    return _this;
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


  _createClass(AmoV2ApiClient, [{
    key: '_buildListMethod',
    value: function _buildListMethod(entity) {
      var _this2 = this;

      return function (qs) {
        return new Promise(function (resolve, reject) {
          _this2._get(entity + '/list', qs).then(function (res) {
            if (res[entity]) {
              resolve(res[entity]);
            } else {
              reject(res);
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

  }, {
    key: '_buildSetMethod',
    value: function _buildSetMethod(entity) {
      var _this3 = this;

      return function (data, qs) {
        return new Promise(function (resolve, reject) {
          var form = { request: {} };
          form.request[entity] = data;

          _this3._post(entity + '/set', form, qs).then(function (res) {
            if (res[entity]) {
              resolve(res[entity]);
            } else {
              reject(res);
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

  }, {
    key: '_buildAddMethod',
    value: function _buildAddMethod(entity) {
      var _this4 = this;

      return function (elements) {
        var entityCamel = entity.substr(0, 1).toUpperCase() + entity.substr(1);
        var form = {};
        form['add'] = elements;

        return new Promise(function (resolve, reject) {
          _this4['set' + entityCamel](form).then(function (resp) {
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

  }, {
    key: '_buildUpdateMethod',
    value: function _buildUpdateMethod(entity) {
      var _this5 = this;

      return function (elements) {
        var entityCamel = entity.substr(0, 1).toUpperCase() + entity.substr(1);
        var form = {};
        form['update'] = elements;

        return new Promise(function (resolve, reject) {
          _this5['set' + entityCamel](form).then(function (resp) {
            if (resp.update) {
              resolve(resp.update);
            } else {
              reject(resp);
            }
          }, reject);
        });
      };
    }
  }]);

  return AmoV2ApiClient;
}(_api2.default);

exports.default = AmoV2ApiClient;