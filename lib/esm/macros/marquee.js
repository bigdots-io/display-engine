import { Message } from "../generators/textbox/message.js";
export const startMarquee = async (config, macroIndex, onPixelChange) => {
    const coordinates = [];
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
    return () => clearInterval(interval);
};
