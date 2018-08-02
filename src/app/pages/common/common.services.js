(function () {
  'use strict';

  angular.module('BlurAdmin.pages.common')
    .service('afyaAlert', ["$rootScope", afyaAlert]);

    function afyaAlert($rootScope) {
        self = this;
        
        self.success = function(message) {
            console.log($rootScope);
            $rootScope.showSuccess = true;
            $rootScope.successMessage = message;
        };
        
        self.error = function (data) {
            console.log($rootScope);
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

        $rootScope.$watch('showSuccess', function() {
            console.log($rootScope.showSuccess);
        });
    }

    function CommonService() {
        self = this;

        self.constructIdentifier = function (obj, idField) {
            console.log(obj);
            return obj.$class + '#' + obj.idField;
       }
    }
}
)();