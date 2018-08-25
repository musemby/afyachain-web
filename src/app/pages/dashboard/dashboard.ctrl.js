(function () {
    'use strict';
        
    angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardCtrl', DashboardCtrl);
        
    function DashboardCtrl($rootScope, $scope, $location) {
        var token = $location.search().token;
        if(token) {
            Cookies.set('afyatoken', token);
            console.log(Cookies.get('afyatoken'));
        }
    }
})();