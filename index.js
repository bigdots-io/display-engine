"use strict";

var MacroManager = require('./lib/macro-manager');

var macroManager = new MacroManager();
macroManager.registerMacros();

class Display {
  constructor(key, db) {
    this.key = key;
    this.db = db;
  }

  static registeredMacros() {
    return macroManager.registeredMacros();
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

      macroManager.loadMacro(displayData.mode, options)
    });
  }
}

module.exports = Display;
