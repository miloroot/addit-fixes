app.directive("appLoader", ["login", "$route", function(login, $route) {
  // this directive only exists to instantiate Login and provide $route to
  // the included ng-view in the directive .html file
  return {
    restrict: "E",
    templateUrl: 'js/directives/appLoader.html'
  };
}]);