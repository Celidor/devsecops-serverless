'use strict';

const chance = new require('chance')();

module.exports = class User {
  constructor(username, firstName, lastName, gender) {
    this.id = chance.guid();

    this.username = username;
    if(!this.username) {
      throw new Error('You must provide a username');
    }

    if(gender) {
      this.gender = gender = gender.trim().toLowerCase();
    }
    if(this.gender !== 'm' && this.gender !== 'f') {
      throw new Error('Gender must be m or f');
    }

    this.firstName = firstName;
    this.lastName = lastName;
  }
};