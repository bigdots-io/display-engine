import { Message } from "../generators/textbox/message.js";
import {
  MacroMarqueeConfig,
  MacroStopCallback,
  PixelsChangeCallback,
} from "../types.js";

export const startMarquee = async (
  config: MacroMarqueeConfig,
  macroIndex: number,
  onPixelsChange: PixelsChangeCallback
): MacroStopCallback => {
  const coordinates: { x: number; y: number }[] = [];
  const message = new Message(config.text, config.font, {
    spaceBetweenLetters: 1,
    spaceBetweenLines: 0,
    alignment: "left",
    // wrap: "no-wrap",
  });

  var results = message.render();

  results.dots.forEach((dot) => {
    coordinates.push({ y: dot.y, x: dot.x });
  });

  const messageLength = results.width;

  var offset = 0;

  const interval = setInterval(() => {
    const resetPixels = coordinates.map((coordinate) => ({
      y: coordinate.y,
      x: coordinate.x + config.width - offset,
      hex: null,
      brightness: config.brightness,
      macroIndex,
    }));

    const newPixels = coordinates.map((coordinate) => ({
      y: coordinate.y,
      x: coordinate.x + config.width - (offset + 1),
      hex: config.color,
      brightness: config.brightness,
      macroIndex,
    }));

    onPixelsChange([...resetPixels, ...newPixels]);

    var loopPoint = config.width > messageLength ? config.width : messageLength;

    if (offset > loopPoint + config.width) {
      offset = 0;
    }

    offset += 1;
  }, config.speed);

  return () => clearInterval(interval);
};
