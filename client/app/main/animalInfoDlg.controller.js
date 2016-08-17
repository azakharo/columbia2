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

  });
