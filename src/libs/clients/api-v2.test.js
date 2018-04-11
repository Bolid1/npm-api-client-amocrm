import _ from 'underscore';
import Requester from '../helpers/requester';
import AmoV2ApiClient from './api-v2';
import PromoClientClass from './promo';
import testConfig from '../../../config/test.js';

const amoApiClient = new AmoV2ApiClient(
    Requester,
    new PromoClientClass(Requester)
);

const subdomain = testConfig.subdomain;
const login = testConfig.login;
const key = testConfig.key;

it('Should work with contacts list', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.listContacts().then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let contact;
    expect(res).toBeInstanceOf(Array);

    contact = _.first(res);
    expect(contact).toBeInstanceOf(Object);
  });
});

it('Should work with companies list', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.listCompanies().then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let company;
    expect(res).toBeInstanceOf(Array);

    company = _.first(res);
    expect(company).toBeInstanceOf(Object);
  });
});

it('Should work with leads list', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.listLeads().then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let lead;
    expect(res).toBeInstanceOf(Array);

    lead = _.first(res);
    expect(lead).toHaveProperty('status_id');
  });
});

it('Should work with tasks list', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.listTasks().then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let task;
    expect(res).toBeInstanceOf(Array);

    task = _.first(res);
    expect(task).toHaveProperty('task_type');
  });
});

it('Should work with notes list', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.listNotes({type: 'contact'}).then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let note;
    expect(res).toBeInstanceOf(Array);

    note = _.first(res);
    expect(note).toHaveProperty('note_type');
  });
});

it('Should work with contacts set', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.setContacts({add: [{name: 'Test'}]}).then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let contact;
    expect(res).toBeInstanceOf(Array);

    contact = _.first(res);
    expect(contact).toBeInstanceOf(Object);
    expect(contact).toHaveProperty('id');
  });
});

it('Should work with companies set', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.setCompanies({add: [{name: 'Test'}]}).then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let company;
    expect(res).toBeInstanceOf(Array);

    company = _.first(res);
    expect(company).toBeInstanceOf(Object);
    expect(company).toHaveProperty('id');
  });
});

it('Should work with leads set', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.setLeads({add: [{name: 'Test', contacts_id: 3780695}]}).
          then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let lead;
    expect(res).toBeInstanceOf(Array);

    lead = _.first(res);
    expect(lead).toHaveProperty('id');
  });
});

it('Should work with contacts add', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.addContacts([{name: 'Test'}]).then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let contact;
    expect(res).toBeInstanceOf(Array);

    contact = _.first(res);
    expect(contact).toBeInstanceOf(Object);
    expect(contact).toHaveProperty('id');
  });
});

it('Should work with companies add', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.addCompanies([{name: 'Test'}]).then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let company;
    expect(res).toBeInstanceOf(Array);

    company = _.first(res);
    expect(company).toBeInstanceOf(Object);
    expect(company).toHaveProperty('id');
  });
});

it('Should work with leads add', () => {
  const promise = new Promise((resolve, reject) => {
    amoApiClient.auth(subdomain, login, key).then(() => {
      amoApiClient.addLeads([{name: 'Test'}]).then(resolve, reject);
    }, reject);
  });

  return promise.then((res) => {
    let lead;
    expect(res).toBeInstanceOf(Array);

    lead = _.first(res);
    expect(lead).toHaveProperty('id');
  });
});
