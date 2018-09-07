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
        var urlDispatch = "http://localhost:4000/api/DispatchBatch";
        var urlVerifyBatch = "http://localhost:4000/api/VerifyBatch";
        var urlPrintLabels = "http://localhost:4000/api/PrintLabels";

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

        self.dispatch = function (payload) {
            return $q(
                function (resolve, reject) {
                    $http.post(urlDispatch, payload)
                        .then(function (data) {
                            resolve(data);
                        }).catch(function (err) {
                            reject(err);
                        });
                })
        };

        self.verifyBatch = function (payload) {
            return $q(
                function (resolve, reject) {
                    $http.post(urlVerifyBatch, payload)
                    .then(function (data) {
                        resolve(data);
                    }).catch(function (err) {
                        reject(err);
                    });
                });
        };

        self.printLabels = function (payload) {
            return $q(
                function (resolve, reject) {
                    $http.post(urlPrintLabels, payload)
                    .then(function (data) {
                        resolve(data);
                    }).catch(function (err) {
                        reject(err);
                    });
            });
        }
    }

    function UnitService($http, $q) {
        self = this;
        var url = "http://localhost:4000/api/Unit";
        var getByBatchUrl = 'http://localhost:4000/api/queries/getUnitsByBatch?batch=';
        var verifyUnitUrl = 'http://localhost:4000/api/VerifyUnit';

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

        self.getByBatch = function (batch, filters) {
            return $q(
                function (resolve, reject) {
                    $http.get(getByBatchUrl + encodeURIComponent(batch) + '&filter=' + encodeURIComponent(filters))
                    .then(function (data) {
                        resolve(data);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
            )
        };

        self.verifyUnit = function (unitData) {
            return $q(
                function (resolve, reject) {
                    $http.post(verifyUnitUrl, unitData)
                    .then(function (data) {
                        resolve(data);
                    }).catch(function (err) {
                        reject(err);
                    })
                }
            )
        }
    }
}
)();
