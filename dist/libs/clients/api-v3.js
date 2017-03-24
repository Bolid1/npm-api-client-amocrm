'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _apiV = require('./api-v2');

var _apiV2 = _interopRequireDefault(_apiV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @classdesc Client for api v2 of amoCRM
 * @class AmoV3ApiClient
 */
var AmoV3ApiClient = function (_AmoV2ApiClient) {
  _inherits(AmoV3ApiClient, _AmoV2ApiClient);

  /**
   * @param {RequesterClass} request
   * @param {PromoClientClass} promoClient
   */
  function AmoV3ApiClient(request, promoClient) {
    _classCallCheck(this, AmoV3ApiClient);

    var _this = _possibleConstructorReturn(this, (AmoV3ApiClient.__proto__ || Object.getPrototypeOf(AmoV3ApiClient)).call(this, request, promoClient));

    var v3Elements = {
      customers: 'Customers',
      transactions: 'Transactions',
      catalogs: 'Catalogs',
      catalog_elements: 'CatalogElements'
    };
    var elementsPaths = {};

    _underscore2.default.each(v3Elements, function (entityCamel, entity) {
      var pagination = entity !== 'catalogs';
      elementsPaths[entity + '/list'] = 'private/api/v2/json/' + entity + '/list/';
      elementsPaths[entity + '/set'] = 'private/api/v2/json/' + entity + '/set/';

      _this['list' + entityCamel] = _this._buildListMethod(entity, pagination);
      _this['set' + entityCamel] = _this._buildSetMethod(entity);
      _this['add' + entityCamel] = _this._buildAddMethod(entity, true);
      _this['update' + entityCamel] = _this._buildUpdateMethod(entity, true);
      _this['delete' + entityCamel] = _this._buildDeleteMethod(entity, true);
    }, _this);

    // noinspection JSAccessibilityCheck
    _underscore2.default.extend(_this._pathMatch, elementsPaths);
    return _this;
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


  _createClass(AmoV3ApiClient, [{
    key: '_buildDeleteMethod',
    value: function _buildDeleteMethod(entity, checkErrors) {
      return this._buildActionMethod('add', entity, checkErrors);
    }
  }]);

  return AmoV3ApiClient;
}(_apiV2.default);

exports.default = AmoV3ApiClient;