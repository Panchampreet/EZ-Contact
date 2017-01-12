'use strict';

angular.module('ezcontactApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/home');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController'
      })
      .state('home', {
        url: '/home',
        views: {
          '@' : {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
          },
          'contact@home' : {
            templateUrl: 'app/home/contact/contact.html',
            controller: 'ContactController'
          },
          'createmessage@home' : {
            templateUrl: 'app/home/message/create/createmessage.html',
            controller: 'CreateMessageController'
          },
          'inbox@home' : {
            templateUrl: 'app/home/message/inbox/inbox.html',
            controller: 'InboxController'
          }
        },
        authenticate: true
      })
      .state('logout', {
        url: '/logout',
        template: '',
        controller: function($state, Auth) {
          Auth.logout();
          $state.go('login');
        }
      });
  })

  .factory('authInterceptor', function($rootScope, $q, $cookies, $injector) {
    var state;
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate) {
        Auth.isLoggedIn(function(loggedIn) {
          if (!loggedIn) {
            event.preventDefault();
            $state.go('login');
          }
        });
      }
    });
  });
