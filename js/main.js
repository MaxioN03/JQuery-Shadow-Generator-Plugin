$(document).ready(function () {


  $('#test-block').mouseMoveShadow({
    //parentElem: $('.test-container'),
    changeColor: {
      isChange: true,
      fromCenter: true,
      values: {
        0: "RGB(254,218,117)",
        25: "RGB(250,126,30)",
        50: "RGB(214,41,118)",
        75: "RGB(150,47,191)",
        100: "RGB(79,91,213)",

      }
    }
  });

})
