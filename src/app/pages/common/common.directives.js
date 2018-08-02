angular.module('BlurAdmin.pages.common')
.directive("ngFileSelect", function (fileReader, $timeout, $http) {
    return {
        scope: {
            ngModel: '='
        },
        link: function ($scope, el) {
            function getFile(file) {
                console.log(file);
                fileReader.readAsDataUrl(file, $scope)
                    .then(function (result) {
                        // console.log(result);
                        var fd = new FormData();
                        var uploadUrl = 'http://localhost:3005/uploadFile'
                        fd.append('file', result);
                        $http.post(uploadUrl, fd, {
                            transformRequest: angular.identity,
                            headers: { 'Content-Type': undefined }
                        }).then(function (data) {
                            console.log(data);
                        }).catch(function(err) {
                            console.log(err);
                        });
                        $timeout(function () {
                            $scope.ngModel = result;
                        });
                    });
            }

            el.bind("change", function (e) {
                var file = (e.srcElement || e.target).files[0];
                getFile(file);
            });
        }
    };
});
