var firebase = require("firebase");

class ProgrammableDisplay {
  constructor(modeData, dimensions, callbacks) {
    this.matrixKey = modeData.matrix;
    var matrixRef = firebase.database().ref(`matrices/${this.matrixKey}`);

    matrixRef.once('value').then((snapshot) => {
      var data = snapshot.val();

      for(let key in snapshot.val()) {
        var hex = data[key].hex,
            [y, x] = key.split(':');

        callbacks.onPixelChange(y, x, hex);
      }
    });

    matrixRef.on('child_changed', (snapshot) => {
      var hex = snapshot.val().hex,
          [y, x] = snapshot.key.split(':');

      callbacks.onPixelChange(y, x, hex);
    });
  }
}

module.exports = ProgrammableDisplay;
