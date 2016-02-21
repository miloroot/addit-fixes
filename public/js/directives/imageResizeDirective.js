app.directive("imageResize", [
  "$parse", function($parse) {
    return {
      link: function(scope, elm, attrs) {
        var imagePercent;
        imagePercent = $parse(attrs.imagePercent)(scope);
        return elm.one("load", function() {
          var canvas, ctx, neededHeight, neededWidth;
          neededHeight = elm[0].height * imagePercent / 100;
          neededWidth = elm[0].width * imagePercent / 100;
          canvas = document.createElement("canvas");
          canvas.width = neededWidth;
          canvas.height = neededHeight;
          ctx = canvas.getContext("2d");
          ctx.drawImage(elm[0], 0, 0, neededWidth, neededHeight);
          return elm.attr('src', canvas.toDataURL("image/jpeg"));
        });
      }
    };
  }
]);