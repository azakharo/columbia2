/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');
var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var cow = require('../api/thing/cow');

// Create cows
Thing.find({}).remove(function() {

  let animals = _.times(7, cow.createRandomAnimal);

  _.forEach(animals, function (c) {
    Thing.create(c);
  });
});


// Create users
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
