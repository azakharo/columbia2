'use strict';

angular.module('columbia2App')
  .controller('MainCtrl', function ($scope, uiGridConstants) {

    const SEX = ['M', 'F'];
    const PORODY = ['meet', 'milk'];
    const CHIP_LOCATIONS = ['back', 'stomach', 'head'];
    const HAIRS = ['black', 'white', 'black-white'];
    const SPEC_CHARS = [undefined, 'eye missing', 'tail missing'];
    const REPRODUCTION_CHOICES = [undefined, 'sterilized'];
    const GROUPS = ['inseminated', 'young', 'worker', 'quarantine'];
    let animals = _.times(100, function() {
      const birthday = moment().subtract(_.random(1000), 'days');
      return {
        ID: genGuid(),
        owner: 'Anton Subbotin',
        birthday: birthday,
        sex: _.sample(SEX),
        poroda: _.sample(PORODY),
        motherID: genGuid(),
        chipDate: moment(birthday).add(1, 'days'),
        chipLocation: _.sample(CHIP_LOCATIONS),
        hair: _.sample(HAIRS),
        specialCharacteristics: _.sample(SPEC_CHARS),
        reproduction: _.sample(REPRODUCTION_CHOICES),
        group: _.sample(GROUPS)
      }
    });

    //-----------------------------------
    // ui-grid setup

    $scope.gridOptions = {};
    $scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
    $scope.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
    $scope.gridOptions.data = animals;

    // ui-grid setup
    //-----------------------------------

    $scope.onAddBtnClick = function () {
      log('add button clicked');
    };
    $scope.onEditBtnClick = function () {
      log('edit button clicked');
    };
    $scope.onDelBtnClick = function () {
      log('del button clicked');
    };

    function genGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    }

  });
