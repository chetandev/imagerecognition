graphite.controller('rootController', ['$scope', function($scope) {

    console.log('root controller')

}]);



graphite.controller('uploadController', ['$scope', 'fileUploadService', function($scope, fileUploadService) {

    $scope.imageShow = false;
    $scope.gif = false;
    var factory = new fileUploadService();

    $scope.uploadFile = function() {
        $scope.gif = true;
        factory.uploadFileToUrl(document.getElementById('file').files[0], '/api/upload')
            .then(function(result) {
                $scope.url = result.data;
                $scope.text = "uploaded to s3 "
                $scope.imageShow = true;
                $scope.gif = false;
            })
            .catch(function(err) {})
    }
}]);

graphite.controller('imagesController', ['$scope', 'data', function($scope, data) {
    $scope.gif = true;
    var factory = new data();
    factory.getAllImages()
        .then(function(result) {
            $scope.images = result.data
            $scope.gif = false;

        })
        .catch(function(err) {})

}]);

graphite.controller('peopleController', ['$scope', 'data', function($scope, data) {
    $scope.gif = true;
    var factory = new data();
    factory.getUniqueImages()
        .then(function(result) {
            console.log(result)
            $scope.images = result.data.faces
            $scope.gif = false;

        })
        .catch(function(err) {})

    $scope.getImageByFaceId = function(faceId) {
        $scope.gif = true;
        factory.getImageByFaceId(faceId)
            .then(function(result) {
                console.log(result)
                $scope.imagesByFaceId = result.data.faces
                $scope.gif = false;

            })
            .catch(function(err) {})

    }

}]);
