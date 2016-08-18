'use strict';

var _ = require('lodash');
var moment = require('moment');


exports.SEX = ['M', 'F'];
exports.PORODY = ['meet', 'milk'];
exports.CHIP_LOCATIONS = ['back', 'stomach', 'head'];
exports.HAIRS = ['black', 'white', 'black-white'];
exports.SPEC_CHARS = [undefined, 'eye missing', 'tail missing'];
exports.REPRODUCTION_CHOICES = ['unsterilized', 'sterilized'];
exports.GROUPS = ['коровы', 'нетели', 'телки до двух лет', 'молодняк'];

exports.createRandomAnimal = function () {
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
};

function genGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}
