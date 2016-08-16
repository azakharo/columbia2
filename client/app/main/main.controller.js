'use strict';

angular.module('columbia2App')
  .controller('MainCtrl', function ($scope, $http, socket, uiGridConstants) {

    //-----------------------------------
    // ui-grid setup

    $scope.gridOptions = {};
    $scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
    $scope.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;

    // ui-grid setup
    //-----------------------------------


    //////////////////////////////////////////////////////////////////////
    // Operations with cows on server

    $http.get('/api/things').success(function (awesomeThings) {
      $scope.gridOptions.data = awesomeThings;
      socket.syncUpdates('thing', $scope.gridOptions.data);
    });

    $scope.onAddBtnClick = function () {
      log('add button clicked');
      if (!$scope.newCow) {
        return;
      }
      $http.post('/api/things', newCow);
      $scope.newCow = null;
    };

    $scope.onDelBtnClick = function () {
      log('del button clicked');
      //$http.delete('/api/things/' + thing._id);
    };

    $scope.onEditBtnClick = function () {
      log('edit button clicked');
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    // Operations with cows on server
    //////////////////////////////////////////////////////////////////////

  });
