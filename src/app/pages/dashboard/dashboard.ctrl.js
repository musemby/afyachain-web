(function () {
    'use strict';
        
    angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardCtrl', DashboardCtrl);
        
    function DashboardCtrl($scope) {
        console.log(document.cookie);
    }
})();