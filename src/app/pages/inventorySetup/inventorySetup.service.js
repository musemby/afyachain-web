(function () {
  'use strict';

    angular.module('BlurAdmin.pages.inventorySetup')
        .service('BrandsService', BrandsService);

    function BrandsService($http, $q) {
        self = this;
        var url = "http://localhost:4000/api/Brand";

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

        self.get = function (id) {
            return $q(
                function (resolve, reject) {
                    $http.get(url + '/' + id)
                        .then(function (data) {
                            resolve(data);
                        }).catch(function (err) {
                            reject(err);
                        });
                })
        };

        self.put = function (id, payload) {
            return $q(
                function (resolve, reject) {
                    $http.put(url + '/' + id, payload)
                        .then(function (data) {
                            resolve(data);
                        }).catch(function (err) {
                            reject(err);
                        });
                }
            )
        }
    }
}
)();