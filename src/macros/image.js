"use strict";

var Macro = require('./macro');

const identifier = 'image';

class ImageMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {
      url: '',
      speed: 10
    };
  }

  start() {
    var url = this.config.url;
    this.currentFrame = 0;

    this.dotGenerator.image(url, {
      onSuccess: (result) => {
        if(result.animated) {
          this.interval = setInterval(() => {
            this.currentFrame++;

            if(this.currentFrame >= result.data.length) {
              this.currentFrame = 0;
            }

            result.data[this.currentFrame].forEach((dot) => {
              this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
            });
          }, this.config.speed);

        } else {
          result.data.forEach((dot) => {
            this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
          });
        }
      }
    });
  }

  stop() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }
}

module.exports = ImageMacro;
