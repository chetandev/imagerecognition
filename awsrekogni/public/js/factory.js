graphite.factory('data', ['$http', function($http) {
    var USERID = '111'
    return function() {
        var self = {};
        self.getAllImages = function() {
            var promise = $http({
                method: 'GET',
                url: '/jcm/rekognition/get/all/v1',
                headers: {
                    "x-user-id": USERID
                }
            });
            return promise;
        }

        self.getUniqueImages = function() {
            var promise = $http({
                method: 'GET',
                url: '/jcm/rekognition/get/uniquefaces/v1',
                headers: {
                    "x-user-id": USERID
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
                    "x-user-id": USERID,
                    "x-face-id": '' + faceId
                }
            });
            return promise;
        }

        self.addTag = function(contactId, faceId) {
            var promise = $http({
                method: 'POST',
                url: '/jcm/rekognition/tag/image/v1',
                headers: {
                    "x-user-id": USERID,
                    "x-face-id": '' + faceId,
                    "x-contact-id": '' + contactId
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
