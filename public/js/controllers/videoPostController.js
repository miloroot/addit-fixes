app.controller("videoPostController", ["$scope", "$modalInstance", "title", "uploadFactory", "User", "Post", "login", function($scope, $modalInstance, title, uploadFactory, User, Post, login) {

	$scope.title = title;
	$scope.post = [];

	$scope.user = login.getUser();

	// Video upload
	function uploadVideo(file, callback) {
		uploadFactory(file).success(function(data) {
			// console.log("saved video file, public path: ", data);
			//videoPath = data;
			$scope.videoPaths.push(data);
			callback();
			// success alert for image upload
			//$scope.successAlert = "DONE! the video successfully uploaded.";
		}).error(function(data) {
			//error alert for video upload
			$scope.errorAlert = "OUCH! the video did not upload.";

			console.log("Error on upload: ", data);
		});
	}

	// videopostSubmit handler
	$scope.videoPostSubmit = function() {
		var tags = [];
		if($scope.tags){
			for (var i = 0; i < $scope.tags.length; i++) {
				tags.push($scope.tags[i].text);
			}
		}

		// console.log("Submit event for post: working!!!");
		$scope.videoPaths = [];

		$scope.videos.forEach(function(video, index) {
			var i = index;
			uploadVideo($scope.videos[i], function() {
				if (i === $scope.videos.length -1) {
					var currentDate = new Date();
					var newPostId, newPost = Post.create(
					{
						content: $scope.content,
						videos: $scope.videoPaths,
						tags: tags,
						createdAt: currentDate
					}, function(data) {
						if(!data.status){
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
							// success alert
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
