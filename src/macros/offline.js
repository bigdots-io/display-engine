"use strict";

var Macro = require('./macro');

const identifier = 'offline';

class OfflineMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {};
  }

  start() {
    this.setColor('#000000');

    var backgroundHeight = 10,
        topMargin = (this.dimensions.height - backgroundHeight) / 2;

    for(var x = 0; x < this.dimensions.width; x++) {
      for(var y = 0; y < backgroundHeight; y++) {
        this.callbacks.onPixelChange(y + topMargin, x, '#8e0101');
      }
    }

    var result = this.dotGenerator.text({
      font: 'system-6',
      startingColumn: 3,
      startingRow: topMargin + 2,
      text: 'OFFLINE',
      color: '#FFFFFF',
      width: this.dimensions.width,
      height: this.dimensions.height
    });

    setTimeout(() => {
      result.dots.forEach((dot) => {
        this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
      });
    }, 500);
  }

  stop() {
    this.setColor('#000000');
  }
}

module.exports = OfflineMacro;
