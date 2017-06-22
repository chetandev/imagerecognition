graphite.factory('data', ['$http', function($http) {
    return function() {
        var self = {};
        self.get_server_data = function() {
            var promise = $http({ method: 'GET', url: '/graphite/listner' });
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
