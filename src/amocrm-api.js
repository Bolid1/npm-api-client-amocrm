import Requester from './libs/helpers/requester';
import PromoClientClass from './libs/clients/promo';
import AmoV2ApiClient from './libs/clients/api-v2';
import AmoV3ApiClient from './libs/clients/api-v3';

/**
 * @description Return API client for amoCRM promo site
 * @return {PromoClientClass}
 */
function getPromoClient() {
  return new PromoClientClass(Requester);
}

/**
 * @description Return API client for amoCRM account v2
 * @return {AmoV2ApiClient}
 */
function getApiV2Client() {
  return new AmoV2ApiClient(Requester, getPromoClient());
}

/**
 * @description Return API client for amoCRM account v3
 * @return {AmoV3ApiClient}
 */
function getApiV3Client() {
  return new AmoV3ApiClient(Requester, getPromoClient());
}

export {getApiV2Client, getPromoClient};
export default getApiV3Client;
