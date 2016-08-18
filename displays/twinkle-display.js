"use strict";

var firebase = require("firebase");

class TwinkleDisplay {
  constructor(modeData, dimensions, callbacks) {
    this.modeData = modeData;
    this.dimensions = dimensions;
    this.callbacks = callbacks
  }

  start() {
    var height = this.dimensions.height,
        width = this.dimensions.width,
        seedColor = this.modeData.seedColor;

    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        this.callbacks.onPixelChange(y, x, generateColorShade(seedColor));
      }
    }

    this.interval = setInterval(() => {
      for(let i = 0; i < 100; i++) {
        var y = Math.floor(Math.random() * ((height - 1) - 0 + 1)) + 0;
        var x = Math.floor(Math.random() * ((width - 1) - 0 + 1)) + 0;
        this.callbacks.onPixelChange(y, x, generateColorShade(seedColor));
      }
    }, 100)
  }

  stop() {
    clearInterval(this.interval);
  }
}

function generateColorShade(seedColor) {
  var colors = [];

  colors.push(colorLuminance(seedColor, 0))
  colors.push(colorLuminance(seedColor, -0.2))
  colors.push(colorLuminance(seedColor, -0.4))
  colors.push(colorLuminance(seedColor, -0.6))
  colors.push(colorLuminance(seedColor, -0.7))
  colors.push(colorLuminance(seedColor, -0.8))
  colors.push(colorLuminance(seedColor, -0.9))

  var index = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
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
