'use strict';

const co           = require('co'),
      Promise      = require('bluebird'),
      AWS          = require('aws-sdk'),
      dynamo       = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient()),
      User         = require('../../model/User'),
      HttpResponse = require('../../model/HttpResponse');

const userTable = process.env.USER_TABLE;

module.exports.handle = (event, context, callback) => {
  co(function*(){
    console.log('received event', event);
    return yield createUser(event, context);
  }).then(result => {
    console.log('completed', result);
    callback(null, new HttpResponse(200, result));
  }).catch(e => {
    console.error('Error', e);
    callback(null, new HttpResponse(500, 'Oops!'));
  });
};

function* createUser(event, context) {
  let body = JSON.parse(event.body);
  let user = new User(body.username, body.firstName, body.lastName, body.gender);
  let params = {
    TableName: userTable,
    Item: user
  };
  yield dynamo.putAsync(params);

  return { id: user.id };
}