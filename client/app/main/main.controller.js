'use strict';

angular.module('columbia2App')
  .controller('MainCtrl', function ($scope, $http, socket, uiGridConstants) {

    //-----------------------------------
    // ui-grid setup

    $scope.gridOptions = {};

    $scope.gridOptions.columnDefs = [
      {
        displayName: 'Id',
        field: 'ID'
      },
      {
        displayName: 'Owner',
        field: 'owner'
      },
      {
        displayName: 'Birthday',
        field: 'birthday',
        type: 'date',
        cellFilter: 'date: "yyyy-MM-dd"'
      },
      {
        displayName: 'Sex',
        field: 'sex'
      },
      {
        displayName: 'Type',
        field: 'poroda'
      },
      {
        displayName: 'Chipped',
        field: 'chipDate',
        type: 'date',
        cellFilter: 'date: "yyyy-MM-dd"'
      },
      {
        displayName: 'Chip Location',
        field: 'chipLocation'
      },
      {
        displayName: 'Wool',
        field: 'hair'
      },
      {
        displayName: 'Notes',
        field: 'specialCharacteristics'
      },
      {
        displayName: 'Reproduction',
        field: 'reproduction'
      },
      {
        displayName: 'Group',
        field: 'group'
      }
    ];

    $scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
    $scope.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
    // Selection
    $scope.gridOptions.enableRowSelection = true;
    $scope.gridOptions.enableRowHeaderSelection = false;
    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.modifierKeysToMultiSelect = false;
    $scope.gridOptions.noUnselect = false;
    $scope.gridOptions.onRegisterApi = function( gridApi ) {
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, onSelectionChanged);
    };
    $scope.selectedCow = null;
    function onSelectionChanged(row){
      if (row.isSelected) {
        $scope.selectedCow = row.entity;
      }
      else {
        $scope.selectedCow = null;
      }
    }

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
