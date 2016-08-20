"use strict";

var Macro = require('./macro');

class SolidColorMacro extends Macro {
  static identifier() {
    return 'starting-up';
  }

  start() {
    var height = this.dimensions.height,
        width = this.dimensions.width,
        color = this.modeData.color;

    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        this.callbacks.onPixelChange(y, x, color);
      }
    }
  }

  stop() {
    // nothing...
  }
}

module.exports = SolidColorMacro;