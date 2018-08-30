(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verify')
        .controller('VerifyCtrl', ["$scope", "$state", "BatchService", 'UnitService', "afyaAlert", VerifyCtrl]);

    function VerifyCtrl($scope, $state, batchSvc, unitSvc, afyaAlert) {
        var token = Cookies.get('afyatoken');
        var email = atob(token);
        $scope.currentUser = 'org.afyachain.ChainParticipant#' + email;

        var errorHandler = function (err) {
            afyaAlert.error(err);
        }

        var verifiedBatchFilter = '{"where":{"owner":"resource:{0}"}}'.format($scope.currentUser);
        batchSvc.list(verifiedBatchFilter)
            .then(function (data) {
                $scope.batches = data.data;
            }).catch(errorHandler);

        $scope.batchCode = {
            verifiedOn: new Date(),
            user: $scope.currentUser
        };
        $scope.verifyCode = function () {
            batchSvc.verifyBatch($scope.batchCode)
            .then(function (data) {
                afyaAlert.success("The batch {0} has been successfully verified and received".format($scope.batchCode.code));
                $state.reload();
            }).catch(errorHandler);
        }

        $scope.goVerifyUnits = function (batchCode) {
            var batch = 'resource:org.afyachain.Batch#{0}'.format(batchCode);
            batchSvc.get(batchCode)
            .then(function (data) {
                $scope.batch = data.data;
            }).catch(errorHandler);

            unitSvc.getByBatch(batch)
            .then(function (data) {
                $scope.units = data.data;
            }).catch(errorHandler);
            $state.go('verify.listBrands.units', {batchCode: batchCode});
        }
    }
}
)();
