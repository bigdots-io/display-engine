import { RenderedMessage, renderText } from "../generators/text.js";
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
    const results = renderText(new Date().toLocaleString(), config.font, {
      spaceBetweenLetters: config.spaceBetweenLetters,
      spaceBetweenWords: 1,
      spaceBetweenLines: config.spaceBetweenLines,
      alignment: config.alignment,
      width: config.width,
    });

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
