app.factory("addPostFactory", ["$modal", "$log", "$location", function($modal, $log, $location) {
	
	function openAddPost(title, templateUrl, controller, size, animationsEnabled) {

		var modalInstance = $modal.open({
			animation: animationsEnabled,
			templateUrl: templateUrl,
			controller: controller,
			size: size,
			resolve: {
				title: function() {
					return title;
				}
			}
		});

		modalInstance.result.then(function (type) {
			if(type == "image") {
				openAddPost('Add Image Post', 'partials/imagepost.html', 'imagePostController');
			} else if(type == "video") {
				openAddPost('Add Video Post', 'partials/videopost.html', 'videoPostController');
			} else if(type == "text") {
				openAddPost('Add Text Post', 'partials/textpost.html', 'textPostController');
			} else {
				$location.path('/userpage');
			}
			console.log("Modal closed");
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
			$location.path('/userpage');
		});
	}

	return {
		openAddPost: openAddPost
	};
}]);