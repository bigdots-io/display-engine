"use strict";
var Message = require("./message");
class Textbox {
    constructor(options = {}) {
        console.log(options);
        this.font = options.font || "system-6";
        this.startingColumn = options.startingColumn || 0;
        this.startingRow = options.startingRow || 0;
        this.width = options.width;
        this.height = options.height;
        this.spaceBetweenLetters = options.spaceBetweenLetters || 1;
        this.spaceBetweenLines = options.spaceBetweenLines || 1;
        this.alignment = options.alignment || "left";
        this.hex = options.hex || "#FFFFFF";
        this.wrap = options.wrap || "word";
        this.options = options;
    }
    getWidth(text) {
        return new Message(text, this.font, {
            spaceBetweenLetters: this.spaceBetweenLetters,
            wrap: this.wrap,
            width: this.width,
        }).getWidth();
    }
    write(text) {
        var message = new Message(text, this.font, {
            spaceBetweenLetters: this.spaceBetweenLetters,
            spaceBetweenLines: this.spaceBetweenLines,
            alignment: this.alignment,
            wrap: this.wrap,
            width: this.width,
        });
        var results = message.render();
        if (this.height) {
            results.dots = results.dots.filter((dot) => {
                return dot.y < this.height;
            });
        }
        if (this.width) {
            results.dots = results.dots.filter((dot) => {
                return dot.x < this.width;
            });
        }
        return results.dots.map((dot) => {
            return {
                x: dot.x + this.startingColumn,
                y: dot.y + this.startingRow,
                hex: this.hex,
            };
        });
    }
}
module.exports = Textbox;
