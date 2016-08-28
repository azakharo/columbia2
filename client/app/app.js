'use strict';

angular.module('columbia2App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ui.grid',
  'ui.grid.autoResize',
  'ui.grid.selection',
  'ui.select',
  'ui.grid.resizeColumns',
  'ui.grid.moveColumns',
  'ui.grid.saveState',
  'ui.grid.pagination',
  'LocalStorageModule',
  'formly',
  'formlyBootstrap',
  'myFormlyConfig'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    //$httpProvider.interceptors.push('authInterceptor');

    // $http response, convert string to dates
    $httpProvider.defaults.transformResponse = function(data) {
      try {
        var object;
        if (typeof data === 'object') {
          object = data;
        } else {
          object = JSON.parse(data);
        }
        return recurseObject(object);
      } catch(e) {
        return data;
      }
    };
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  //.run(function ($rootScope, $location, Auth) {
  //  // Redirect to login if route requires auth and you're not logged in
  //  $rootScope.$on('$stateChangeStart', function (event, next) {
  //    Auth.isLoggedInAsync(function(loggedIn) {
  //      if (next.authenticate && !loggedIn) {
  //        event.preventDefault();
  //        $location.path('/login');
  //      }
  //    });
  //  });
  //})

  .run(function (i18nService, uibDatepickerPopupConfig) {
    // ui-grid
    i18nService.setCurrentLang('ru');

    // moment js
    moment.locale('ru');

    // Date picker translations
    uibDatepickerPopupConfig.currentText = 'Сегодня';
    uibDatepickerPopupConfig.clearText = 'Очистить';
    uibDatepickerPopupConfig.closeText = 'Закрыть';
  });


// $http response, convert string to dates
var dateRegex = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d+)?([+-][0-2]\d(:?[0-5]\d)?|Z)$/;
function recurseObject(object) {
  var result = object;
  if (object != null) {
    result = angular.copy(object);
    for (var key in result) {
      var property = result[key];
      if (typeof property === 'object') {
        result[key] = recurseObject(property);
      } else if (typeof property === 'string' && dateRegex.test(property)) {
        result[key] = new Date(property);
      }
    }
  }
  return result;
}
