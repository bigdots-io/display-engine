"use strict";

var Macro = require('./macro');

class StartingUpMacro extends Macro {
  static identifier() {
    return 'starting-up';
  }

  start() {
    var height = this.dimensions.height,
        width = this.dimensions.width;
        
    this.frameIndex = 0;

    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        this.callbacks.onPixelChange(y, x, '#000');
      }
    }
    this.interval = setInterval(() => {
      for (let key in frames[this.frameIndex]) {
        var [y, x] = key.split(':'),
            hex = frames[this.frameIndex][key].hex;
        this.callbacks.onPixelChange(y, x, hex);
      }

      if(this.frameIndex == frames.length - 1) {
        this.frameIndex = 0;
      } else {
        this.frameIndex = this.frameIndex + 1;
      }

    }, 100);
  }

  stop() {
    clearInterval(this.interval);
  }
}

var frames = [
  {
    '0:0': {hex: '#990000'},
    '0:1': {hex: '#000000'},
    '0:2': {hex: '#000000'},
    '0:3': {hex: '#000000'},
    '0:4': {hex: '#000000'},
    '0:5': {hex: '#000000'},
    '0:6': {hex: '#000000'},
    '0:7': {hex: '#000000'}
  }, {
    '0:0': {hex: '#990000'},
    '0:1': {hex: '#CC4400'},
    '0:2': {hex: '#000000'},
    '0:3': {hex: '#000000'},
    '0:4': {hex: '#000000'},
    '0:5': {hex: '#000000'},
    '0:6': {hex: '#000000'},
    '0:7': {hex: '#000000'}
  }, {
    '0:0': {hex: '#990000'},
    '0:1': {hex: '#CC4400'},
    '0:2': {hex: '#FFAA00'},
    '0:3': {hex: '#000000'},
    '0:4': {hex: '#000000'},
    '0:5': {hex: '#000000'},
    '0:6': {hex: '#000000'},
    '0:7': {hex: '#000000'}
  }, {
    '0:0': {hex: '#990000'},
    '0:1': {hex: '#CC4400'},
    '0:2': {hex: '#FFAA00'},
    '0:3': {hex: '#CCCC00'},
    '0:4': {hex: '#000000'},
    '0:5': {hex: '#000000'},
    '0:6': {hex: '#000000'},
    '0:7': {hex: '#000000'}
  }, {
    '0:0': {hex: '#990000'},
    '0:1': {hex: '#CC4400'},
    '0:2': {hex: '#FFAA00'},
    '0:3': {hex: '#CCCC00'},
    '0:4': {hex: '#88CC00'},
    '0:5': {hex: '#000000'},
    '0:6': {hex: '#000000'},
    '0:7': {hex: '#000000'}
  }, {
    '0:0': {hex: '#990000'},
    '0:1': {hex: '#CC4400'},
    '0:2': {hex: '#FFAA00'},
    '0:3': {hex: '#CCCC00'},
    '0:4': {hex: '#88CC00'},
    '0:5': {hex: '#00CC88'},
    '0:6': {hex: '#000000'},
    '0:7': {hex: '#000000'}
  }, {
    '0:0': {hex: '#990000'},
    '0:1': {hex: '#CC4400'},
    '0:2': {hex: '#FFAA00'},
    '0:3': {hex: '#CCCC00'},
    '0:4': {hex: '#88CC00'},
    '0:5': {hex: '#00CC88'},
    '0:6': {hex: '#0066CC'},
    '0:7': {hex: '#000000'}
  }, {
    '0:0': {hex: '#990000'},
    '0:1': {hex: '#CC4400'},
    '0:2': {hex: '#FFAA00'},
    '0:3': {hex: '#CCCC00'},
    '0:4': {hex: '#88CC00'},
    '0:5': {hex: '#00CC88'},
    '0:6': {hex: '#0066CC'},
    '0:7': {hex: '#CC00CC'}
  }
];

module.exports = StartingUpMacro;
