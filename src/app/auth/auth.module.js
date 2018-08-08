(function () {
    'use strict';

    angular.module('BlurAdmin.auth', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('auth', {
                url: '/loginoi/',
                // templateUrl: 'app/auth/login.html',
                views: {
                    "main@": {
                        templateUrl: 'app/auth/login.html',
                        controller: 'AuthCtrl',
                    }
                },
                // controller: 'AuthCtrl',
            })
    }

})();