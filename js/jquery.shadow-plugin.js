(function ($) {
  jQuery.fn.mouseMoveShadow = function (options) {


    var options = $.extend({
      shadowColor: "#370b31",
      blur: 5,
      maxShift: 50,
      reverseShadow: true,
      changeBlur: {
        fromCenter: true,
        valueOfChange: 10,
      },
      //TODO Изменения цвета (для начала в RGB)
      changeColor: {
        fromCenter: true,
      }
    }, options);

    var make = function () {
      var myThis = $(this);
      // реализация работы метода с отдельным элементом страницы
      $('body').mousemove(function (e) {
        //console.log("X: "+e.pageX);
        //console.log("Y: "+e.pageY);
        //console.log("Viewport height: "+$( window ).height());
        //console.log("Viewport width: "+$( window ).width());

        var viewportHeight = $(window).height();
        var viewportWidth = $(window).width();

        //Get center of our shadowing object
        var offset = myThis.offset();
        var width = myThis.width();
        var height = myThis.height();
        var centerX = offset.left + width / 2;
        var centerY = offset.top + height / 2;

        //Current shift of mouse from center of object to edge of screen
        var currentShiftX = e.pageX - centerX;
        var currentShiftY = e.pageY - centerY;

        //Current shift in percents
        var currentShiftXProportion = currentShiftX / (viewportWidth);
        var currentShiftYProportion = currentShiftY / (viewportHeight);

        var direction = options.reverseShadow ? -1 : 1;
        var shadowShiftX = direction * options.maxShift * currentShiftXProportion;
        var shadowShiftY = direction * options.maxShift * currentShiftYProportion;

        //Count distance from center to angle, then to mouse position
        var maxDistanceFromElementCenter = countHypotenuse(viewportWidth - centerX, viewportHeight - centerY);
        var currentDistanceFromElementCenter = countHypotenuse(currentShiftX, currentShiftY);

        var blur = options.changeBlur.fromCenter ? options.blur + (currentDistanceFromElementCenter / maxDistanceFromElementCenter) * options.changeBlur.valueOfChange : (1-(currentDistanceFromElementCenter/maxDistanceFromElementCenter))*options.changeBlur.valueOfChange;

        var boxShadowConfig = "drop-shadow(" + shadowShiftX + "px " + shadowShiftY + "px " + blur + "px " + options.shadowColor + ")";

        console.log(boxShadowConfig);
        //filter: drop-shadow(0px 15px 0 #000);
        $(myThis).css('filter', boxShadowConfig);
      })
    };

    return this.each(make);
    // в итоге, метод responsiveBlock вернет текущий объект jQuery обратно
  };

  function countHypotenuse(a, b) {
    return Math.sqrt(a * a + b * b);
  }

})(jQuery);