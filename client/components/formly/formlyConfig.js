'use strict';

var app = angular.module('myFormlyConfig', ['formly', 'formlyBootstrap', 'ui.select']);

app.run(function(formlyConfig) {
  // NOTE: This next line is highly recommended. Otherwise Chrome's autocomplete will appear over your options!
  formlyConfig.extras.removeChromeAutoComplete = true;

  // Configure custom types
  formlyConfig.setType({
    name: 'ui-select-single',
    extends: 'select',
    templateUrl: 'components/formly/ui-select-single.html'
  });

});
