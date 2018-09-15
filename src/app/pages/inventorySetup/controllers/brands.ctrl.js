(function () {
    'use strict';

    angular.module('BlurAdmin.pages.inventorySetup.controllers')
        .controller(
            'BlurAdmin.pages.inventorySetup.controllers.brands', [
                "$rootScope", "$scope", "$state", "$filter", "BrandsService",
                "BatchService", "ParticipantsService", "UnitService", "afyaAlert",
            "fileReader", "baProgressModal", "$uibModal", "$timeout", BrandController]);

    // add python style {}.format to strings
    String.prototype.format = function () {
        var a = this;
        for (var k in arguments) {
            a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
        }
        return a
    }

    function BrandController(
        $rootScope, $scope, $state, $filter, brandService, batchSvc,
        participantSvc, unitSvc, afyaAlert, fileReader, baProgressModal, $uibModal, $timeout) {
        var token = Cookies.get('afyatoken');
        var brandId = $state.params.id;
        var batchId = $state.params.batchId;
        $scope.batchCode = batchId;
        var manOpened = false;
        var expOpened = false;

        var email = atob(token);
        $scope.currentUser = 'org.afyachain.ChainParticipant#' + email;
        $scope.imageSrc = "";
        
        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
        
        $scope.altInputFormats = ['yyyy-MM-ddTHH:mm:ss.sss'];
        $scope.brandData = {
            brandId: Math.floor(Math.random() * 100000),
            created: new Date(),
            updated: new Date()
        };
        $scope.newBatchData = {};
        $scope.dispatchBatchData = {};
        $scope.title = 'Create Brand';
        
        var brandOwnerFilter = '{"where":{"owner": "resource:{0}"}}'.format($scope.currentUser);

        brandService.list(brandOwnerFilter)
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

            var brandBatchFilter = '{"where":{"brand":"resource:org.afyachain.Brand#{0}"}}'.format(brandId);
            batchSvc.list(brandBatchFilter)
                .then(function (data) {
                    $scope.batches = data.data;
                }).catch(function (err) {
                    afyaAlert.error(err);                    
                });

            $scope.saveBatch = function () {
                if(batchId) {
                    var toSave = Object.assign({}, $scope.editBatchData);
                    toSave.manufactureDate = String(toSave.manufactureDate);
                    toSave.expiryDate = String(toSave.expiryDate);
                    delete toSave.code;
                    batchSvc.put(batchId, toSave)
                    .then(function(data) {
                        afyaAlert.success("The batch was successfully updated.");
                    }).catch(function(err) {
                        afyaAlert.error(err);
                    });
                } else {
                    $scope.newBatchData.brand = "org.afyachain.Brand" + "#" + brandId;
                    $scope.newBatchData.owner = $scope.brandData.owner;
                    $scope.newBatchData.user = $scope.currentUser;
                    $scope.newBatchData.created = String(new Date());
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
                    var tData = Object.assign({}, data.data);
                    var d = Date.parse(data.data.manufactureDate);
                    var e = Date.parse(data.data.expiryDate);
                    tData.manufactureDate = new Date(d);
                    tData.expiryDate = new Date(e);
                    $scope.editBatchData = tData;
                }).catch(function (err) {
                    afyaAlert.error(err);
                });

            // unit stuff
            var batchUnitFilter = '{"where":{"batch":"resource:org.afyachain.Batch#{0}"}}'.format(batchId);
            unitSvc.list(batchUnitFilter)
                .then(function (data) {
                    $scope.units = data.data;
                }).catch(function (err) {
                    afyaAlert.error(err);
                });
            
            // dispatch batch stuff
            var recipientFilter = '{"where":{"type": "SUPPLIER"}}';
            participantSvc.list(recipientFilter)
                .then(function (data) {
                    $scope.recipientsList = data.data;
                }).catch(function (err) {
                    afyaAlert.error(err);
                });
            
            $scope.dispatchBatch = function () {
                var owner = $scope.dispatchBatchData.owner;
                var disBatch = "resource:org.afyachain.Batch#{0}".format(batchId);
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
            }
        }

        // print labels logic
        $scope.moveToPrinted = function (batchCode) {
            var printedBatch = Object.assign({}, $scope.editBatchData);
            var data = {
                batchCode: printedBatch.code,
                user: $scope.currentUser
            };
            batchSvc.printLabels(data)
                .then(function (data) {
                    $state.reload();
                    afyaAlert.success("The labels for this batch and its units have been successfully printed.");
                }).catch(function (err) {
                    afyaAlert.error(err);
                });
        };

        $scope.saveBrand = function () {
            var putData = Object.assign({}, $scope.brandData);
            putData.user = self.currentUser;
            delete putData.brandId;
            if (brandId) {
                brandService.put(brandId, putData)
                    .then(function (data) {
                        afyaAlert.success("The brand was successfully updated.");
                    }).catch(function (err) {
                        afyaAlert.error(err);
                    });
            } else {
                $scope.brandData.ingredients = $scope.brandData.ingredients.split(",");
                $scope.brandData.owner = $scope.currentUser;
                $scope.brandData.createdBy = $scope.currentUser;
                $scope.brandData.updatedBy = $scope.currentUser;
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
            $state.go('inventorySetup.editBrand', { id: bId });
        };

        $scope.goViewBatch = function (code) {
            $state.go('inventorySetup.editBrand.editBatch', { batchId: code });
        };

        $scope.openManDatePicker = function () {
            $scope.manOpened = !manOpened;
        };
        $scope.openExpDatePicker = function () {
            $scope.expOpened = !expOpened;
        };

        // TIMELINE batch
        var payload = {
            batch: 'resource:org.afyachain.Batch#{0}'.format(batchId)
        }
        batchSvc.getActivities(payload)
        .then(function(data) {
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

        // brand logo logic
        $scope.picture = $filter('profilePicture')('Logo');

        $scope.removePicture = function () {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        // $scope.uploadPicture = function () {
        //     var fileInput = document.getElementById('uploadFile');
        //     fileInput.click();
        // };

        // new upload logic
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
    }
}
)();
