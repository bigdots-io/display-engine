"use strict";
var Character = require('./character');
var Word = /** @class */ (function () {
    function Word(word, font, options) {
        this.word = word;
        this.font = font;
        this.options = options;
    }
    Word.prototype.getWidth = function () {
        var width = 0;
        for (var i = 0; i < this.word.length; i++) {
            width += (this.font.characters[this.word[i]].width || this.font.width);
            if ((i + 1) < this.word.length) {
                width += this.options.spaceBetweenLetters;
            }
        }
        return width;
    };
    Word.prototype.getHeight = function () {
        return this.font.characters[this.word[0]].height || this.font.height;
    };
    Word.prototype.render = function () {
        var cursorColumn = 0, textCoordinates = [];
        for (var i = 0; i < this.word.length; i++) {
            var character = new Character(this.word[i], this.font), characterWidth = character.getWidth();
            if (character.isRenderable()) {
                var coordinates = character.renderCoordinates();
                if (coordinates) {
                    coordinates.forEach(function (point) {
                        if (point.x < characterWidth) {
                            var out = {
                                y: point.y,
                                x: cursorColumn + point.x
                            };
                            textCoordinates.push(out);
                        }
                    });
                }
            }
            cursorColumn += (characterWidth + this.options.spaceBetweenLetters);
        }
        return {
            width: this.getWidth(),
            dots: textCoordinates
        };
    };
    return Word;
}());
module.exports = Word;
