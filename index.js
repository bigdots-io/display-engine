"use strict";

var ProgrammableDisplay = require('./displays/programmable-display');
var UnsupportedDisplay = require('./displays/unsupported-display');
var TwinkleDisplay = require('./displays/twinkle-display');
var firebase = require("firebase");

class Display {
  constructor(key) {
    this.key = key;

  }

  load(callbacks) {
    var displayRef = firebase.database().ref(`displays/${this.key}/`);
    displayRef.on('value', (snapshot) => {
      console.log("Change")
      
      var displayData = snapshot.val(),
          mode = displayData.mode,
          modeData = displayData.modes[mode],
          dimensions = {
            width: displayData.width,
            height: displayData.height
          };

      if(this.displayMode) {
        this.displayMode.stop();
      }

      switch(displayData.mode) {
        case 'programmable':
          this.displayMode = new ProgrammableDisplay(modeData, dimensions, {
            onPixelChange: (y, x, hex) => {
              callbacks.onPixelChange(y, x, hex);
            }
          });
          break;

        case 'twinkle':
          this.displayMode = new TwinkleDisplay(modeData, dimensions, {
            onPixelChange: (y, x, hex) => {
              callbacks.onPixelChange(y, x, hex);
            }
          });
          break;

        default:
          this.displayMode = new UnsupportedDisplay(modeData, dimensions, {
            onPixelChange: (y, x, hex) => {
              callbacks.onPixelChange(y, x, hex);
            }
          });
      }
    });
  }
}

module.exports = Display;
