'use strict';

angular.module('columbia2App')
  .controller('animalInfoDlgCtrl',
  function ($scope, $uibModalInstance, animal) {
    $scope.animal = angular.copy(animal);

    $scope.onOk = function () {
      $uibModalInstance.close($scope.animal);
    };

    $scope.onCancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    //===================================
    // Date picker

    $scope.today = moment().toDate();

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      showWeeks: false
    };

    $scope.dateFormat = 'dd.MM.yyyy';
    $scope.altInputFormats = ['d!.M!.yyyy'];

    // Date picker
    //===================================

  });