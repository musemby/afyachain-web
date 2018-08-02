(function () {
    'use strict';

    angular.module('BlurAdmin.pages.inventorySetup.controllers')
        .controller(
            'BlurAdmin.pages.inventorySetup.controllers.brands', [
                "$rootScope", "$scope", "$state", "$filter", "BrandsService",
            "BatchService", "ParticipantsService", "UnitService", "afyaAlert", BrandController]);

    String.prototype.format = function () {
        var a = this;
        for (var k in arguments) {
            a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
        }
        return a
    }

    function BrandController(
        $rootScope, $scope, $state, $filter, brandService, batchSvc,
        participantSvc, unitSvc, afyaAlert) {
        let brandId = $state.params.id;
        let batchId = $state.params.batchId;
        let manOpened = false;
        let expOpened = false;

        $scope.altInputFormats = ['yyyy-MM-ddTHH:mm:ss.sss'];
        $scope.brandData = {
            brandId: Math.floor(Math.random() * 100000),
            created: new Date(),
            updated: new Date()
        };
        $scope.newBatchData = {};
        $scope.title = 'Create Brand';

        brandService.list()
            .then(function (data) {
                $scope.brands = data.data;
            }).catch(function (err) {
                afyaAlert.error(err);
            });
            
            participantSvc.list()
            .then(function (data) {
                $scope.ownerChoices = data.data;
            }).catch(function (err) {
                afyaAlert.error(err);
            });

        if (brandId) {
            $scope.title = 'Edit a Brand';
            brandService.get(brandId)
                .then(function (data) {
                    $scope.brandData = data.data;
                }).catch(function (err) {
                    afyaAlert.error(err);
                });


            // batch stuff
            $scope.showBatchCreate = false;
            $scope.toggleShowBatchCreate = function () {
                $scope.showBatchCreate = !$scope.showBatchCreate;
            }

            let brandBatchFilter = '{"where":{"brand":"resource:org.afyachain.Brand#{0}"}}'.format(brandId);
            batchSvc.list(brandBatchFilter)
                .then(function (data) {
                    $scope.batches = data.data;
                }).catch(function (err) {
                    afyaAlert.error(err);                    
                });

            $scope.saveBatch = function () {
                if(batchId) {
                    let toSave = Object.assign({}, $scope.editBatchData);
                    toSave.manufactureDate = String(toSave.manufactureDate);
                    toSave.expiryDate = String(toSave.expiryDate);
                    delete toSave.code;
                    batchSvc.put(batchId, toSave)
                    .then(function(data) {
                        afyaAlert.success("The batch was successfully updated.");
                    }).then(function(err) {
                        afyaAlert.error(err);
                    });
                } else {
                    $scope.newBatchData.brand = "org.afyachain.Brand" + "#" + brandId;
                    $scope.newBatchData.owner = $scope.brandData.owner;
                    batchSvc.create($scope.newBatchData)
                        .then(function (data) {
                            $state.reload();
                            $scope.toggleShowBatchCreate();
                            afyaAlert.success("The batch was successfully created.");
                        }).catch(function (err) {
                            afyaAlert.error(err);
                        });
                };
                }
        }

        if (batchId) {
            $scope.title = 'Edit a Batch';
            batchSvc.get(batchId)
                .then(function (data) {
                    let tData = Object.assign({}, data.data);
                    let d = Date.parse(data.data.manufactureDate);
                    let e = Date.parse(data.data.expiryDate);
                    tData.manufactureDate = new Date(d);
                    tData.expiryDate = new Date(e);
                    $scope.editBatchData = tData;
                }).catch(function (err) {
                    console.log(err);
                });

            // unit stuff
            let batchUnitFilter = '{"where":{"batch":"resource:org.afyachain.Batch#{0}"}}'.format(batchId);
            unitSvc.list(batchUnitFilter)
                .then(function (data) {
                    $scope.units = data.data;
                }).catch(function (err) {
                    console.log(err)
                });
        }

        $scope.saveBrand = function () {
            let putData = Object.assign({}, $scope.brandData);
            delete putData.brandId;
            console.log('branddataa', putData);
            if (brandId) {
                brandService.put(brandId, putData)
                    .then(function (data) {
                        afyaAlert.success("The brand was successfully updated.");
                        console.log($rootScope);
                    }).catch(function (err) {
                        afyaAlert.error(err);
                    });
            } else {
                $scope.brandData.ingredients = $scope.brandData.ingredients.split(",");
                brandService.create($scope.brandData)
                    .then(function (data) {
                        $state.go('inventorySetup.listBrands');
                        afyaAlert.success("The brand was successfully created.");
                    }).catch(function (err) {
                        afyaAlert.error(err);
                    });
            }
        };

        // state changing functions
        $scope.goCreateBrand = function () {
            $state.go('inventorySetup.createBrand');
        };

        $scope.goEdit = function (bId) {
            console.log(bId)
            $state.go('inventorySetup.editBrand', { id: bId });
        };

        $scope.goViewBatch = function (code) {
            console.log(code);
            $state.go('inventorySetup.editBrand.editBatch', { batchId: code });
        };

        $scope.openManDatePicker = function () {
            $scope.manOpened = !manOpened;
        };
        $scope.openExpDatePicker = function () {
            $scope.expOpened = !expOpened;
        };

        // brand logo logic
        $scope.picture = $filter('profilePicture')('Calpol');

        $scope.removePicture = function () {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        $scope.uploadPicture = function () {
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();

        };

    }
}
)();
