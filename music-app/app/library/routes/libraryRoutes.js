var angular = require('angular')
angular.module('web-app').
config(function($routeProvider,$locationProvider) {
	$routeProvider.when('/music', {
                templateUrl : 'partials/music/music.html',
                controller  : 'musicController'
           }).when('/addtrack', {
                templateUrl : 'partials/music/createTrack.html',
                controller  : 'addTrackController'
           }).when('/edittrack/:key1', {
                templateUrl : 'partials/music/editTrack.html',
                controller  : 'editTrackController'
           }).when('/viewgenre', {
                templateUrl : 'partials/music/viewGenre.html',
                controller  : 'viewGenreController'
           });
           $locationProvider.html5Mode(true);
})