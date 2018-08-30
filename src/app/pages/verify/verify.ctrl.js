(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verify')
        .controller('VerifyBatchCtrl', ["$scope", "$state", "BatchService", 'UnitService', "afyaAlert", VerifyBatchCtrl])
        .controller('VerifyUnitCtrl', ["$scope", "$state", "BatchService", 'UnitService', "afyaAlert", VerifyUnitCtrl]);
        

    function VerifyBatchCtrl($scope, $state, batchSvc, unitSvc, afyaAlert) {
        function errorHandler(err) {
            afyaAlert.error(err);
        }

        var token = Cookies.get('afyatoken');
        var email = atob(token);
        $scope.currentUser = 'org.afyachain.ChainParticipant#' + email;

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
        };

        $scope.goVerifyUnits = function (batchCode) {
            $state.go('verify.listBrands.units', { batchCode: batchCode });
        }
    }


    function VerifyUnitCtrl($scope, $state, batchSvc, unitSvc, afyaAlert) {
        function errorHandler(err) {
            afyaAlert.error(err);
        }

        var batchCode = $state.params.batchCode;
        var batch = 'resource:org.afyachain.Batch#{0}'.format(batchCode);
        $scope.toVerify = {};

        var token = Cookies.get('afyatoken');
        var email = atob(token);
        $scope.currentUser = 'org.afyachain.ChainParticipant#' + email;

        batchSvc.get(batchCode)
        .then(function (data) {
            $scope.batch = data.data;
            console.log($scope.batch)
        }).catch(errorHandler);

        var verifiedUnitFilter = '{"where":{"owner":"resource:{0}","batch":"{1}"}}'.format($scope.currentUser, batch);
        unitSvc.list(verifiedUnitFilter)
        .then(function (data) {
            $scope.units = data.data;
        }).catch(errorHandler);
        
        // unitSvc.getByBatch(batch, verifiedUnitFilter)
        // .then(function (data) {
        //     $scope.units = data.data;
        //     console.log(data.data);
        // }).catch(errorHandler);

        $scope.verifyUnit = function () {
            var unitData = {
                code: $scope.toVerify.code,
                batchCode: batchCode,
                verifiedOn: new Date(),
                user: $scope.currentUser
            };

        unitSvc.verifyUnit(unitData)
        .then(function (data) {
            afyaAlert.success("The batch {0} has been successfully verified and received".format($scope.toVerify.code));
            $state.reload();
        }).catch(errorHandler);
        }
    }
}
)();
