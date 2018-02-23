(function ($) {
  jQuery.fn.mouseMoveShadow = function (options) {


    var options = $.extend({
      shadowColor: "#861f1f",
      blur: 0,
      maxShift: 200,
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

    var myThis = $(this);

    //Get center of our shadowing object
    var offset = myThis.offset();
    var width = myThis.width();
    var height = myThis.height();
    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;


    var viewportHeight = $(window).height();
    var viewportWidth = $(window).width();


    var colorsLine = [];
    if (options.changeColor.isChange) {
      for (key in options.changeColor.values) {
        colorsLine.push([key / 100, getColorFromRGBString(options.changeColor.values[key])])
      }
    }


    var make = function () {

      $('body').mousemove(function (e) {

        //Current shift of mouse from center of object to edge of screen
        var currentShiftX = e.pageX - centerX;
        var currentShiftY = e.pageY - centerY;

        //Current shift in percents
        var currentShiftXProportion = currentShiftX / (viewportWidth - centerX);
        var currentShiftYProportion = currentShiftY / (viewportHeight - centerY);

        var direction = options.reverseShadow ? -1 : 1;
        var shadowShiftX = direction * options.maxShift * currentShiftXProportion;
        var shadowShiftY = direction * options.maxShift * currentShiftYProportion;

        //Count distance from center to angle, then to mouse position
        var maxDistanceFromElementCenter = countHypotenuse(viewportWidth - centerX, viewportHeight - centerY);
        var currentDistanceFromElementCenter = countHypotenuse(currentShiftX, currentShiftY);
        var currentDistanceFromElementCenterProprtion = currentDistanceFromElementCenter / maxDistanceFromElementCenter;


        var shadowColor = options.shadowColor;

        //TODO бинарный поиск
        var currentLeftSideColors;
        if (colorsLine) {
          colorsLine.forEach(function (color, i, colors) {
            if (Math.abs(currentDistanceFromElementCenterProprtion) > color[0]) {
              if (i != (colors.length - 1)) {
                currentLeftSideColors = [colors[i], colors[++i]];
              }
              else {
                currentLeftSideColors = [colors[i], [1, colors[i][1]]];
              }
            }
          })
        }

        //РЕЗКОЕ ИЗМЕНЕНИЕ
        shadowColor = "rgb("+currentLeftSideColors[0][1][0]+","+currentLeftSideColors[0][1][1]+","+currentLeftSideColors[0][1][2]+")";


        //TODO плавное изменение
        var start = maxDistanceFromElementCenter * currentLeftSideColors[0][0];
        var colorChangeDistance = [maxDistanceFromElementCenter * currentLeftSideColors[0][0] - start, maxDistanceFromElementCenter * currentLeftSideColors[1][0] - start];

        var distanceMouse = currentDistanceFromElementCenter - start;
        var distanceInterval = colorChangeDistance[1]-colorChangeDistance[0];
        var distanceMouseProportion = distanceMouse/distanceInterval;


        var countedColors = [];

        currentLeftSideColors[0][1].forEach(function(color,i,colors){
          var difference = currentLeftSideColors[0][1][i]-currentLeftSideColors[1][1][i];


          if(difference<=0){
            countedColors.push(Math.round(Number(currentLeftSideColors[0][1][i])+Number(Math.abs(difference)*distanceMouseProportion)));
          }
          else{
            countedColors.push(Math.round(Number(currentLeftSideColors[0][1][i])-Number(Math.abs(difference)*distanceMouseProportion)));
          }

        });


        shadowColor = "rgb("+countedColors[0]+","+countedColors[1]+","+countedColors[2]+")";



        var blur = options.changeBlur.fromCenter ? options.blur + (currentDistanceFromElementCenter / maxDistanceFromElementCenter) * options.changeBlur.valueOfChange : (1 - (currentDistanceFromElementCenter / maxDistanceFromElementCenter)) * options.changeBlur.valueOfChange;

        var boxShadowConfig = "drop-shadow(" + shadowShiftX + "px " + shadowShiftY + "px " + blur + "px " + shadowColor + ")";

        //console.log(boxShadowConfig);
        $(myThis).css('filter', boxShadowConfig);
      })
    };

    return this.each(make);
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