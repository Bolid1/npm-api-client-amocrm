import request from 'request';
import {slowdownTime, RequesterClass} from './requester';

let RequesterMock = request;

RequesterMock.get = RequesterMock.post = (uri, options, callback) => {
  let params = RequesterMock.initParams(uri, options, callback);
  params.callback();
};

const Requester = new RequesterClass(RequesterMock);
const requestsCount = 4;
const timeout = requestsCount * slowdownTime * 2;

it('should await between get requests ' + timeout + 'ms', () => {
  const startTime = +new Date;
  let promises = [];
  let i;

  for (i = 0; i < requestsCount; ++i) {
    promises.push(new Promise((resolve) => {
      Requester.get('https://google.com', resolve);
    }));
  }

  return Promise.all(promises).then(() => {
    const endTime = +new Date;
    // With amended to first was send immediately
    const expectedTime = slowdownTime * (requestsCount - 1);

    expect(endTime - startTime).toBeGreaterThan(expectedTime);
  });
}, timeout);
