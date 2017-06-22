graphite.controller('rootController', ['$scope', '$routeParams', '$route', 'data', '$interval', function($scope, $routeParams, $route, data, $interval) {

    console.log('root controller')

}]);



graphite.controller('uploadController', ['$scope', '$routeParams', '$route', 'data', '$interval', function($scope, $routeParams, $route, data, $interval) {

    // $scope.serverData;
    // var factory = new data();

    // $interval(getData, 10000);


    // function getData() {
    //     factory.get_server_data()
    //         .then(function(result) {
    //             $scope.serverData = result.data
    //         })
    //         .catch(function(err) {})
    // }

    console.log('upload controlller')

}]);

graphite.controller('imagesController', ['$scope', '$routeParams', '$route', 'data', '$interval', function($scope, $routeParams, $route, data, $interval) {

   console.log('images controlller')

}]);  

graphite.controller('peopleController', ['$scope', '$routeParams', '$route', 'data', '$interval', function($scope, $routeParams, $route, data, $interval) {

   console.log('people controlller')

}]); 