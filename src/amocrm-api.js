import request from 'request';
import PromoClientClass from './libs/clients/promo';
import AmoV2ApiClient from './libs/clients/api-v2';
import AmoV3ApiClient from './libs/clients/api-v3';

/**
 * @description Return API client for amoCRM promo site
 * @return {PromoClientClass}
 */
export function getPromoClient() {
  return new PromoClientClass(request);
}

/**
 * @description Return API client for amoCRM account v2
 * @return {AmoV2ApiClient}
 */
export function getApiV2Client() {
  return new AmoV2ApiClient(request, getPromoClient());
}

/**
 * @description Return API client for amoCRM account v3
 * @return {AmoV3ApiClient}
 */
export default function getApiV3Client() {
  return new AmoV3ApiClient(request, getPromoClient());
}
