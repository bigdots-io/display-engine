import { colorLuminance } from "../colors";
export var startTwinkleMacro = function (config, dimensions, onPixelChange) {
    var height = dimensions.height, width = dimensions.width;
    var color = config.color, speed = config.speed;
    var shades = [
        colorLuminance(color, 0),
        colorLuminance(color, -0.5),
        colorLuminance(color, -0.8),
        colorLuminance(color, -0.8),
        colorLuminance(color, -0.8),
        colorLuminance(color, -1),
    ];
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            onPixelChange({ y: y, x: x, hex: randomColorShade(shades) });
        }
    }
    setInterval(function () {
        for (var i = 0; i < 100; i++) {
            var y = Math.floor(Math.random() * (height - 1 - 0 + 1)) + 0;
            var x = Math.floor(Math.random() * (width - 1 - 0 + 1)) + 0;
            onPixelChange({ y: y, x: x, hex: randomColorShade(shades) });
        }
    }, speed);
};
function randomColorShade(shades) {
    var index = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    return shades[index];
}
