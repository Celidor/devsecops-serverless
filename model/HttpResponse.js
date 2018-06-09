'use strict';

module.exports = class HttpResponse {
  constructor(statusCode, body, headers) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
    this.headers = headers;
  }
};