import { Character } from "./character.js";
export class Word {
    constructor(word, font, options) {
        this.word = word;
        this.font = font;
        this.options = options;
    }
    getWidth() {
        var width = 0;
        for (let i = 0; i < this.word.length; i++) {
            width += this.font.characters[this.word[i]].width || this.font.width;
            if (i + 1 < this.word.length) {
                width += this.options.spaceBetweenLetters;
            }
        }
        return width;
    }
    getHeight() {
        return this.font.characters[this.word[0]].height || this.font.height;
    }
    render() {
        var cursorColumn = 0, textCoordinates = [];
        for (let i = 0; i < this.word.length; i++) {
            var character = new Character(this.word[i], this.font), characterWidth = character.getWidth();
            if (character.isRenderable()) {
                var coordinates = character.renderCoordinates();
                if (coordinates) {
                    coordinates.forEach((point) => {
                        if (point.x < characterWidth) {
                            var out = {
                                y: point.y,
                                x: cursorColumn + point.x,
                            };
                            textCoordinates.push(out);
                        }
                    });
                }
            }
            cursorColumn += characterWidth + this.options.spaceBetweenLetters;
        }
        return {
            width: this.getWidth(),
            dots: textCoordinates,
        };
    }
}
