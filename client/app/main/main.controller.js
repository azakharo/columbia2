'use strict';

angular.module('columbia2App')
  .controller('MainCtrl', function ($scope, $http, $uibModal, socket, uiGridConstants, Modal) {

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

    $scope.onDelBtnClick = function (cow) {
      if (cow) {
        let openConfirmFunc = Modal.confirm.delete(
          () => $http.delete('/api/things/' + cow._id)
        );
        openConfirmFunc(`animal with id ${cow.ID}`);
      }
    };

    $scope.onEditBtnClick = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/main/animalInfoDlg.html',
        controller: 'animalInfoDlgCtrl',
        size: 'lg',
        resolve: {
          animal: function () {
            return $scope.selectedCow;
          }
        }
      });

      modalInstance.result.then(function (cow) {
        //log($scope.selectedCow);
        //log(cow);
        $http.put('/api/things/' + $scope.selectedCow._id, cow);
      });

    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    // Operations with cows on server
    //////////////////////////////////////////////////////////////////////

  });
