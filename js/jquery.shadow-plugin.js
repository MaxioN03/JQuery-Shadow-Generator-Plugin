(function ($) {
  jQuery.fn.addScrollShadow = function (options) {

    var options = $.extend({
      shadowColor:"#ddd",
      blur:"10px",
      maxShift:100,
      reverseShadow:true,
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
        var shadowShiftX = direction*options.maxShift*currentShiftXProportion;
        var shadowShiftY = direction*options.maxShift*currentShiftYProportion;



        var boxShadowConfig = shadowShiftX + "px " + shadowShiftY + "px " + options.blur + options.shadowColor;

        //console.log(boxShadowConfig);

        $(myThis).css('box-shadow', boxShadowConfig);
      })
    };

    return this.each(make);
    // в итоге, метод responsiveBlock вернет текущий объект jQuery обратно
  };
})(jQuery);