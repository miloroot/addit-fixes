app.directive('whenScrolled', function($window, $timeout) {
  return {
    restrict: "A",
    link: function(scope, element, attr) {

      // bind the digest cycle to be triggered by the scroll event
      // when it exceeds a threshold
      angular.element($window).bind('scroll', function() {

        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        var scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ? 
        document.documentElement.scrollTop : document.body.scrollTop;

        var iScroll = element.prop('offsetTop') + element.prop('offsetHeight');
        var iScrooling =  scrollY + ( this.screen.height * 0.9 );

        console.log(iScrooling+'/'+iScroll);

        if ( iScrooling >= iScroll ) {
          angular.element($window)[0].requestAnimationFrame(function(){
            // invoke the function passed into the 'whenScrolled' attribute
            scope.$apply(attr.whenScrolled);

          })
        }

      });
    }
  }
});