"use strict";

var Macro = require('./macro');

const identifier = 'programmable';

class ProgrammableMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  start() {
    this.setColor('#000000');
    
    var matrixKey = this.config.matrix;
    this.matrixRef = this.db.ref(`matrices/${matrixKey}`);
    this.matrixRef.once('value').then((snapshot) => {
      var data = snapshot.val();

      for(let key in snapshot.val()) {
        var hex = data[key].hex,
            [y, x] = key.split(':');

        this.callbacks.onPixelChange(y, x, hex);
      }
    });

    this.childChangedCallback = this.matrixRef.on('child_changed', (snapshot) => {
      var hex = snapshot.val().hex,
          [y, x] = snapshot.key.split(':');

      this.callbacks.onPixelChange(y, x, hex);
    });
  }

  stop() {
    this.matrixRef.off('child_changed', this.childChangedCallback);
  }
}

module.exports = ProgrammableMacro;
