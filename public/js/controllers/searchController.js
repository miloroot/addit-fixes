app.controller('searchController', ["$http", "$scope","$location","$rootScope", "Post","User", "login", function($http,$scope,$location,$rootScope, Post, User, login){

	$scope.isCollapsed = true;
	$scope.SearchError = false;

	$scope.searchSubmit = function(){
		if(login.user._id) {
			var regExpSearchString = new RegExp($scope.searchString,"i");
			// get the posts that matches the string in the search bar
			Post.get({_all: regExpSearchString, _populate:"author"}, function(data){
				var ids = [];

				if(data.length && $scope.searchString){
					for (var i = 0; i < data.length; i++) {
						ids.push(data[i]._id);
					}

					console.log("FOUND:",data);
					$rootScope.searchResult = data;
					// change location to /search
					$scope.SearchError = false;
				}else if(!$scope.searchString){
					$scope.SearchError = true;
				}else{
					// change location to /search
					$location.url("/search");
					console.log("OBS!!! No data found...");
					$rootScope.searchResult = data;
					// change location to /search
					$location.url("/search");
				}

				User.get({_all: regExpSearchString}, function(users){
					users.forEach(function(user, index) {
						Post.get({author: user._id, _populate: "author"}, function(posts){
							posts.forEach(function(post, index) {
								var searchResultIndex = ids.indexOf(post._id);
								if(searchResultIndex == -1) {
									$rootScope.searchResult.push(post);
								}
							});
						});
					});
					$location.url("/search");
				});
			});
		}
	};

	$scope.searchForPostFromTag = function(tag) {
		if(login.user._id) {
			// get the posts that matches the tag that the user clicked on
			Post.get({tags: new RegExp(tag,"i"), _populate:"author"}, function(data){
				
				$rootScope.searchResult = data;

				if(data.length && tag){
					console.log("FOUND:",data);
					// change location to /search
					$location.url("/search");
				}else{
					console.log("OBS!!! No data found...");
					// change location to /search
					$location.url("/search");
				}
			});
		}
	};

}]);
