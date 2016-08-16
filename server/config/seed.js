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

  let animals = _.times(100, function() {
    const birthday = moment().subtract(_.random(1000), 'days');
    return {
      ID: genGuid(),
      owner: 'Anton Subbotin',
      birthday: birthday.toDate(),
      sex: _.sample(cow.SEX),
      poroda: _.sample(cow.PORODY),
      motherID: genGuid(),
      chipDate: moment(birthday).add(1, 'days').toDate(),
      chipLocation: _.sample(cow.CHIP_LOCATIONS),
      hair: _.sample(cow.HAIRS),
      specialCharacteristics: _.sample(cow.SPEC_CHARS),
      reproduction: _.sample(cow.REPRODUCTION_CHOICES),
      group: _.sample(cow.GROUPS)
    }
  });

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


function genGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}
