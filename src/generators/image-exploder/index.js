var getPixels = require('get-pixels');

class ImageExploder {
  constructor(url) {
    this.url = url;
  }

  process(callbacks) {
    getPixels(this.url, (err, pixels) => {
      var animated = false,
          out = [];

      if(err) {
        callbacks.onError(err);
      }

      if(pixels.shape.length === 3) {
        var imageWidth = pixels.shape[0],
            imageHeight = pixels.shape[1];

        for(let x = 0; x < imageWidth; x++) {
          for(let y = 0; y < imageHeight; y++) {
            var r = pixels.get(x, y, 0),
                g = pixels.get(x, y, 1),
                b = pixels.get(x, y, 2),
                a = pixels.get(x, y, 3);

            out.push({ x: x, y: y, hex: getHex(r, g, b, a) });
          }
        }
      } else {
        animated = true;

        var frames = pixels.shape[0],
            imageWidth = pixels.shape[1],
            imageHeight = pixels.shape[2];

        for(let f = 0; f < frames; f++) {
          var frame = [];

          for(let x = 0; x < imageWidth; x++) {
            for(let y = 0; y < imageHeight; y++) {
              var r = pixels.get(f, x, y, 0),
                  g = pixels.get(f, x, y, 1),
                  b = pixels.get(f, x, y, 2),
                  a = pixels.get(f, x, y, 3);

              frame.push({ x: x, y: y, hex: getHex(r, g, b, a) });
            }
          }

          out.push(frame);
        }
      }

      callbacks.onSuccess({
        data: out,
        animated: animated
      });
    });
  }
}

function getHex(r, g, b, a) {
  return rgb2hex(`rgba(${r}, ${g}, ${b}, ${a})`);
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

module.exports = ImageExploder;
