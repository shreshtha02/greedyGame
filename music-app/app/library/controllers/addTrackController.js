var angular = require('angular')
angular.module('web-app').
controller('addTrackController',['$scope','sweet','musicService','$window',
	function($scope,sweet,musicService,$window) {
		
	$scope.currentPage=1;
	$scope.itemsPerPage=20;
	$scope.genreSelected=[];
	$scope.track={'name':'','rating':''};

	$scope.loadGenre = function(){
		var promise = musicService.getGenres({params:{page:$scope.currentPage}});
		promise.then(function(data) {
			$scope.genres = data['results'];
			if($scope.genreSelected.length>0){
				for(i=0;i<$scope.genres.length;i++){
					for(j=0;j<$scope.genreSelected.length;j++){
						if($scope.genreSelected[j].name==$scope.genres[i].name){
							$scope.genres[i]['selected']=true;
							break;
						}
						else{
							$scope.genres[i]['selected']=false;
						}
					}
				}
			}
			$scope.totalItems=data['count'];
		}, function(status) {
				console.log("Error....")
		});
	}
	$scope.loadGenre();

	$scope.pageChanged = function(page){
		$scope.currentPage=page;
		for(i=0;i<$scope.genres.length;i++){
			if($scope.genres[i].selected==true){
				$scope.genreSelected.push($scope.genres[i]);
			}
		}
		$scope.loadGenre();
	}

	$scope.addNewTrack = function(){
		var newTrack={};
		newTrack['title']=$scope.track.name;
		newTrack['rating']=parseFloat($scope.track.rating); 	
		newTrack['genres']=[];
		for(i=0;i<$scope.genres.length;i++){
			if($scope.genres[i].selected==true){
				newTrack.genres.push($scope.genres[i].id);
			}
		}
		for(i=0;i<$scope.genreSelected.length;i++){
			newTrack.genres.push($scope.genreSelected[i].id);
		}
		var promise = musicService.postTrack(newTrack);
		promise.then(function(data) {
			console.log('success');
			sweet.show('success', 'new track is added successfully', 'success');
			$scope.genreSelected=[];
			$scope.track={'name':'','rating':''};
			$scope.currentPage=1;
			$scope.loadGenre();
		}, function(status) {
				console.log("Error....")
		});
	}
	
	$scope.musicList = function(){
		$window.location.href="/music";
	}
}])