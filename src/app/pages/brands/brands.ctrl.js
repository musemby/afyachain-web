(function () {
  'use strict';

  angular.module('BlurAdmin.pages.brands')
    .controller('BrandsFormCtrl', ["$scope", "TokenService",
                                   "BatchService", "UnitService", "ParticipantsService",
                                   "CommonService", BrandsFormCtrl]);

    function BrandsFormCtrl($scope, tokenSvc, batchSvc, unitSvc, participantSvc, commonSvc) {
        // #TODO: Use uuid generator for brandId
        participantSvc.list()
        .then(function(data) {
            $scope.ownerChoices = data.data;
        }).catch(function (err) {
            console.log(err);
        });

        brandSvc.list()
        .then(function(data) {
            $scope.brandChoices = data.data;
        }).catch(function (err) {
            console.log(err);
        });

        // TODO: Make brandId a uuid
        $scope.brandData = {
            brandId: Math.floor(Math.random()*100000),
            created: new Date(),
            updated: new Date()
        };

        $scope.tokenData = {
            created: new Date(),
            updated: new Date(),
        };

        $scope.createToken = function(type) {
            tokenSvc.create({})
            .then(function (data) {
                console.log(data);
                return data;
            }).catch(function(err) {
                console.log(err)
            });
        };
        // Create a token automatically and assign it to a batch
        // TODO: Populate code from token
        $scope.batchData = {
            owner: "some owner",
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        };

        // TODO: Populate code from token
        $scope.unitData = {
            batch: "some brand",
            token: "some token",
            owner: "some owner",
            created: new Date(),
            updated: new Date()
        };

        $scope.createBatch = function () {
            // let token = $scope.createToken("Batch");
            // $scope.batchData.token = token.$class + "#" + token.code;
            // $scope.batchData.code = token.code;
            $scope.batchData.brand = $scope.batchData.brand.$class + "#" + $scope.batchData.brand.brandId;
            batchSvc.create($scope.batchData)
            .then(function (data){
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });
        };

        $scope.createUnit = function () {
            unitSvc.create($scope.unitData)
            .then(function (data){
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });
        };
    }
}
)();
