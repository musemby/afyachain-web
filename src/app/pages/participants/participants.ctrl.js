(function () {
  'use strict';

  angular.module('BlurAdmin.pages.participants')
    .controller('ParticipantFormCtrl', ["$scope", "ParticipantsService", ParticipantFormCtrl]);

    function ParticipantFormCtrl($scope, ptcSvc) {
        $scope.data = {
            created: new Date(),
            updated: new Date()
        };
        $scope.participantChoices = [
            'MANUFACTURER',
            'SUPPLIER',
            'RETAILER'
        ];

        $scope.createParticipant = function () {
            ptcSvc.create($scope.data)
            .then(function (data){
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });
        };
    }
}
)();
