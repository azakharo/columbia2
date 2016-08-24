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
  'formlyBootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    //$httpProvider.interceptors.push('authInterceptor');
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
