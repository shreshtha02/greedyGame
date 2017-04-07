var angular = require('angular')
angular.module('web-app').
controller('editTrackController',['$scope','$window','$location','sweet','$routeParams','musicService',
	function($scope,$window,$location,sweet,$routeParams,musicService) {
		
	
	var url=window.location.href;
	$scope.track_id= url.split("/")[4];
	$scope.modalAddGenre = false;
	$scope.itemsPerPage=20;
	$scope.genreSelected=[];
		
	$scope.loadTrack = function(){
		var promise = musicService.getSpecificTrack($scope.track_id);
		promise.then(function(data) {
			$scope.track = data;
			$scope.track.rating= parseFloat($scope.track.rating);
			$scope.loadGenre();
		}, function(status) {
				console.log("Error....")
		});
	}
	$scope.loadTrack();
	
	$scope.loadGenre = function(){
		var promise = musicService.getGenres({params:{page:$scope.currentPage}});
		promise.then(function(data) {
			$scope.genres = data['results'];
			if($scope.track.genres.length>0){
				for(i=0;i<$scope.genres.length;i++){
					for(j=0;j<$scope.track.genres.length;j++){
						if($scope.track.genres[j].name==$scope.genres[i].name){
							$scope.genres[i]['selected']=true;
							break;
						}
						else{
							$scope.genres[i]['selected']=false;
						}
					}
				}
			}
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
	
	$scope.pageChanged = function(page){
		$scope.currentPage=page;
		for(i=0;i<$scope.genres.length;i++){
			if($scope.genres[i].selected==true){
				$scope.genreSelected.push($scope.genres[i]);
			}
		}
		$scope.loadGenre();
	}
	
	
	$scope.editTrackConfirmed = function(){
		var editTrack={};
		editTrack['id']=$scope.track.id;
		editTrack['title']=$scope.track.title;
		editTrack['rating']=parseFloat($scope.track.rating); 	
		editTrack['genres']=[];
		for(i=0;i<$scope.genres.length;i++){
			if($scope.genres[i].selected==true){
				editTrack.genres.push($scope.genres[i].id);
			}
		}
		for(i=0;i<$scope.genreSelected.length;i++){
			editTrack.genres.push($scope.genreSelected[i].id);
		}
		var promise = musicService.postTrackUpdate(editTrack);
		promise.then(function(data) {
			console.log('success');
			sweet.show({
            	title: 'success',
            	text: 'Track is updated successfully',
            	type: 'success',
            	showCancelButton: false,
            	confirmButtonColor: '#DD6B55',
            	confirmButtonText: 'OK',
            	closeOnConfirm: true,
            	closeOnCancel: false
        	}, 
        	function(isConfirm) {
            	if (isConfirm) {
					$window.location.href="/music";
            	}
        	});
		}, function(status) {
				console.log("Error....")
		});
	}

}])