(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    // mines
    'BlurAdmin.pages.participants',
    'BlurAdmin.pages.brands',
    'BlurAdmin.pages.common',
    'BlurAdmin.pages.inventorySetup',
    'BlurAdmin.pages.verify',
  ])
  .config(routeConfig)
  .run(function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
      var token = Cookies.get('afyatoken');
      if (!token && fromState.name != "") {
        window.location = 'http://localhost:3000/login.html';
      }
    });
    $rootScope.participantType = Cookies.get('type');
    $rootScope.email = Cookies.get('email');
    $rootScope.participantName = Cookies.get('name');

    $rootScope.logOut = function () {
      Cookies.remove('afyatoken');
      Cookies.remove('email');
      Cookies.remove('name');
      Cookies.remove('type');
      console.log(Cookies.get('afyatoken'))
      window.location = 'http://localhost:3000/login.html';
    }

    // reset alerts
    $rootScope.showSuccess = false;
    $rootScope.showFailure = false;
  });

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    baSidebarServiceProvider.addStaticItem({
     
    });
  }

})();
