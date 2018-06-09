'use strict';

const AWS     = require('aws-sdk'),
      Promise = require('bluebird'),
      dynamo  = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient());

const userTable = process.env.USER_TABLE;

//Note: If you have an api to fetch user details then it would be preferrable to
//use this instead of going to the database
function* the_user_exists(id) {
  let params = {
    TableName: userTable,
    Key: {
      id: id
    },
    ConsistentRead: true,
  };

  let result = yield dynamo.getAsync(params);

  return result.Item;
}

function* the_user_is_deleted(id) {
  let params = {
    TableName : userTable,
    Key: {
      id: id,
    }
  };

  try {
    yield dynamo.deleteAsync(params);
  } catch (e) {
    if(e.code !== 'ResourceNotFoundException') {
      throw e;
    }
  }
}

module.exports = {
  the_user_exists,
  the_user_is_deleted
};