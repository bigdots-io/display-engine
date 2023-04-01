"use strict";

var Macro = require('./macro');

const identifier = 'marquee';

class MarqueeMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {
      color: '#FFFFFF',
      backgroundColor: '#000000',
      font: 'system-16',
      text: 'Replace with marquee text!',
      speed: 50
    };
  }

  start() {
    this.setColor(this.config.backgroundColor);

    var coordinates = [];
    var result = this.dotGenerator.text({
      font: this.config.font,
      startingColumn: this.dimensions.width,
      wrap: 'no-wrap',
      text: this.config.text,
      color: this.config.color
    });

    result.dots.forEach((dot) => {
      this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
      coordinates.push({y: dot.y, x: dot.x});
    });

    var messageLength = result.width;

    var offset = 0;

    this.interval = setInterval(() => {
      coordinates.forEach((coordinate) => {
        this.callbacks.onPixelChange(coordinate.y, coordinate.x - offset, this.config.backgroundColor);
      });
      coordinates.forEach((coordinate) => {
        this.callbacks.onPixelChange(coordinate.y, coordinate.x - (offset + 1), this.config.color);
      });

      var loopPoint = (this.dimensions.width > messageLength ? this.dimensions.width : messageLength);

      if(offset > loopPoint) {
        offset = 0;
      }

      offset += 1;
    }, this.config.speed);
  }

  stop() {
    clearInterval(this.interval);
  }
}

module.exports = MarqueeMacro;
