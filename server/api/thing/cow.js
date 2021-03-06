var _ = require('lodash');
var moment = require('moment');

var fs = require('fs');

// file is included here:
eval(fs.readFileSync(__dirname + '/animal.js')+'');

const SPEC_CHARS = [undefined, 'отсутствует глаз', 'отсутствует хвост'];

exports.createRandomAnimal = function () {
  const birthday = moment().subtract(_.random(1000), 'days');
  return {
    ID: genGuid(),
    owner: 'Антон Субботин',
    birthday: birthday.toDate(),
    sex: _.sample(SEX),
    poroda: _.sample(PORODY),
    motherID: genGuid(),
    chipDate: moment(birthday).add(1, 'days').toDate(),
    chipLocation: _.sample(CHIP_LOCATIONS),
    hair: _.sample(HAIRS),
    specialCharacteristics: _.sample(SPEC_CHARS),
    reproduction: _.sample(REPRODUCTION_CHOICES),
    groups: [_.sample(GROUPS)]
  }
};

function genGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

exports.SEX = SEX;
exports.PORODY = PORODY;
exports.CHIP_LOCATIONS = CHIP_LOCATIONS;
exports.HAIRS = HAIRS;
exports.SPEC_CHARS = SPEC_CHARS;
exports.REPRODUCTION_CHOICES = REPRODUCTION_CHOICES;
exports.GROUPS = GROUPS;
