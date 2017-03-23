import getApiV3Client, {getPromoClient, getApiV2Client} from './amocrm-api';
import PromoClientClass from './libs/clients/promo';
import AmoV2ApiClient from './libs/clients/api-v2';
import AmoV3ApiClient from './libs/clients/api-v3';

it('Should return instanceof PromoClientClass', () => {
  return expect(getPromoClient()).toBeInstanceOf(PromoClientClass);
});

it('Should return instanceof AmoV2ApiClient', () => {
  expect(getApiV2Client()).toBeInstanceOf(AmoV2ApiClient);
});

it('Should return instanceof AmoV3ApiClient', () => {
  expect(getApiV3Client()).toBeInstanceOf(AmoV3ApiClient);
});
