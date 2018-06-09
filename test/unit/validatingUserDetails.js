'use strict';

const User   = require('../../model/User'),
      should = require('chai').should();

describe('Validating user details', () => {

  it('should create a valid user', () => {
    let user = new User('bobx', 'bob', 'x', 'm');
    user.should.deep.equal({
      id: user.id,
      username: 'bobx',
      firstName: 'bob',
      lastName: 'x',
      gender: 'm'
    });
  });

  it('must specify username', () => {
    should.Throw( () => new User(null, 'bob', 'x', 'm'));
  });
});