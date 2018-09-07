(function () {
    'use strict';
        
    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardCtrl', ['$rootScope', '$scope', '$state', '$location', 'ParticipantsService', DashboardCtrl]);
        
    function DashboardCtrl($rootScope, $scope, $state, $location, patSvc) {
        var token = $state.params.token;
        console.log(token);
        if(token) {
            Cookies.set('afyatoken', token);
        }
        var email = atob(token || Cookies.get('afyatoken'));
        patSvc.get(email)
        .then(function (data) {
            $rootScope.user = data.data;
            console.log($rootScope.user);
        }).catch(function (err) {
            console.log(err);
        })
    }
})();
