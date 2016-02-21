app.controller("menuController", ["$http", "$scope", "addPostFactory", "login", "$location", function($http, $scope, addPostFactory, login, $location) {
	// console.log("The menuController is alive!");

	$scope.user = login.user;
	$scope.isCollapsed = true;
	$scope.collapseNav = function() {
		$scope.isCollapsed = !$scope.isCollapsed;
		console.log("isCollapsed", $scope.isCollapsed);
	};

	// listen for any "$routeChangeSuccess" $broadcasts
	$scope.$on("$routeChangeSuccess", function(event, next, current) {
		// if we have no logged in user, return to home
		if (!login.user._id && next.$$route.login && next.$$route.originalPath != "/") {
			event.preventDefault(); // prevent route change
			$location.url("/"); // redirect to home
			return;
		}
	});

	$scope.logOut = function() {
		var deletePost = confirm("Are you sure you want to log out?");
		if(deletePost) {
			login.logout();
			//$scope.user = undefined; // this destroys the reference to login.user
			console.log("User was successfully logged out");
			// console.log("User will be successfully logged out when implemented");
		} else {
			console.log("User was not logged out");
		}
	};

	$scope.$on("logout", function() {
		console.log("logout $broadcast detected");
		$location.url("/");
	});
}]);
