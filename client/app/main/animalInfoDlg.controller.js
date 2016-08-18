'use strict';

angular.module('columbia2App')
  .controller('animalInfoDlgCtrl',
  function ($scope, $uibModalInstance, animal) {
    $scope.animal = angular.copy(animal);
    $scope.animal.birthday = new Date($scope.animal.birthday);
    $scope.animal.chipDate = new Date($scope.animal.chipDate);

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

    $scope.dateFormat = 'yyyy-MM-dd';
    $scope.altInputFormats = ['yyyy-d!-M!'];

    // Date picker
    //===================================

    // Choices
    $scope.SEX_CHOICES = SEX;
    $scope.PORODY = PORODY;
    $scope.REPRODUCTION_CHOICES = REPRODUCTION_CHOICES;
    $scope.GROUPS = GROUPS;
    $scope.HAIRS = HAIRS;

    $scope.getFullYearsFrom = function (date) {
      return moment().diff(moment(date), 'years');
    };

  });
