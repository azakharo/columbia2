'use strict';

var app = angular.module('myFormlyConfig', ['formly', 'formlyBootstrap', 'ui.select']);

app.run(function(formlyConfig) {
  // NOTE: This next line is highly recommended. Otherwise Chrome's autocomplete will appear over your options!
  formlyConfig.extras.removeChromeAutoComplete = true;

  // UI-select configuration
  formlyConfig.setType({
    name: 'ui-select-single',
    extends: 'select',
    templateUrl: 'components/formly/formly-ui-select-single.html'
  });
  formlyConfig.setType({
    name: 'ui-select-multiple',
    extends: 'select',
    templateUrl: 'components/formly/formly-ui-select-multiple.html'
  });

  ////////////////////////////////////////////////////////////////////////
  // UI Datepicker config

  var attributes = [
    'date-disabled',
    'custom-class',
    'show-weeks',
    'starting-day',
    'init-date',
    'min-mode',
    'max-mode',
    'format-day',
    'format-month',
    'format-year',
    'format-day-header',
    'format-day-title',
    'format-month-title',
    'year-range',
    'shortcut-propagation',
    'datepicker-popup',
    'show-button-bar',
    'current-text',
    'clear-text',
    'close-text',
    'close-on-date-selection',
    'datepicker-append-to-body'
  ];

  var bindings = [
    'datepicker-mode',
    'min-date',
    'max-date'
  ];

  var ngModelAttrs = {};

  angular.forEach(attributes, function(attr) {
    ngModelAttrs[camelize(attr)] = {attribute: attr};
  });

  angular.forEach(bindings, function(binding) {
    ngModelAttrs[camelize(binding)] = {bound: binding};
  });

  //console.log(ngModelAttrs);

  formlyConfig.setType({
    name: 'datepicker',
    templateUrl:  'components/formly/formly-datepicker.html',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      ngModelAttrs: ngModelAttrs,
      templateOptions: {
        datepickerOptions: {
          format: 'dd.MM.yyyy',
          initDate: new Date(),
          showWeeks: false
        }
      }
    },
    controller: ['$scope', function ($scope) {
      $scope.datepicker = {};

      $scope.datepicker.opened = false;

      $scope.datepicker.open = function ($event) {
        $scope.datepicker.opened = !$scope.datepicker.opened;
      };
    }]
  });

  function camelize(string) {
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.replace(/^([A-Z])/, function(match, chr) {
      return chr ? chr.toLowerCase() : '';
    });
  }

  // UI Datepicker config
  ////////////////////////////////////////////////////////////////////////

});
