(function () {
    'use strict';

    angular.module('BlurAdmin.auth', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('auth', {
                url: '/auth/',
                views: {
                    "main@": {
                        templateUrl: 'app/auth/login.html',
                        controller: 'AuthCtrl',
                    }
                },
            })
            .state('auth.login', {
                url: 'login/',
                views: {
                    "main@": {
                        templateUrl: 'app/auth/login.html',
                        controller: 'AuthCtrl',
                    }
                },
            })
            .state('auth.complete', {
                url: 'complete/',
                views: {
                    "main@": {
                        templateUrl: 'app/auth/complete.html',
                        controller: 'AuthCtrl',
                    }
                },
            })
            .state('auth.failed', {
                url: 'failed/',
                views: {
                    "main@": {
                        templateUrl: 'app/auth/failed.html',
                        controller: 'AuthCtrl',
                    }
                },
            })
    }

})();