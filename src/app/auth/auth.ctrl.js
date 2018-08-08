(function () {
    'use strict';

    angular.module('BlurAdmin.auth')
        .controller('AuthCtrl', ["$scope", AuthCtrl]);

    function AuthCtrl($scope) {
        console.log($scope);
    }
}
)();
