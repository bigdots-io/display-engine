import { Message, RenderedMessage } from "../generators/textbox/message.js";
import { MacroTimeConfig, PixelChangeCallback } from "../types.js";

export const startTime = (
  config: MacroTimeConfig,
  macroIndex: number,
  onPixelChange: PixelChangeCallback
) => {
  let previousResults: RenderedMessage;
  setInterval(() => {
    const message = new Message(new Date().toLocaleString(), config.font, {
      spaceBetweenLetters: config.spaceBetweenLetters,
      spaceBetweenLines: config.spaceBetweenLines,
      alignment: config.alignment,
      width: config.width,
    });

    const results = message.render();

    previousResults?.dots?.forEach((dot) =>
      onPixelChange({
        x: dot.x + config.startingColumn,
        y: dot.y + config.startingRow,
        hex: null,
        brightness: config.brightness,
        macroIndex,
      })
    );

    results.dots.forEach((dot) =>
      onPixelChange({
        x: dot.x + config.startingColumn,
        y: dot.y + config.startingRow,
        hex: config.color,
        brightness: config.brightness,
        macroIndex,
      })
    );
    previousResults = results;
  }, 1000);
};
