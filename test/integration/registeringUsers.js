'use strict';

require('../env').init();

const co     = require('co'),
      chance = new require('chance')(),
      when   = require('../steps/when'),
      then   = require('../steps/then'),
      should = require('chai').should();

describe('Registering a valid user', () => {
  let request;
  let result;
  let user;
  before(co.wrap(function* () {
    request = {
      username: chance.word(),
      firstName: chance.first({ gender: 'male' }),
      lastName: chance.last(),
      gender: 'm'
    };
    result = yield when.a_user_is_registered(request);

    user = yield then.the_user_exists(result.id);
  }));

  it('should return the user id', () => {
    should.exist(result.id);
  });

  it('should save the user', () => {
    should.exist(user);
  });

  it('should save the username', () => {
    user.username.should.equal(request.username);
  });

  it('should save the firstName', () => {
    user.firstName.should.equal(request.firstName);
  });

  it('should save the lastName', () => {
    user.lastName.should.equal(request.lastName);
  });

  it('should save the gender', () => {
    user.gender.should.equal(request.gender);
  });

  after(co.wrap(function* () {
    yield then.the_user_is_deleted(result.id);
  }));
});