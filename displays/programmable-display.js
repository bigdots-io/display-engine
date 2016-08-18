"use strict";

var firebase = require("firebase");

class ProgrammableDisplay {
  constructor(modeData, dimensions, callbacks) {
    this.matrixKey = modeData.matrix;
    this.callbacks = callbacks;
  }

  start() {
    var matrixRef = firebase.database().ref(`matrices/${this.matrixKey}`);

    matrixRef.once('value').then((snapshot) => {
      var data = snapshot.val();

      for(let key in snapshot.val()) {
        var hex = data[key].hex,
            [y, x] = key.split(':');

        this.callbacks.onPixelChange(y, x, hex);
      }
    });

    this.childChangedRef = matrixRef.on('child_changed', (snapshot) => {
      var hex = snapshot.val().hex,
          [y, x] = snapshot.key.split(':');

      this.callbacks.onPixelChange(y, x, hex);
    });
  }

  stop() {
    this.childChangedRef.off();
  }
}

module.exports = ProgrammableDisplay;
