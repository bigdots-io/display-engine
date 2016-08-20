"use strict";

var Macro = require('./macro');

class UnsupportedMacro extends Macro {
  static identifier() {
    return 'unsupported';
  }

  start() {
    var height = this.dimensions.height,
        width = this.dimensions.width;

    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        this.callbacks.onPixelChange(y, x, '#000');
      }
    }
    
    data.forEach((item) => {
      this.callbacks.onPixelChange(item[0], item[1], '#FFFFFF');
    });
  }

  stop() {
    // Nothing..
  }
}

var data = [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0]
];

module.exports = UnsupportedMacro;
