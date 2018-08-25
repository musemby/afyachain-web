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
    $rootScope.$on('$stateChangeStart', function (event) {
      var token = Cookies.get('afyatoken');
      // console.log(token)
      if(!token) {
        window.location = 'http://localhost:3000/login.html';
      }
    })
  });


  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });
  }

})();
