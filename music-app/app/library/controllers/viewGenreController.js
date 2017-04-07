var angular = require('angular')
angular.module('web-app').
controller('viewGenreController',['$scope','sweet','musicService',
	function($scope,sweet,musicService) {
		
	
	$scope.currentPage=1;
	$scope.itemsPerPage=20;
	$scope.modalAddGenre = false;
	$scope.modalEditGenre = false;
	
	$scope.loadGenre = function(){
		var promise = musicService.getGenres({params:{page:$scope.currentPage}});
		promise.then(function(data) {
			$scope.genres = data['results'];
			$scope.totalItems=data['count'];
		}, function(status) {
				console.log("Error....")
		});
	}
	$scope.loadGenre();
	
	$scope.pageChanged = function(page){
		$scope.currentPage=page;
		$scope.loadGenre();
	}
	
	$scope.addNewGenre = function(){
		$scope.modalAddGenre = true;
		$scope.genre_name = "";
	}
	
	$scope.addGenreConfirmed = function(){
		var genre={};
		genre['name']=$scope.genre_name;
		var promise = musicService.postGenre(genre);
		promise.then(function(data) {
			console.log("success");
			sweet.show('success', 'New genre is added successfully', 'success');
			$scope.loadTrack();
		}, function(status) {
				console.log("Error....")
		});
	}
	
	$scope.updateGenre = function(index){
		$scope.edit_genre=$scope.genres[index];
		$scope.modalEditGenre = true;
	}
	
	$scope.editGenreConfirmed = function(){
		var promise = musicService.postGenreUpdate($scope.edit_genre);
		promise.then(function(data) {
			console.log("success");
			sweet.show('success', 'Genre is updated successfully', 'success');
			$scope.loadGenre();
		}, function(status) {
				console.log("Error....")
		});
	}

}])