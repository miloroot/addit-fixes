app.controller( "loginController", ["$http", "$scope", "$modal", "$log", function( $http, $scope, $modal, $log) {
	// console.log( "loginController Working!!!" );

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/login.html',
      controller: 'modalController',
      size: size,
      resolve: {
        title: function() {
          return "Log in to your account";
        }
      }
    });

    modalInstance.result.then(function (data) {
      console.log("Modal for login closed, and sent", data);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);
