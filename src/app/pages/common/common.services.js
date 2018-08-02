(function () {
  'use strict';

  angular.module('BlurAdmin.pages.common')
    .service('afyaAlert', ["$rootScope", afyaAlert])
    .factory("fileReader", ["$q", "$log", fileReader]);

    function afyaAlert($rootScope) {
        self = this;
        
        self.success = function(message) {
            $rootScope.showSuccess = true;
            $rootScope.successMessage = message;
        };
        
        self.error = function (data) {
            $rootScope.showFailure = true;
            $rootScope.title = data.data.error.name;
            $rootScope.failureMessage = data.data.error.message;
        };

        $rootScope.closeSuccessAlert = function () {
            $rootScope.showSuccess = false;
        };

        $rootScope.closeFailureAlert = function () {
            $rootScope.showFailure = false;
        };
    }

    function fileReader($q, $log) {
        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var onProgress = function (reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress", {
                    total: event.total,
                    loaded: event.loaded
                });
            };
        };

        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    };
}
)();