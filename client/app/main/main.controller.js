'use strict';

angular.module('columbia2App')
  .controller('MainCtrl', function ($scope, uiGridConstants) {

    //-----------------------------------
    // ui-grid setup

    $scope.gridOptions = {};
    //$scope.gridOptions.columnDefs = [
    //  {
    //    displayName: 'Приложение',
    //    field: 'app.title'
    //  },
    //  {
    //    displayName: 'Акцептант',
    //    field: 'title'
    //  },
    //  {
    //    displayName: 'Описание',
    //    field: 'description'
    //  }
    //];

    $scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
    $scope.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
    let myData = [
      {
        "firstName": "Cox",
        "lastName": "Carney",
        "company": "Enormo",
        "employed": true
      },
      {
        "firstName": "Lorraine",
        "lastName": "Wise",
        "company": "Comveyer",
        "employed": false
      },
      {
        "firstName": "Nancy",
        "lastName": "Waters",
        "company": "Fuelton",
        "employed": false
      }
    ];
    $scope.gridOptions.data = myData;

    // ui-grid setup
    //-----------------------------------

  });
