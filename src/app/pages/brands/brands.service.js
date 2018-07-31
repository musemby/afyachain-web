(function () {
  'use strict';

  angular.module('BlurAdmin.pages.brands')
    .service('TokenService', TokenService)
    .service('BatchService', BatchService)
    .service('UnitService', UnitService);

    function TokenService($http, $q) {
        self = this;
        var url = "http://localhost:4000/api/createToken";

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

    function BatchService($http, $q) {
        self = this;
        var url = "http://localhost:4000/api/Batch";
        var urlCreate = "http://localhost:4000/api/createBatch";

        self.list = function (filters) {
            return $q(
                function (resolve, reject) {
                    $http.get(url + "?filter=" + encodeURIComponent(filters))
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
                    $http.post(urlCreate, payload)
                    .then(function (data) {
                        resolve(data);
                    }).catch(function (err) {
                        reject(err);
                    });
            })
        };

        self.get = function (code) {
            return $q(
                function (resolve, reject) {
                    $http.get(url + '/' + code)
                        .then(function (data) {
                            resolve(data);
                        }).catch(function (err) {
                            reject(err);
                        });
                })
        };
    }

    function UnitService($http, $q) {
        self = this;
        var url = "http://localhost:4000/api/Unit";

        self.list = function (filters) {
            return $q(
                function (resolve, reject) {
                    $http.get(url + "?filter=" + encodeURIComponent(filters))
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
