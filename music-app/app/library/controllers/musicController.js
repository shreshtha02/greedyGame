var angular = require('angular')
angular.module('web-app').
controller('musicController',['$scope','sweet','musicService','$window','$location',
	function($scope,sweet,musicService,$window,$location) {
	
	$scope.searchText ="";
	$scope.currentPage=1;
	$scope.itemsPerPage=20;
	
	$scope.loadData = function(){
		var promise = musicService.getTracks({params:{page:$scope.currentPage,title:$scope.searchText}});
		promise.then(function(data) {
			$scope.tracks = data['results'];
			for(i=0;i<$scope.tracks.length;i++){
				for(j=0;j<$scope.tracks[i].genres.length;j++){
					if(j==0){
						$scope.tracks[i]['all_genres']=$scope.tracks[i].genres[j].name;
					}
					else{
						$scope.tracks[i]['all_genres']=$scope.tracks[i]['all_genres']+' | ' +$scope.tracks[i].genres[j].name;
					}
				}
			}
			$scope.totalItems=data['count'];
		}, function(status) {
				console.log("Error....")
		});
	}
	$scope.loadData();
	
	$scope.searchEntered = function() {
		console.log("search Entered"+ $scope.searchText);
		$scope.currentpage;
		$scope.loadData();
	};
	
	$scope.searchCleared = function() {
		$scope.searchText = "";
		$scope.currentpage;
		$scope.loadData();
	};
	
	$scope.pageChanged = function(page){
		$scope.currentPage=page;
		$scope.loadData();
	}
	
	$scope.getRate = function(num,val) {
		if(val==0){
			num=Math.round(num/2);		
	    	return new Array(parseInt(num));
		} 
		else{
			num=Math.round(num/2);
			num=5-num;
			return new Array(parseInt(num));
		}  
	}
	
	$scope.addNewTrack = function(){
		$window.location.href="/addtrack";
	}
	
	$scope.editTrack = function(index){
		$window.location.href="/edittrack/"+$scope.tracks[index].id;
	}
	
	$scope.viewGenres = function(){
		$window.location.href="/viewgenre";
	}
}])
