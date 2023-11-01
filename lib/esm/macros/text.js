import { Message } from "../generators/textbox/message.js";
export const startText = async (config, macroIndex, onPixelsChange) => {
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
    return () => { };
};
