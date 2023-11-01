import { Message } from "../generators/textbox/message.js";
import {
  MacroStopCallback,
  MacroTextConfig,
  PixelsChangeCallback,
} from "../types.js";

export const startText = async (
  config: MacroTextConfig,
  macroIndex: number,
  onPixelsChange: PixelsChangeCallback
): MacroStopCallback => {
  const message = new Message(config.text, config.font, {
    spaceBetweenLetters: config.spaceBetweenLetters,
    spaceBetweenLines: config.spaceBetweenLines,
    alignment: config.alignment,
    width: config.width,
  });

  const results = message.render();

  const pixels = results.dots.map((dot) => ({
    x: dot.x + config.startingColumn,
    y: dot.y + config.startingRow,
    hex: config.color,
    brightness: config.brightness,
    macroIndex,
  }));

  onPixelsChange(pixels);

  return () => {};
};
