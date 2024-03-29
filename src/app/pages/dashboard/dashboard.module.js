/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          views: {
            "content@": {
              templateUrl: 'app/pages/dashboard/dashboard.html',
              controller: 'DashboardCtrl'
            }
          },
          title: 'Dashboard',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        })
        .state('dashboard.token', {
          url: '/:token',
          views: {
            "content@": {
              templateUrl: 'app/pages/dashboard/dashboard.html',
              controller: 'DashboardCtrl'
            }
          },
          title: 'Dashboard',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });

  }

})();
