app.controller( "signUpController", ["$http", "$scope", "$modal", "$log", function( $http, $scope, $modal, $log ) {
	// console.log( "signUpController is up and running." );

  
  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/signup.html',
      controller: 'modalController',
      size: size,
      resolve: {
        title: function() {
          return "Sign up for an Addit account";
        }
      }
    });

    modalInstance.result.then(function (data) {
      console.log("Modal closed, and sent ", data);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  
}]);