graphite.factory('data', ['$http', function($http) {
    return function() {
        var self = {};
        self.getAllImages = function() {
            var promise = $http({ method: 'GET', url: '/api/all' });
            return promise;
        }

        self.getUniqueImages = function() {
            var promise = $http({ method: 'GET', url: '/api/people' });
            return promise;
        }

        self.getImageByFaceId = function(faceId) {
            var promise = $http({ method: 'GET', url: '/api/getsimilarimages/' + faceId });
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
