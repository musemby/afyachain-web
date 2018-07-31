(function () {
  'use strict';

  angular.module('BlurAdmin.pages.participants', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('participants', {
          url: '/participants',
          templateUrl: 'app/pages/participants/participants.html',
          controller: 'ParticipantFormCtrl',
          title: 'Participants',
          sidebarMeta: {
          	icon: 'ion-gear-a',
            order: 800,
          },
        });
  }

})();