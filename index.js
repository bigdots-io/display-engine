"use strict";

var Macros = {
  'programmable': require('macros/lib/programmable'),
  'twinkle': require('macros/lib/twinkle'),
  'solid-color': require('macros/lib/solid-color'),
  'unsupported': require('macros/lib/unsupported'),
  'marquee': require('macros/lib/marquee'),
  'text': require('macros/lib/text'),
  'counter': require('macros/lib/counter'),
  'offline': require('macros/lib/offline'),
  'image': require('macros/lib/image')
};

var status = {
  unknown: 'unknown',
  connected: 'connected',
  notConnected: 'not connected'
};

class DisplayCoupler {
  constructor(db, dimensions) {
    this.db = db;
    this.dimensions = dimensions;
    this.connectionStatus = status.unknown;
  }

  connect(displayKey, callbacks) {
    // Use a connection listener as the master loop so that the active macro
    // can be overriden by an "offline macro".
    this.db.ref('.info/connected').on('value', (snapshot) => {
      if(!snapshot.val()) {
        var delay = 0;

        // Prevent false positives because firebase thinks it's not connected for
        // a split second when it starts up for the first time.
        if(this.connectionStatus == status.unknown) {
          delay = 2000;
        } else {
          this.connectionStatus = status.notConnected
        }

        setTimeout(() => {
          if(this.connectionStatus !== status.connected) {
            this.renderAsOffline(callbacks.onPixelChange);
            this.connectionStatus = status.notConnected;
          }
        }, delay);

      } else {
        this.connectionStatus = status.connected;
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
