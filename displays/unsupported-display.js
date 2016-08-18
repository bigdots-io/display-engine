"use strict";

class UnsupportedDisplay {
  constructor(modeData, dimensions, callbacks) {
    this.callbacks = callbacks;
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

module.exports = UnsupportedDisplay;
