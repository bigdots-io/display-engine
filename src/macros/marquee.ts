import { Message } from "../generators/textbox/message.js";
import { MacroMarqueeConfig, PixelChangeCallback } from "../types.js";

export const startMarquee = (
  config: MacroMarqueeConfig,
  macroIndex: number,
  onPixelChange: PixelChangeCallback
) => {
  const coordinates: { x: number; y: number }[] = [];
  const message = new Message(config.text, config.font, {
    spaceBetweenLetters: 1,
    spaceBetweenLines: 0,
    alignment: "left",
    wrap: "no-wrap",
  });

  var results = message.render();

  results.dots.forEach((dot) => {
    onPixelChange({
      y: dot.y,
      x: dot.x,
      hex: dot.hex,
      brightness: config.brightness,
      macroIndex,
    });
    coordinates.push({ y: dot.y, x: dot.x });
  });

  const messageLength = results.width;

  var offset = 0;

  setInterval(() => {
    coordinates.forEach((coordinate) => {
      onPixelChange({
        y: coordinate.y,
        x: coordinate.x + config.width - offset,
        hex: null,
        brightness: config.brightness,
        macroIndex,
      });
    });
    coordinates.forEach((coordinate) => {
      onPixelChange({
        y: coordinate.y,
        x: coordinate.x + config.width - (offset + 1),
        hex: config.color,
        brightness: config.brightness,
        macroIndex,
      });
    });

    var loopPoint = config.width > messageLength ? config.width : messageLength;

    if (offset > loopPoint + config.width) {
      offset = 0;
    }

    offset += 1;
  }, config.speed);
};
