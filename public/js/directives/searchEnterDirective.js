app.directive("searchEnter", function (){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind("keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.searchEnter, { 'event': event});
                    });

                    event.preventDefault();
                }
            });
        } 
    }
});
