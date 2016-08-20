"use strict";

var MacroManager = require('./lib/macro-manager');

var macroManager = new MacroManager();
macroManager.registerMacros();

class DisplayCoupler {
  constructor(db) {
    this.db = db;
    this.startingUp = true;
  }

  static registeredMacros() {
    return macroManager.registeredMacros();
  }

  startUp({dimensions, callbacks}) {
    macroManager.loadMacro('starting-up', {
      dimensions: dimensions,
      callbacks: callbacks
    });
  }

  connect(displayKey, callbacks) {
    this.db.ref(`displays/${displayKey}/`).on('value', (snapshot) => {
      var displayData = snapshot.val();

      var next = () => {
        var mode = displayData.mode,
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
      };

      if(this.startingUp) {
        callbacks.onReady(displayData, () => {
          this.startingUp = false;
          next();
        });
      } else {
        next()
      }
    });
  }
}

module.exports = DisplayCoupler;
