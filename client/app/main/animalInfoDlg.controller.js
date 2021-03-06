'use strict';

angular.module('columbia2App')
  .controller('animalInfoDlgCtrl',
  function ($scope, $uibModalInstance, animal, operation) {
    $scope.animal = angular.copy(animal);
    $scope.operation = operation;

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

    // Choices
    $scope.SEX_CHOICES = SEX;
    $scope.PORODY = PORODY;
    $scope.REPRODUCTION_CHOICES = REPRODUCTION_CHOICES;
    $scope.GROUPS = GROUPS;
    $scope.HAIRS = HAIRS;
    $scope.CHIP_LOCATIONS = CHIP_LOCATIONS;

    $scope.getFullYearsFrom = function (date) {
      return moment().diff(moment(date), 'years');
    };

  });
