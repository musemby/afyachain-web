// (function () {
//   'use strict';

//     angular.module('BlurAdmin.pages.inventorySetup')
//         .controller(
//         'SetupCtrl', ["$scope", "$state", "$filter", "BrandsService", "BatchService", "ParticipantsService", "UnitService", SetupCtrl]);
//         // .controller('BatchCtrl', ["$scope", "$state", "BatchService", BatchCtrl]);
    
//     String.prototype.format = function () {
//         var a = this;
//         for (var k in arguments) {
//             a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
//         }
//         return a
//     }

//     function SetupCtrl($scope, $state, $filter, brandService, batchSvc, participantSvc, unitSvc)  {
//         let brandId = $state.params.id;
//         let batchId = $state.params.batchId;
//         let manOpened = false;
//         let expOpened = false;
//         // '2018-07-19T21:00:00.000Z'
        
//         $scope.altInputFormats = ['yyyy-MM-ddTHH:mm:ss.sss', 'yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
//         $scope.brandData = {
//             brandId: Math.floor(Math.random() * 100000),
//             created: new Date(),
//             updated: new Date()
//         };

//         $scope.newBatchData = {};
//         $scope.title = 'Create Brand';
//         participantSvc.list()
//             .then(function (data) {
//                 $scope.ownerChoices = data.data;
//             }).catch(function (err) {
//                 console.log(err);
//             });

//         if (brandId) {
//             $scope.title = 'Edit a Brand';
//             brandService.get(brandId)
//                 .then(function (data) {
//                     console.log('ccccccc', data);
//                     $scope.brandData = data.data;
//                 }).catch(function (err) {
//                     console.log(err);
//                 });

            
//             // batch stuff
//             $scope.showBatchCreate = false;
//             $scope.toggleShowBatchCreate = function () {
//                 $scope.showBatchCreate = !$scope.showBatchCreate;
//                 console.log($scope.showBatchCreate);
//             }

//             let brandBatchFilter = '{"where":{"brand":"resource:org.afyachain.Brand#{0}"}}'.format(brandId);
//             batchSvc.list(brandBatchFilter)
//                 .then(function (data) {
//                     console.log('batcheeeeees', data);
//                     $scope.batches = data.data;
//                 }).catch(function (err) {
//                     console.log(err);
//                 });

//             $scope.saveBatch = function () {
//                 console.log($scope.newBatchData);
//                 $scope.newBatchData.brand = "org.afyachain.Brand" + "#" + brandId;
//                 $scope.newBatchData.owner = $scope.brandData.owner;
//                 batchSvc.create($scope.newBatchData)
//                     .then(function (data) {
//                         console.log(data);
//                         $state.reload();
//                         $scope.toggleShowBatchCreate();
//                     }).catch(function (err) {
//                         console.log(err);
//                     });
//             };
//         }

//         if (batchId) {
//             $scope.title = 'Edit a Batch';
//             batchSvc.get(batchId)
//                 .then(function (data) {
//                     $scope.editBatchData = data.data;
//                     console.log('baaaaatch',$scope.editBatchData);
//                 }).catch(function (err) {
//                     console.log(err);
//                 });

//             // unit stuff
//             let batchUnitFilter = '{"where":{"batch":"resource:org.afyachain.Batch#{0}"}}'.format(batchId);
//             unitSvc.list(batchUnitFilter)
//                 .then(function (data) {
//                     $scope.units = data.data;
//                     console.log('uuuuunit', data);
//                 }).catch(function (err) {
//                     console.log(err)
//                 });
//         }

//         $scope.saveBrand = function () {
//             $scope.brandData.owner = $scope.brandData.owner.$class + "#" + $scope.brandData.owner.email;
//             console.log('branddataa', $scope.brandData);
//             if (brandId) {
//                     brandService.put(id, $scope.brandData)
//                     .then(function (data) {
//                         console.log(data);
//                     }).catch(function (err) {
//                         console.log(err);
//                     });
//             } else {
//                 $scope.brandData.ingredients = $scope.brandData.ingredients.split(",");
//                 brandService.create($scope.brandData)
//                     .then(function (data) {
//                         $state.go('inventorySetup.listBrands');
//                     }).catch(function (err) {
//                         console.log(err);
//                     });
//             }
//         };

//         brandService.list()
//         .then(function (data) {
//             console.log(data)
//             $scope.brands = data.data;
//         }).catch(function (err) {
//             console.log(err);
//         });

//         $scope.goCreateBrand = function () {
//             // let id = $state.params.id;
//             $state.go('inventorySetup.createBrand');
//         };

//         $scope.goEdit = function (bId) {
//             // let id = $state.params.id;
//             console.log(bId)
//             $state.go('inventorySetup.editBrand', {id: bId});
//         };

//         $scope.goViewBatch = function (code) {
//             // let id = $state.params.id;
//             console.log(code);
//             $state.go('inventorySetup.editBrand.editBatch', {batchId: code});
//         };

//         // brand detail view
//         $scope.picture = $filter('profilePicture')('Calpol');

//         $scope.removePicture = function () {
//             $scope.picture = $filter('appImage')('theme/no-photo.png');
//             $scope.noPicture = true;
//         };

//         $scope.uploadPicture = function () {
//             var fileInput = document.getElementById('uploadFile');
//             fileInput.click();

//         };

//         $scope.openManDatePicker = function () {
//             $scope.manOpened = !manOpened;
//         };
//         $scope.openExpDatePicker = function () {
//             $scope.expOpened = !expOpened;
//         };
//     }
// }
// )();
