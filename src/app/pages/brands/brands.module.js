(function () {
  'use strict';

  angular.module('BlurAdmin.pages.brands', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('brands', {
          url: '/brands',
          templateUrl: 'app/pages/brands/brands.html',
          controller: 'BrandsFormCtrl',
          title: 'Brands',
        })
        .state('tokens', {
          url: '/tokens',
          templateUrl: 'app/pages/brands/tokens.html',
          controller: 'BrandsFormCtrl',
          title: 'Tokens',
        })
        .state('batch', {
          url: '/batch',
          templateUrl: 'app/pages/brands/batch.html',
          controller: 'BrandsFormCtrl',
          title: 'Batch',
        })
        .state('units', {
          url: '/units',
          templateUrl: 'app/pages/brands/units.html',
          controller: 'BrandsFormCtrl',
          title: 'Unit',
        });
  }

})();