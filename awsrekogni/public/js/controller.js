graphite.controller('rootController', ['$scope', function($scope) {

    console.log('root controller')

}]);



graphite.controller('uploadController', ['$scope', 'fileUploadService', function($scope, fileUploadService) {

    $scope.imageShow = false;
    var factory = new fileUploadService();

    $scope.uploadFile = function() {
        factory.uploadFileToUrl(document.getElementById('file').files[0], '/api/upload')
            .then(function(result) {
                $scope.url = result.data;
                $scope.text = "uploaded to s3 "
                $scope.imageShow = true;
            })
            .catch(function(err) {})
    }

    console.log('upload controlller')

}]);

graphite.controller('imagesController', ['$scope', '$routeParams', '$route', 'data', '$interval', function($scope, $routeParams, $route, data, $interval) {

    console.log('images controlller')

}]);

graphite.controller('peopleController', ['$scope', '$routeParams', '$route', 'data', '$interval', function($scope, $routeParams, $route, data, $interval) {

    console.log('people controlller')

}]);
