graphite.factory('data', ['$http', function($http) {
    return function() {
        var self = {};
        self.getAllImages = function() {
            var promise = $http({ method: 'GET', url: '/jcm/rekognition/get/uniquefaces/v1' });
            return promise;
        }

        self.getUniqueImages = function() {
            var promise = $http({
                method: 'GET',
                url: '/jcm/rekognition/get/uniquefaces/v1',
                headers: {
                    "x-user-id": '1'
                }
            });
            return promise;
        }

        self.getImageByFaceId = function(faceId) {
            console.log(faceId)
            var promise = $http({
                method: 'GET',
                url: '/jcm/rekognition/get/faces/by/faceid/v1',
                headers: {
                    "x-user-id": '1',
                    "x-face-id": '' + faceId
                }
            });
            return promise;
        }
        return self;

    }
}])

graphite.factory('fileUploadService', ['$http', function($http) {
    return function() {
        var self = {};
        self.uploadFileToUrl = function(file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })

        }
        return self;

    }
}])
