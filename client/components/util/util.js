'use strict';


///////////////////////////////////////////////////////////
// Log utils

function log(msg) {
  console.log(msg);
}
function logData(data) {
  log(JSON.stringify(data, null, 2));
}

// Log utils
///////////////////////////////////////////////////////////


//============================================================
// $http responses and socket updates, convert string to dates

var dateRegex = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d+)?([+-][0-2]\d(:?[0-5]\d)?|Z)$/;
function deserializeDates(object) {
  var result = object;
  if (object != null) {
    result = angular.copy(object);
    for (var key in result) {
      var property = result[key];
      if (typeof property === 'object') {
        result[key] = deserializeDates(property);
      } else if (typeof property === 'string' && dateRegex.test(property)) {
        result[key] = new Date(property);
      }
    }
  }
  return result;
}

// $http responses and socket updates, convert string to dates
//============================================================
