var angular = require('angular')
angular.module('web-app').factory('musicService',['$q','$http',function($q,$http) {
	

	var getTracks = function(params) {
		return $q(function(receiveValues,receiveError) {
			$http.get('  http://104.197.128.152:8000/v1/tracks',params).then(function(response, status, headers, config) {
				receiveValues(response.data);			
			}, 
			function(data, status, headers, config) {
				receiveError(data.data);
			});
		});
	}
	
	var getSpecificTrack = function(id) {
		return $q(function(receiveValues,receiveError) {
			$http.get('  http://104.197.128.152:8000/v1/tracks/'+id).then(function(response, status, headers, config) {
				receiveValues(response.data);			
			}, 
			function(data, status, headers, config) {
				receiveError(data.data);
			});
		});
	}
	
	var getGenres= function(params) {
		return $q(function(receiveValues,receiveError) {
			$http.get('http://104.197.128.152:8000/v1/genres',params).then(function(response, status, headers, config) {
				receiveValues(response.data);			
			}, 
			function(data, status, headers, config) {
				receiveError(data.data);
			});
		});
	}
	
	var postTrack = function(track) {
		return $q(function(receiveValues,receiveError) {
			$http.post( 'http://104.197.128.152:8000/v1/tracks',track).then(function(response, status, headers, config) {
				receiveValues(response.data);			
			}, 
			function(data, status, headers, config) {
				receiveError(data.data);
			});
		});
	}

	var postGenre = function(genre) {
		return $q(function(receiveValues,receiveError) {
			$http.post( ' http://104.197.128.152:8000/v1/genres',genre).then(function(response, status, headers, config) {
				receiveValues(response.data);			
			}, 
			function(data, status, headers, config) {
				receiveError(data.data);
			});
		});
	}
	
	var postGenreUpdate = function(genre) {
		return $q(function(receiveValues,receiveError) {
			$http.post( ' http://104.197.128.152:8000/v1/genres/'+genre.id,genre).then(function(response, status, headers, config) {
				receiveValues(response.data);			
			}, 
			function(data, status, headers, config) {
				receiveError(data.data);
			});
		});
	}

	var postTrackUpdate = function(track) {
		return $q(function(receiveValues,receiveError) {
			$http.post( 'http://104.197.128.152:8000/v1/tracks/'+track.id,track).then(function(response, status, headers, config) {
				receiveValues(response.data);			
			}, 
			function(data, status, headers, config) {
				receiveError(data.data);
			});
		});
	}

	return {
		
		getTracks : getTracks,
		getGenres:getGenres,
		postTrack:postTrack,
		getSpecificTrack:getSpecificTrack,
		postGenre:postGenre,
		postGenreUpdate:postGenreUpdate,
		postTrackUpdate:postTrackUpdate
		
	};
}])