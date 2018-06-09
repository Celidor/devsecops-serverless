'use strict';

const Promise = require('bluebird');

module.exports = function invoke(event, handler) {
  let callback;
  let promise = new Promise(function (resolve, reject) {
    callback = (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    };
  });
  handler(event, null, callback);

  return promise;
};