amoCRM API Client
=======

An API client for amoCRM

Installation
----------------------

Supports Node.js 4.0.0 and later. You can install amoApiClient in your project's
`node_modules` folder, or you can install it globally.

To install the latest version available on NPM:

    npm install npm-api-client-amocrm

To install the latest development version:

    npm install git+https://github.com/Bolid1/npm-api-client-amocrm.git

Available methods and entities
----------------------
For contacts, leads, companies, tasks and notes available add, list, update and set methods.
Also available method auth to auth in account and method current to get info about current account.

Quick start
----------------------
```javascript
const amoClients = require('npm-api-client-amocrm');
const amoClient = amoClients.default();
const subdomain = 'test';
const login = 'test@test.test';
const key = 'test';

amoClient.auth(subdomain, login, key).then(function (res) {
  console.log('auth res: ', res);
  if (res.auth === true) {
    amoClient.addLeads([{name: 'Test'}]).then(function (leadsIds) {
      console.log('leadsIds: ', leadsIds);
      if (leadsIds[0] && leadsIds[0].id) {
        amoClient.listLeads({id: id}).then(function (leads) {
          console.log('lead: ', leads[0]);
        });
      }
    });
  }
});
```
Available methods and entities
----------------------
To know more go to

* [amoCRM home page](https://www.amocrm.ru)
* [API Reference](https://developers.amocrm.ru/)
