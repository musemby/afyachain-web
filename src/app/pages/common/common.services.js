(function () {
  'use strict';

  angular.module('BlurAdmin.pages.common')
    .service('CommonService', CommonService);

    function CommonService() {
        self = this;

        self.constructIdentifier = function (obj, idField) {
            console.log(obj);
            return obj.$class + '#' + obj.idField;
       }
    }
}
)();