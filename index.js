"use strict";

var MacroManager = require('./lib/macro-manager');

var macroManager = new MacroManager();
macroManager.registerMacros();

class DisplayCoupler {
  constructor(db) {
    this.db = db;
  }

  static registeredMacros() {
    return macroManager.registeredMacros();
  }

  startUp(callbacks) {
    macroManager.loadMacro('starting-up', {
      callbacks: callbacks
    });
  }

  connect(displayKey, callbacks) {
    var displayRef = this.db.ref(`displays/${displayKey}/`);
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
                callbacks.onPixelChange(y, x, hex, displayData);
              }
            }
          };

      macroManager.loadMacro(displayData.mode, options)
    });
  }
}

module.exports = DisplayCoupler;
