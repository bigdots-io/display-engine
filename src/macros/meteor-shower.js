"use strict";

var Macro = require('./macro');

const identifier = 'meteor-shower';

class MeteorShowerMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {
      color: '#FFFFFF',
      meteorCount: 40,
      maxTailLength: 20,
      minTailLength: 5,
      maxDepth: 5,
      minSpeed: 100,
      maxSpeed: 10
    };
  }

  start() {
    this.setColor('#000000');

    var meteors = [],
        validStartingPoints = [];

    for(let i = 0; i < (this.dimensions.width + this.dimensions.height); i++) {
      validStartingPoints.push(i);
    }

    var generateMeteor = () => {
      var tailLength = Math.floor(Math.random() * (this.config.maxTailLength - this.config.minTailLength)) + this.config.minTailLength,
          depth = Math.floor(Math.random() * (this.config.maxDepth - 1)) + 1,
          startingX = validStartingPoints[Math.floor(Math.random() * validStartingPoints.length)];

      return {
        tailLength: tailLength,
        speed: Math.floor(Math.random() * (this.config.minSpeed - this.config.maxSpeed)) + this.config.maxSpeed,
        colors: generateColorShade(this.config.color, tailLength, depth),
        moveCount: 0,
        complete: false,
        startingX: startingX,
        path: [{
          x: startingX,
          y: 0
        }]
      }
    }

    var seedMeteor = () => {
      let meteor = generateMeteor();
      meteors.push(meteor);
      var index = validStartingPoints.indexOf(meteor.path[0].x);
      validStartingPoints.splice(index, 1);
      this.callbacks.onPixelChange(meteor.path[0].y, meteor.path[0].x, meteor.colors[0]);
    }

    for(let i = 0; i < this.config.meteorCount; i++) {
      seedMeteor();
    }

    this.interval = setInterval(() => {
      meteors = meteors.filter(function(meteor) {
        return meteor.complete == false;
      });

      for(let i = meteors.length; i < this.config.meteorCount; i++) {
        seedMeteor();
      }

      meteors.forEach((meteor, i) => {
        meteors[i].moveCount += 10;

        if(meteors[i].moveCount > meteor.speed) {
          meteors[i].moveCount = 0;

          if((this.dimensions.height + meteor.tailLength) > (meteor.path[0].y)) {
            meteors[i].path.unshift({x: meteor.path[0].x - 1, y: meteor.path[0].y + 1});
            if((meteors[i].path.length) > meteor.tailLength) {
              meteors[i].path.pop();
            }
          } else {
            meteors[i].complete = true
            validStartingPoints.push(meteor.startingX)
          }

          meteor.path.forEach((dot, i) => {
            this.callbacks.onPixelChange(dot.y, dot.x, meteor.colors[i]);
          });
        }
      });
    }, 10)
  }

  stop() {
    clearInterval(this.interval);
  }
}

function generateColorShade(seedColor, length, depth) {
  var colors = [],
      interval = 1 / (length - 1);

  if(depth !== 1) {
    seedColor = colorLuminance(seedColor, Math.round(-(1/depth) * 10) / 10);
  }

  for(let i = 0; i < 1; i = i + interval) {
    colors.push(colorLuminance(seedColor, -i))
  }

  if(colors.length < length) {
    colors.push('#000000');
  }

  return colors;
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

module.exports = MeteorShowerMacro;
