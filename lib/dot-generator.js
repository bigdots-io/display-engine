import { Message } from "./generators/textbox/message";
// image(url, callbacks) {
//   new ImageExploder(url).process(callbacks);
// }
export var generateColor = function (options, dimensions) {
    var pixels = [];
    for (var y = 0; y < dimensions.height; y++) {
        for (var x = 0; x < dimensions.width; x++) {
            pixels.push({
                y: y + options.startingRow,
                x: x + options.startingColumn,
                hex: options.color,
            });
        }
    }
    return pixels;
};
export var generateText = function (options, dimensions) {
    var message = new Message(options.text, options.font, {
        spaceBetweenLetters: options.spaceBetweenLetters,
        spaceBetweenLines: options.spaceBetweenLines,
        alignment: options.alignment,
        wrap: options.wrap,
        width: options.width || dimensions.width,
    });
    var results = message.render();
    return results.dots.map(function (dot) { return ({
        x: dot.x + options.startingColumn,
        y: dot.y + options.startingRow,
        hex: options.color,
    }); });
};
