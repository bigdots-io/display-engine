import { Message, RenderedMessage } from "../generators/textbox/message.js";
import {
  MacroStopCallback,
  MacroTimeConfig,
  PixelsChangeCallback,
} from "../types.js";

export const startTime = async (
  config: MacroTimeConfig,
  macroIndex: number,
  onPixelsChange: PixelsChangeCallback
): MacroStopCallback => {
  let previousResults: RenderedMessage;
  const interval = setInterval(() => {
    const message = new Message(new Date().toLocaleString(), config.font, {
      spaceBetweenLetters: config.spaceBetweenLetters,
      spaceBetweenLines: config.spaceBetweenLines,
      alignment: config.alignment,
      width: config.width,
    });

    const results = message.render();

    const resetPixels = previousResults?.dots?.map((dot) => ({
      x: dot.x + config.startingColumn,
      y: dot.y + config.startingRow,
      hex: null,
      brightness: config.brightness,
      macroIndex,
    }));

    const newPixels = results.dots.map((dot) => ({
      x: dot.x + config.startingColumn,
      y: dot.y + config.startingRow,
      hex: config.color,
      brightness: config.brightness,
      macroIndex,
    }));

    onPixelsChange([...(resetPixels || []), ...newPixels]);
    previousResults = results;
  }, 1000);

  return () => clearInterval(interval);
};
