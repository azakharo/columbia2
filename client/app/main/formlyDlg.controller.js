'use strict';

angular.module('columbia2App')
  .controller('formlyDlgCtrl',
  function ($scope, $uibModalInstance, animal, operation) {
    $scope.animal = angular.copy(animal);
    $scope.animal.birthday = new Date($scope.animal.birthday);
    $scope.animal.chipDate = new Date($scope.animal.chipDate);
    $scope.operation = operation;

    $scope.fields = [
      {
        key: 'ID',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'ID',
          placeholder: 'Enter animal ID',
          required: true
        },
        validators: {
          checkFrmt: function ($viewValue, $modelValue, scope) {
            var value = $viewValue || $modelValue;
            if (value) {
              return /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(value);
            } else {
              return false;
            }
          }
        },
        "validation": {
          "show": true
        }
      }
    ];

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
