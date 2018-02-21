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
   
## Add options to create your custom effect:
  ```javascript
  shadowColor:"#000" //string with color (rgb,rgba, HEX)
  blur:"10px" //Blur of shadow
  maxShift:100 //Max shift of shadow in px
  ```
### Example of adding options:
