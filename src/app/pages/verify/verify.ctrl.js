(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verify')
        .controller('VerifyBatchCtrl', ["$scope", "$state", "BatchService", 'UnitService', "afyaAlert", VerifyBatchCtrl])
        .controller('VerifyUnitCtrl', ["$scope", "$state", "BatchService",
            'UnitService', 'ParticipantsService', "afyaAlert", "$uibModal", VerifyUnitCtrl]);
        

    function VerifyBatchCtrl($scope, $state, batchSvc, unitSvc, afyaAlert) {
        function errorHandler(err) {
            afyaAlert.error(err);
        }
        var userType = Cookies.get('type')

        $scope.isSupplier = userType == 'SUPPLIER';

        var token = Cookies.get('afyatoken');
        var email = atob(token);
        $scope.currentUser = 'org.afyachain.ChainParticipant#' + email;

        var verifiedBatchFilter = '{"where":{"owner":"resource:{0}"}}'.format($scope.currentUser);
        if(userType == 'SUPPLIER') {
            verifiedBatchFilter = '{"where":{"supplierOwner":"resource:{0}"}}'.format($scope.currentUser);
        } else if(userType == 'RETAILER') {
            verifiedBatchFilter = '{"where":{"retailerOwner":"resource:{0}"}}'.format($scope.currentUser);
        }

        batchSvc.list(verifiedBatchFilter)
            .then(function (data) {
                $scope.batches = data.data;
            }).catch(errorHandler);
        console.log($scope.batches)
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


    function VerifyUnitCtrl($scope, $state, batchSvc, unitSvc, participantSvc, afyaAlert, $uibModal) {
        function errorHandler(err) {
            afyaAlert.error(err);
        }
        $scope.dispatchBatchData = {};

        var userType = Cookies.get('type')
        $scope.isSupplier = userType == 'SUPPLIER';

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
            afyaAlert.success("The unit {0} has been successfully verified and received".format($scope.toVerify.code));
            $state.reload();
        }).catch(errorHandler);
        }

        // dispatch batch stuff
        $scope.open = function (page, size) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

        var recipientFilter = '{"where":{"type": "SUPPLIER","type": "RETAILER"}}';
        participantSvc.list(recipientFilter)
            .then(function (data) {
                $scope.recipientsList = data.data;
            }).catch(function (err) {
                afyaAlert.error(err);
            });

        $scope.dispatchBatch = function () {
            console.log($scope.dispatchBatchData);
            var owner = $scope.dispatchBatchData.owner;
            var disBatch = "resource:org.afyachain.Batch#{0}".format($scope.batch.code);
            var recipient = "resource:org.afyachain.ChainParticipant#{0}".format(owner.email);
            var toPost = {
                batch: disBatch,
                recipient: recipient,
                dispatchedOn: String(new Date),
                user: $scope.currentUser
            };

        batchSvc.dispatch(toPost)
        .then(function (data) {
            afyaAlert.success('The batch was successfully dispatched to {0}'.format(owner.name));
            $state.reload();
        }).catch(function (err) {
            afyaAlert.error(err);
        })
        };

        // TIMELINE batch
        var payload = {
            batch: 'resource:org.afyachain.Batch#{0}'.format(batchCode)
        }
        batchSvc.getActivities(payload)
            .then(function (data) {
                var items = data.data;
                $scope.timelineItems = {};

                items.forEach(function (item) {
                    if (item.logType == 'PRODUCED') {
                        var timelineObject = {
                            available: true,
                            producedBy: item.fromName,
                            producedOn: item.occurredOn
                        };
                        $scope.timelineItems.PRODUCED = timelineObject
                    } else if (item.logType == 'SUPPLIER_DISPATCHED') {
                        var timelineObject = {
                            available: true,
                            dispatchedBy: item.fromName,
                            dispatchedTo: item.toName,
                            dispatchedOn: item.occurredOn
                        };
                        $scope.timelineItems.SUPPLIER_DISPATCHED = timelineObject;
                    } else if (item.logType == 'SUPPLIER_RECEIVED') {
                        var timelineObject = {
                            available: true,
                            receivedBy: item.toName,
                            receivedFrom: item.fromName,
                            receivedOn: item.occurredOn
                        };
                        $scope.timelineItems.SUPPLIER_RECEIVED = timelineObject;
                    } else if (item.logType == 'RETAILER_DISPATCHED') {
                        var timelineObject = {
                            available: true,
                            dispatchedBy: item.fromName,
                            dispatchedTo: item.toName,
                            dispatchedOn: item.occurredOn
                        };
                        $scope.timelineItems.RETAILER_DISPATCHED = timelineObject;
                    } else if (item.logType == 'RETAILER_RECEIVED') {
                        var timelineObject = {
                            available: true,
                            receivedBy: item.toName,
                            receivedFrom: item.fromName,
                            receivedOn: item.occurredOn
                        };
                        $scope.timelineItems.RETAILER_RECEIVED = timelineObject;
                    }
                });
                console.log('ddddd ', $scope.timelineItems);
            }).catch(function (err) {
                afyaAlert.error(err);
            });
    }
}
)();
