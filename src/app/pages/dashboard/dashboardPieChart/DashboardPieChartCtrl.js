/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $http, afyaAlert, $timeout, baConfig, baUtil) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

    var type = Cookies.get('type');
    var email = Cookies.get('email');
    var currentUser = 'resource:' + 'org.afyachain.ChainParticipant#' + email;
    if (type == "MANUFACTURER") {
      var url = "http://localhost:4000/api/manufacturerDashboardReport";
      var data = { "manufacturerOwner": currentUser };
      $http.post(url, data)
        .then(function (data) {
          $scope.dashboardData = data.data;
          $scope.charts = [{
            color: pieColor,
            description: 'Batches Produced',
            stats: $scope.dashboardData.batchesProduced,
          },
          {
            color: pieColor,
            description: 'Batches Received By Suppliers',
            stats: $scope.dashboardData.supplierReceivedBatches,
            icon: 'face',
          },
          {
            color: pieColor,
            description: 'Batches Received By Retailers',
            stats: $scope.dashboardData.retailerReceivedBatches,
          },
          {
            color: pieColor,
            description: 'Reported Errors',
            stats: $scope.dashboardData.batchesFailed,
            icon: 'refresh',
          }
          ];
        }).catch(function (err) {
          afyaAlert.error(err)
        })
    } else if (type == "SUPPLIER") {
      var url = "http://localhost:4000/api/supplierDashboardReport";
      var data = { "supplierOwner": currentUser };
      $http.post(url, data)
        .then(function (data) {
          $scope.dashboardData = data.data;
          $scope.charts = [{
            color: pieColor,
            description: 'Batches Encountered',
            stats: $scope.dashboardData.batchesEncountered,
          },
          {
            color: pieColor,
            description: 'Batches Enroute',
            stats: $scope.dashboardData.batchesEnroute,
            icon: 'face',
          },
          {
            color: pieColor,
            description: 'Dispatched to Retailers',
            stats: $scope.dashboardData.dispatchedToRetailers,
          },
          {
            color: pieColor,
            description: 'Batches in Possession',
            stats: $scope.dashboardData.batchesInPossession,
            icon: 'refresh',
          }
          ];
        }).catch(function (err) {
          afyaAlert.error(err)
        })
    } else if (type == "RETAILER") {
      var url = "http://localhost:4000/api/retailerDashboardReport";
      var data = { "retailerOwner": currentUser };
      $http.post(url, data)
        .then(function (data) {
          $scope.dashboardData = data.data;
          $scope.charts = [{
            color: pieColor,
            description: 'Batches Encountered',
            stats: $scope.dashboardData.batchesEncountered,
          },
          {
            color: pieColor,
            description: 'Batches Enroute',
            stats: $scope.dashboardData.batchesEnroute,
            icon: 'face',
          },
          {
            color: pieColor,
            description: 'Batches in Possession',
            stats: $scope.dashboardData.batchesInPossession,
            icon: 'refresh',
          }
          ];
        }).catch(function (err) {
          afyaAlert.error(err)
        })
    }

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();