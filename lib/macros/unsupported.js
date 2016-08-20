"use strict";

var Macro = require('./macro');

class UnsupportedMacro extends Macro {
  static identifier() {
    return 'unsupported';
  }

  start() {
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
