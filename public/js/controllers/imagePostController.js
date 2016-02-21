app.controller("imagePostController", ["$scope", "$modalInstance", "title", "uploadFactory", "User", "Post", "login", function($scope, $modalInstance, title, uploadFactory, User, Post, login) {

	$scope.title = title;
	$scope.post = [];

	$scope.user = login.getUser();

	// image post upload & submit handler
	function uploadImage(file, callback) {
		uploadFactory(file).success(function(data) {
			$scope.imagePaths.push(data);
			// console.log("saved image file, public path: ", data);
			// console.log("imagePaths: ", $scope.imagePaths);
			callback();
		}).error(function(data) {
			//error alert for image upload
			$scope.errorAlert = "OUCH! the image did not upload.";
			// console.log("Error on upload: ", data);
		});
	}

	$scope.imagePostSubmit = function() {
		var tags = [];
		if($scope.tags){
			for (var i = 0; i < $scope.tags.length; i++) {
				tags.push($scope.tags[i].text);
			}
		}

		$scope.imagePaths = [];
		$scope.images.forEach(function(image, index) {
			var i = index;
			uploadImage($scope.images[i], function() {
				if (i === $scope.images.length -1) {
					var currentDate = new Date();
					var newPostId, newPost = Post.create(
					{
						content: $scope.content,
						tags: tags,
						images: $scope.imagePaths,
						createdAt: currentDate
					}, function(data) {
						if (!data.status) {
							newPost = data[0];
							newPostId = newPost._id;
							console.log("Post created with id ", newPostId);
							login.getUser(function(usrObj) {
								usrObj.posts.push(newPostId);
								User.update({_id: usrObj._id}, {posts: usrObj.posts}, function() {
									Post.update({_relate:{items: newPost, author: usrObj}}, function() {
										$scope.content = "";
										$scope.successAlert = "DONE! Your post was successfully posted.";
										$modalInstance.close("data form OK");
									});
								});
							});
						} else {
							// error alert
							$scope.errorAlert = "OUCH! The post failed to be posted.";
						}
					});
				}
			});
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

}]);
