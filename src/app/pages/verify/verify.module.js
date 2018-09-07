(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verify', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('verify', {
                url: '/verify',
                views: {
                    "content@": {
                        template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
                    }
                },
                title: 'Verify',
                sidebarMeta: {
                    icon: 'ion-checkmark-circled',
                    order: 800,
                },
            })
            .state('verify.listBrands', {
                url: '/batches',
                views: {
                    "content@": {
                        templateUrl: 'app/pages/verify/tpls/verify-batch.html',
                        controller: 'VerifyBatchCtrl',
                    }
                },
                title: 'Batches',
                sidebarMeta: {
                    order: 800,
                },
            })
            .state('verify.listBrands.units', {
                url: '/batches/:batchCode/verifyUnits',
                views: {
                    "content@": {
                        templateUrl: 'app/pages/verify/tpls/verify-units.html',
                        controller: 'VerifyUnitCtrl',
                    }
                }
            });
    }
})();
