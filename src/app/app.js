'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.select',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'angularFileUpload',
  'ja.qr',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'BlurAdmin.auth',
]);

angular.module('BlurAdmin')
  .run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function (event) {
      console.log('vdfvfdvdfvdf')
    })
  }])
