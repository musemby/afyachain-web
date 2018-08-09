(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verify')
        .controller('VerifyCtrl', ["$scope", "BatchService", "afyaAlert", VerifyCtrl]);

    function VerifyCtrl($scope, batchSvc, afyaAlert) {
        $scope.batchCode = {
            verifiedOn: new Date()
        };
        $scope.verifyCode = function () {
            batchSvc.verifyBatch($scope.batchCode)
            .then(function (data) {
                console.log(data);
                afyaAlert.success("The batch {0} has been successfully validated".format($scope.batchCode.code));
            }).catch(function (err) {
                console.log(err);
                afyaAlert.error(err);
            });
        }
    }
}
)();
