//"addit" controller.
app.controller("userpageController", ["$http", "$scope", "User", "Post", "$modal", "$log", "$routeParams", "$location", "addPostFactory", "login", function($http, $scope, User, Post, $modal, $log, $routeParams, $location, addPostFactory, login) {
	// console.log("userpageController: I'm alive!");

	login.getUser(function(data) {
		$scope.user = data;
		$scope.posts = Post.get({author: data._id, _populate:"author"});
	});

	$scope.deletePost = function(post) {
		var deletePost = confirm("Are you sure you want to delete the post?");
		if(deletePost) {
			// Remove the element from the array
			var index = $scope.posts.indexOf(post);
			$scope.posts.splice(index, 1);
			// Update the user's posts (with the posts that are not deleted - if any)
			User.update({_id: login.user._id}, {posts: $scope.posts}, function(data) { //callback
				if (!data.status) {
					// Delete post from db
					Post.remove({_id: post._id},function(){
						console.log("Post was successfully deleted");
					});
				}
			});
			
		} else {
			console.log("Post was not deleted");
		}
	};

	$scope.openEditPost = function(post, size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'partials/textpost.html',
			controller: 'editPostController',
			size: size,
			resolve: {
				title: function() {
					return "Edit Post";
				},
				post: function() {
					return post;
				}
			}
		});

		modalInstance.result.then(function (data) {
			console.log("Modal closed, and sent ", data);
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	if ($routeParams.op && $routeParams.op == 'add') {
		addPostFactory.openAddPost('Choose, then addIt.', 'partials/addpost.html', 'modalController');
	}

}]);
