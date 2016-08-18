"use strict";

var firebase = require("firebase");

class ProgrammableDisplay {
  constructor(modeData, dimensions, callbacks) {
    this.matrixKey = modeData.matrix;
    this.matrixRef = firebase.database().ref(`matrices/${this.matrixKey}`);
    this.callbacks = callbacks;
  }

  onceValueListner(snapshot) {
    var data = snapshot.val();

    for(let key in snapshot.val()) {
      var hex = data[key].hex,
          [y, x] = key.split(':');

      this.callbacks.onPixelChange(y, x, hex);
    }
  }

  childChangedListner(snapshot) {
    var hex = snapshot.val().hex,
        [y, x] = snapshot.key.split(':');

    this.callbacks.onPixelChange(y, x, hex);
  }

  start() {
    this.matrixRef.once('value').then(this.onceValueListner);
    this.matrixRef.on('child_changed', this.childChangedListner);
  }

  stop() {
    this.matrixRef.off(this.onceValueListner);
    this.matrixRef.off(this.childChangedListner);
  }
}

module.exports = ProgrammableDisplay;
