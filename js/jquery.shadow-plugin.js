(function ($) {
  jQuery.fn.mouseMoveShadow = function (options) {



    var options = $.extend({
      shadowColor: "#370b31",
      blur: 0,
      maxShift: 100,
      reverseShadow: true,
      changeBlur: {
        fromCenter: true,
        valueOfChange: 0,
      },
      //TODO Изменения цвета (для начала в RGB)
      changeColor: {
        fromCenter: true,
      }
    }, options);

    var colorsLine = [];
    if (options.changeColor.isChange) {
      for (key in options.changeColor.values) {
        //console.log(getColorFromRGBString(options.changeColor.values[key]));
        colorsLine.push([key/100,getColorFromRGBString(options.changeColor.values[key])])
      }
    }

    console.log(colorsLine);

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
        var currentShiftXProportion = currentShiftX / (viewportWidth-centerX);
        var currentShiftYProportion = currentShiftY / (viewportHeight-centerY);



        var direction = options.reverseShadow ? -1 : 1;
        var shadowShiftX = direction * options.maxShift * currentShiftXProportion;
        var shadowShiftY = direction * options.maxShift * currentShiftYProportion;

        //Count distance from center to angle, then to mouse position
        var maxDistanceFromElementCenter = countHypotenuse(viewportWidth - centerX, viewportHeight - centerY);
        var currentDistanceFromElementCenter = countHypotenuse(currentShiftX, currentShiftY);
        var currentDistanceFromElementCenterProprtion = currentDistanceFromElementCenter/maxDistanceFromElementCenter;

        //console.log(currentDistanceFromElementCenterProprtion)



        var shadowColor = options.shadowColor;

        if(colorsLine){
          colorsLine.forEach(function(color,i,colors){
            var lastColorsElement;
            if(Math.abs(currentDistanceFromElementCenterProprtion)>color[0]){
              lastColorsElement = color;
              // РЕЗКОЕ ИЗМЕНЕНИЕ
              shadowColor = "rgb("+color[1][0]+","+color[1][1]+","+color[1][2]+")";
              //TODO плавное изменение
              /*if(i!=colors.length-1){
                let start = colors[i][0];
                let end = colors[++i][0];
                console.log(start+":"+end);
              }*/
            }
          })
        }

        var blur = options.changeBlur.fromCenter ? options.blur + (currentDistanceFromElementCenter / maxDistanceFromElementCenter) * options.changeBlur.valueOfChange : (1 - (currentDistanceFromElementCenter / maxDistanceFromElementCenter)) * options.changeBlur.valueOfChange;

        var boxShadowConfig = "drop-shadow(" + shadowShiftX + "px " + shadowShiftY + "px " + blur + "px " + shadowColor + ")";

        //console.log(boxShadowConfig);
        $(myThis).css('filter', boxShadowConfig);
      })
    };

    return this.each(make);
    // в итоге, метод responsiveBlock вернет текущий объект jQuery обратно
  };

  function countHypotenuse(a, b) {
    return Math.sqrt(a * a + b * b);
  }

  function getColorFromRGBString(RGBString) {
    var rgb = RGBString.substring(4, RGBString.length - 1)
        .replace(/ /g, '')
        .split(',');

    return rgb;
  }

})(jQuery);