(function () {
  'use strict';

  angular.module('BlurAdmin.pages.participants')
    .service('ParticipantsService', ParticipantsService);

    function ParticipantsService($http, $q) {
        self = this;
        var url = "http://localhost:4000/api/ChainParticipant";

        self.list = function () {
            return $q(
                function (resolve, reject) {
                    $http.get(url)
                    .then(function (data) {
                        resolve(data);
                    }).catch(function (err) {
                        reject(err);
                    });
            })
        };

        self.create = function (payload) {
            return $q(
                function (resolve, reject) {
                    $http.post(url, payload)
                    .then(function (data) {
                        resolve(data);
                    }).catch(function (err) {
                        reject(err);
                    });
            })
        };
    }
}
)();