import Requester from '../helpers/requester';
import AmoApiClient from './api';
import PromoClientClass from './promo';
import testConfig from '../../../config/test.js';

const amoApiClient = new AmoApiClient(
  Requester,
  new PromoClientClass(Requester)
);

const subdomain = testConfig.subdomain;
const login = testConfig.login;
const key = testConfig.key;

it('Should auth in test account', () => {
  const promise = amoApiClient.auth(subdomain, login, key);

  return promise.then((res) => {
    expect(res).toBeInstanceOf(Object);
    expect(res).toMatchObject({
      accounts: expect.any(Array),
      auth: expect.any(Boolean),
      server_time: expect.any(Number),
      user: expect.any(Object),
    });

    expect(res.auth).toBe(true);
    expect(res.accounts.length).toBe(1);
  });
});

it('Should save auth in test account', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.current().then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    expect(res).toBeInstanceOf(Object);

    expect(res.subdomain).toEqual(subdomain);
  });
});

it('Should fail auth in test account', () => {
  const promise = amoApiClient.auth(subdomain, login, 'test');

  return promise.then((res) => {
    expect(res).toBeInstanceOf(Object);
    expect(res).toMatchObject({
      auth: expect.any(Boolean),
      server_time: expect.any(Number),
    });

    expect(res.auth).toBe(false);
  });
});
