
(function () {
    'use strict';
        
    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardCtrl', ['$rootScope', '$scope', '$http', 'afyaAlert', DashboardCtrl]);
        
    function DashboardCtrl($rootScope, $scope, $http, afyaAlert) {
        var type = Cookies.get('type');
        var email = Cookies.get('email');
        var currentUser = 'resource:' + 'org.afyachain.ChainParticipant#' + email;
        if(type == "MANUFACTURER") {
            var url = "http://localhost:4000/api/manufacturerDashboardReport";
            var data = { "manufacturerOwner": currentUser };
            $http.post(url, data)
            .then(function (data) {
                $scope.dashboardData = data.data;
            }).catch(function (err) {
                afyaAlert.error(err)
            })
        }
    }
})();
