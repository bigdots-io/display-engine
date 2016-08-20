"use strict";
var ProgrammableMacro = require('./macros/programmable');
var UnsupportedMacro = require('./macros/unsupported');
var TwinkleMacro = require('./macros/twinkle');

var Macros = {};
Macros[ProgrammableMacro.identifier()] = ProgrammableMacro;
Macros[TwinkleMacro.identifier()] = TwinkleMacro;

class Display {
  constructor(key, db) {
    this.key = key;
    this.db = db;
  }

  static registeredMacros() {
    return Object.keys(Macros);
  }

  load(callbacks) {
    var displayRef = this.db.ref(`displays/${this.key}/`);
    displayRef.on('value', (snapshot) => {
      var displayData = snapshot.val(),
          mode = displayData.mode,
          options = {
            modeData: displayData.modes[mode],
            dimensions: {
              width: displayData.width,
              height: displayData.height
            },
            db: this.db,
            callbacks: {
              onPixelChange: (y, x, hex) => {
                callbacks.onPixelChange(y, x, hex);
              }
            }
          };

      if(this.displayMode) {
        this.displayMode.stop();
      }

      if(Macros[displayData.mode]) {
        this.displayMode = new Macros[displayData.mode](options);
      } else {
        this.displayMode = new UnsupportedMacro(options);
      }

      this.displayMode.start();
    });
  }
}

module.exports = Display;
