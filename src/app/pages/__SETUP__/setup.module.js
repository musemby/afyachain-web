(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.setup', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('setup', {
            url: '/setup',
            templateUrl: 'app/pages/setup/setup.html',
            controller: 'SetupCtrl',
            title: 'Manufacturer Setup',
            sidebarMeta: {
                icon: 'ion-gear-a',
              order: 800,
            },
          });
    }
  })();
