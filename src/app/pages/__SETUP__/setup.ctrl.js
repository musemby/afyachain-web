(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.setup')
      .controller('SetupCtrl', ["$scope", "brandService", SetupCtrl]);
  
      function SetupCtrl($scope, SetupSvc) {
          $scope.data = {
              created: new Date(),
              updated: new Date()
          };
  
          $scope.fetchBrands = function () {
              brandService.list()
              .then(function (data){
                  $scope.brands = data.data;
              }).catch(function (err) {
                  console.log(err);
              });
          };
      }
  }
  )();
