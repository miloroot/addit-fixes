app.controller("modalController", ["$scope", "$modalInstance", "User", "Post", "title", "login", "$location", function($scope, $modalInstance, User, Post, title, login, $location) {
	$scope.title = title;
	$scope.user = login.user;

	// a function to check if the username exists
	$scope.usernameExists = false;
	$scope.checkUsername = function(form, username) {
		if (!form.username.$error.minlength) {
			User.get({username: username}, function(data) {
				if (!data.length) {
					$scope.usernameExists = false;
				} else {
					$scope.usernameExists = true;
				}
				console.log("username exists ", $scope.usernameExists);
			});
		}
	};

	// sign up submit handler
	$scope.signupSubmit = function () {
		// Create user
		var newUserId, newUser = User.create($scope.newUser,
			function(data) {
				if (!data.status){
					newUserId = data[0]._id;
					$scope.newUser = newUser;
					console.log("User created with id: " + newUserId);
					console.log( "new user is: ", $scope.newUser );
					$scope.signupSuccessMsg = "You have now successfully registered!";
				}else{
					$scope.signupErrorMsg = "Oops! Failed to register.";
				}
			}
		);
	};

	$scope.signupSuccessClose = function() {
		$modalInstance.close("data form OK");
	};

	$scope.loginSubmit = function () {
		login.login($scope.loginCredentials, function(data) {
			if (login.user._id) {
				$modalInstance.close("data form OK");
				$location.url('/userpage');
				console.log("User is now logged in");
				//some success message for user
			} else {
				console.log("User's login credentials are bad");
				$scope.signupErrorMsg = "Oops! Failed to login.";
				//some error message for user
			}
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.closeAddPost = function(type) {
		$modalInstance.close(type);
	};

}]);
