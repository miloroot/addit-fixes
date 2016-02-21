    app.controller('galleryController',["$http", "$scope", "User", "Post", "$modal", "$log", function($http, $scope, User, Post, $modal, $log) {
        this.current = 0;
        this.setCurrent = function(imagePath) {
            this.current = imagePath || 0;
        };

    $scope.video = function(e) {
        var videoElements = angular.element(e.srcElement);
        videoElements[0].start();
    }
    }]);