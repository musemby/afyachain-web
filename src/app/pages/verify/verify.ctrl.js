(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verify')
        .controller('VerifyCtrl', ["$scope", "BatchService", "afyaAlert", VerifyCtrl]);

    function VerifyCtrl($scope, batchSvc, afyaAlert) {
        var token = Cookies.get('afyatoken');
        var email = atob(token);
        $scope.currentUser = 'org.afyachain.ChainParticipant#' + email;

        var verifiedBatchFilter = '{"where":{"owner":"resource:{0}"}}'.format($scope.currentUser);
        batchSvc.list(verifiedBatchFilter)
            .then(function (data) {
                $scope.batches = data.data;
            }).catch(function (err) {
                afyaAlert.error(err);
            });

        $scope.batchCode = {
            verifiedOn: new Date(),
            user: $scope.currentUser
        };
        $scope.verifyCode = function () {
            batchSvc.verifyBatch($scope.batchCode)
            .then(function (data) {
                afyaAlert.success("The batch {0} has been successfully verified and received".format($scope.batchCode.code));
            }).catch(function (err) {
                afyaAlert.error(err);
            });
        }
    }
}
)();
