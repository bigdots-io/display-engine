import {
  Dimensions,
  MacroTextConfig,
  MacroColorConfig,
  Pixel,
  UpdatePixel,
} from "./types";
import { Message } from "./generators/textbox/message";

// image(url, callbacks) {
//   new ImageExploder(url).process(callbacks);
// }

export const generateColor = (
  options: MacroColorConfig,
  dimensions: Dimensions,
  macroIndex: number,
  updatePixel: UpdatePixel
) => {
  for (var y = 0; y < dimensions.height; y++) {
    for (var x = 0; x < dimensions.width; x++) {
      updatePixel({
        y: y + options.startingRow,
        x: x + options.startingColumn,
        hex: options.color,
        macroIndex,
      });
    }
  }
};

export const generateText = (
  options: MacroTextConfig,
  dimensions: Dimensions,
  macroIndex: number,
  updatePixel: UpdatePixel
) => {
  const message = new Message(options.text, options.font, {
    spaceBetweenLetters: options.spaceBetweenLetters,
    spaceBetweenLines: options.spaceBetweenLines,
    alignment: options.alignment,
    wrap: options.wrap,
    width: options.width || dimensions.width,
  });

  var results = message.render();

  results.dots.forEach((dot) =>
    updatePixel({
      x: dot.x + options.startingColumn,
      y: dot.y + options.startingRow,
      hex: options.color,
      macroIndex,
    })
  );
};
