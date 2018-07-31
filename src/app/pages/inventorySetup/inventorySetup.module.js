(function () {
  'use strict';

  angular.module('BlurAdmin.pages.inventorySetup', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('inventorySetup', {
        url: '/inventorySetup',
        views: {
          "content@": {
            template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
            controller: 'SetupCtrl'
          }
        },
        // controller: 'SetupCtrl',
        title: 'Setup',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 800,
        },
        })
      .state('inventorySetup.listBrands', {
        url: '/inventorySetup',
        // templateUrl: 'app/pages/inventorySetup/inventorySetup.html',
        views: {
          "content@": {
            templateUrl: 'app/pages/inventorySetup/inventorySetup.html',
            controller: 'SetupCtrl',
          }
        },
        title: 'Brands',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 800,
        },
        })
      .state('inventorySetup.createBrand', {
        url: '/createBrand',
        // templateUrl: 'app/pages/inventorySetup/brand.form.html',
        views: {
          "content@": {
            templateUrl: 'app/pages/inventorySetup/brand.form.html',
            controller: 'SetupCtrl',
          }
        },
        // title: 'Edit Brand',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 800,
        },
      })
      .state('inventorySetup.editBrand', {
        url: '/editBrand/:id',
        views: {
          "content@": {
            templateUrl: 'app/pages/inventorySetup/brandDetail.html',
            controller: 'SetupCtrl',
          }
        },
        // title: 'Edit Brand',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 800,
        },
      })
      .state('inventorySetup.editBrand.editBatch', {
        url: '/editBatch/:batchId',
        // templateUrl: 'app/pages/inventorySetup/batchDetail.html',
        views: {
          "content@": {
            templateUrl: 'app/pages/inventorySetup/batchDetail.html',
            controller: 'SetupCtrl',
          }
        },
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 800,
        },
      });
  }

})();