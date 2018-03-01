# Jquery Shadow Plugin

Jquery plugin for creating shadow effect with elements on your page. Plugin help to create interactive actions with mousemove.

## To install: 
1. Install [JQuery](https://jquery.com/download/ "Jquery installing page")
  
    Example: 
    ```javascript
    <script src="../js/jquery-3.3.1.min.js"></script>
    ```
2. Connect *jquery.shadow-plugin.js* [here](https://github.com/MaxioN03/JQuery-Shadow-Generator-Plugin/blob/master/js/jquery.shadow-plugin.js "GitHub link")
    ```javascript
    <script src="../js/jquery.shadow-plugin.js"></script>
    ```
3. Use it!  
 ```html
 <!DOCTYPE html>
<html>
<head>
  <title>Shadow Plugin</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <div class="test-block" id="test-block"></div>
<script src="../js/jquery-3.3.1.min.js"></script>
<script src="../js/jquery.shadow-plugin.js"></script>

<script>
  //Here we use plugin
  $('#test-block').addScrollShadow();
</script>
</body>
</html>
```

![Example image of shadow](https://pp.userapi.com/c841027/v841027794/6de62/3gPJFhuRpeo.jpg "Element shadow")
   
## Possible options:
  ```javascript
      shadowColor: "#861f1f", //Color of your Shadow
      blur: 0,  //Value of your blur
      maxShift: 50, //Max shift of your shadow
      reverseShadow: true,  //If true, mouse in one side of your shadow element, shadow in another side
      reverseAxis: false, //If true, when move mouse in X Axis, shadow move in Y Axis, the same is true for the Y axis
      overScreen: true, //If true, shadow can cross over screen edge. If false, shadow always stay in border of screen
      changeBlur: { //Change blur wen moving mouse
        fromCenter: true,
        valueOfChange: 0,
      },
      changeColor: {
        isChange: true,
        fromCenter: true, //direction of changing (NOT WORKING NOW)
        smoothChange: true, //If true, color change smoot from one color to another
        values: { //Object with strcuture PERCENT OF MAX DISTANCE : COLOR, MAX DISTANCE - DISTANCE FROM ELEMENT CENTER TO SCREEN ANGLE
          0: "RGB(254,218,117)",
          25: "RGB(250,126,30)",
          50: "RGB(214,41,118)",
          75: "RGB(150,47,191)",
          100: "RGB(79,91,213)",
        }
      }
  ```
  
## Example of adding options:
  ```javascript
$(document).ready(function () {

  $('#test-block').mouseMoveShadow({
    changeColor: {
      isChange: true,
      fromCenter: true,
      smoothChange: false,
      values: {
        0: "RGB(254,218,117)",
        25: "RGB(250,126,30)",
        50: "RGB(214,41,118)",
        75: "RGB(150,47,191)",
        100: "RGB(79,91,213)",
      }
    }
  });
  
});
  ```
