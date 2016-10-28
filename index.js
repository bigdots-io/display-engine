"use strict";

var Macros = {
  'programmable': require('macros/lib/programmable'),
  'twinkle': require('macros/lib/twinkle'),
  'solid-color': require('macros/lib/solid-color'),
  'unsupported': require('macros/lib/unsupported'),
  'marquee': require('macros/lib/marquee'),
  'text': require('macros/lib/text'),
  'heart-counter': require('macros/lib/heart-counter'),
  'offline': require('macros/lib/offline')
};

class DisplayCoupler {
  constructor(db, dimensions) {
    this.db = db;
    this.dimensions = dimensions;
  }

  connect(displayKey, callbacks) {
    this.db.ref('.info/connected').on('value', (snapshot) => {
      if(!snapshot.val()) {
        this.renderAsOffline(callbacks.onPixelChange);
      } else {
        this.db.ref(`displays/${displayKey}/`).on('value', (snapshot) => {
          var displayData = snapshot.val();

          var options = {
            config: displayData.macroConfig || {},
            dimensions: this.dimensions,
            db: this.db,
            callbacks: {
              onPixelChange: function(y, x, hex) {
                callbacks.onPixelChange(y, x, hex, displayData);
              }
            }
          };

          if(displayData.macro === "programmable") {
            options.config.matrix = displayData.matrix;
          }

          if(this.activateMacro) {
            this.activateMacro.stop();
          }

          var Macro = Macros[displayData.macro] || Macros.unsupported;

          this.activateMacro = new Macro(options);

          this.activateMacro.start();
        });
      }
    });
  }

  renderAsOffline(onPixelChange) {
    if(this.activateMacro) {
      this.activateMacro.stop();
    }

    this.activateMacro = new Macros['offline']({
      config: {},
      dimensions: this.dimensions,
      db: this.db,
      callbacks: {
        onPixelChange: function(y, x, hex) {
          onPixelChange(y, x, hex, {
            brightness: 30
          });
        }
      }
    });
    this.activateMacro.start();
  }
}

module.exports = DisplayCoupler;
