(function () {
  'use strict';

  angular.module('BlurAdmin.pages.inventorySetup', [
      'BlurAdmin.pages.inventorySetup.controllers',
      'BlurAdmin.pages.common'
  ])
      .config(routeConfig);

  /** @ngInject */
  
  function routeConfig($stateProvider) {
    var userType = Cookies.get('type');
    if (userType == 'MANUFACTURER') {
      $stateProvider
        .state('inventorySetup', {
          url: '/inventorySetup',
          views: {
            "content@": {
              template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
              controller: 'SetupCtrl'
            }
          },
          title: 'Setup & Track',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 800,
            showItem: true
          },
        })
        .state('inventorySetup.listBrands', {
          url: '/inventorySetup',
          views: {
            "content@": {
              templateUrl: 'app/pages/inventorySetup/tpls/inventorySetup.html',
              controller: 'BlurAdmin.pages.inventorySetup.controllers.brands',
            }
          },
          title: 'Brands',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 800,
            showItem: true
          },
        })
        .state('inventorySetup.createBrand', {
          url: '/createBrand',
          views: {
            "content@": {
              templateUrl: 'app/pages/inventorySetup/tpls/brand.form.html',
              controller: 'BlurAdmin.pages.inventorySetup.controllers.brands',
            }
          },
          // title: 'Edit Brand',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 800,
            showItem: true
          },
        })
        .state('inventorySetup.editBrand', {
          url: '/editBrand/:id',
          views: {
            "content@": {
              templateUrl: 'app/pages/inventorySetup/tpls/brand.detail.html',
              controller: 'BlurAdmin.pages.inventorySetup.controllers.brands',
            }
          },
          // title: 'Edit Brand',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 800,
            showItem: 'true'
          },
        })
        .state('inventorySetup.editBrand.editBatch', {
          url: '/editBatch/:batchId',
          views: {
            "content@": {
              templateUrl: 'app/pages/inventorySetup/tpls/batch.detail.html',
              controller: 'BlurAdmin.pages.inventorySetup.controllers.brands',
            }
          },
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 800,
          },
        });
    }
  }

})();