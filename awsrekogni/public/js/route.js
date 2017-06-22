var graphite = angular.module('graphite', ['ngRoute']);

graphite.config(function($routeProvider) {
    $routeProvider
        .when('/upload', { //home page
            templateUrl: '/pages/upload.html',
            controller: 'uploadController'
        })
        .when('/allimages', { //home page
            templateUrl: '/pages/images.html',
            controller: 'imagesController'
        })
        .when('/people', { //home page
            templateUrl: '/pages/people.html',
            controller: 'peopleController'
        })
});
