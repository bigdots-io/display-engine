var firebase = require("firebase");

class TwinkleDisplay {
  constructor(modeData, dimensions, callbacks) {
    for(var y = 0; y < dimensions.height; y++) {
      for(var x = 0; x < dimensions.width; x++) {
        callbacks.onPixelChange(y, x, generateColorShade(modeData.seedColor));
      }
    }

    this.interval = setInterval(() => {
      for(let i = 0; i < 100; i++) {
        var y = Math.floor(Math.random() * ((dimensions.height - 1) - 0 + 1)) + 0;
        var x = Math.floor(Math.random() * ((dimensions.width - 1) - 0 + 1)) + 0;
        callbacks.onPixelChange(y, x, generateColorShade(modeData.seedColor));
      }
    }, 100)
  }
}

function generateColorShade(seedColor) {
  var colors = [];

  colors.push(colorLuminance(seedColor, 0))
  colors.push(colorLuminance(seedColor, -0.1))
  colors.push(colorLuminance(seedColor, -0.2))
  colors.push(colorLuminance(seedColor, -0.3))
  colors.push(colorLuminance(seedColor, -0.4))
  colors.push(colorLuminance(seedColor, -0.5))
  colors.push(colorLuminance(seedColor, -0.7))

  var index = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
  return colors[index];
}

function colorLuminance(hex, lum) {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}

module.exports = TwinkleDisplay;
