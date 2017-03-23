import request from 'request';
import PromoClientClass from './promo';
import testConfig from '../../../config/test.js';
const promoClient = new PromoClientClass(request);

it('Should resolve valid info for ' + testConfig.subdomain, () => {
  const promise = promoClient.getAccountInfoBySubdomain(testConfig.subdomain);
  const expected = {
    status: 'active',
    subdomain: testConfig.subdomain,
    base_domain: 'amocrm.ru',
    account_domain: testConfig.subdomain + '.amocrm.ru',
    account_type: 'ru',
    top_domain: 'ru',
  };

  return promise.then((account) => expect(account).toEqual(expected));
});

it('Should reject for empty subdomain', () => {
  const promise = promoClient.getAccountInfoBySubdomain('');
  const expected = {message: 'Domain must be string value with length > 0'};

  return promise.catch((err) => expect(err).toEqual(expected));
});

it('Should reject for numeric subdomain', () => {
  const promise = promoClient.getAccountInfoBySubdomain('123456');
  const expected = {message: 'Domain must be string value with length > 0'};

  return promise.catch((err) => expect(err).toEqual(expected));
});
