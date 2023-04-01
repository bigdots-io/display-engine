"use strict";

var Macro = require('./macro');

const identifier = 'unsupported';

class UnsupportedMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  start() {
    this.setColor('#000000');

    var result = this.dotGenerator.text({
      text: 'UNSUPPORTED',
      font: 'system-6',
      color: '#FFFFFF',
      alignment: 'center',
      width: this.dimensions.width,
      height: this.dimensions.height
    });

    result.dots.forEach((dot) => {
      this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
    });
  }

  stop() {
    // Nothing..
  }
}

module.exports = UnsupportedMacro;
