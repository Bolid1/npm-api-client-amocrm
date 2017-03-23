const data = require('./dist/amocrm-api');

exports.getPromoClient = data.getPromoClient;
exports.getApiV2Client = data.getApiV2Client;
exports.getApiV3Client = data.default;
exports.default = data.default;
