"use strict";
var Word = require('./word');
var Line = /** @class */ (function () {
    function Line(font, options) {
        this.text = "";
        this.font = font;
        this.options = options;
    }
    Line.prototype.calculateProjectedWidth = function (word) {
        var width = this.getWidth();
        var newWord = new Word(word, this.font, {
            spaceBetweenLetters: this.options.spaceBetweenLetters
        });
        return width + (newWord.getWidth() + this.font.characters[" "].width);
    };
    Line.prototype.getWidth = function () {
        var _this = this;
        var width = 0, words = this.text.split(' ');
        words.forEach(function (word) {
            if (word.length !== 0) {
                var word = new Word(word, _this.font, {
                    spaceBetweenLetters: _this.options.spaceBetweenLetters
                });
                width += (word.getWidth() + _this.font.characters[" "].width);
            }
        });
        return width;
    };
    Line.prototype.append = function (word) {
        this.text += (word + ' ');
    };
    Line.prototype.render = function () {
        var _this = this;
        var dots = [], cursorColumn = 0;
        var words = this.text.trim().split(' ');
        words.forEach(function (word, i) {
            var word = new Word(word, _this.font, {
                spaceBetweenLetters: _this.options.spaceBetweenLetters
            });
            var results = word.render();
            results.dots.forEach(function (coordinate) {
                dots.push({
                    x: coordinate.x + cursorColumn,
                    y: coordinate.y
                });
            });
            var cursorAdvancement = results.width;
            if (i + 1 < words.length) {
                cursorAdvancement += _this.font.characters[" "].width;
            }
            cursorColumn += cursorAdvancement;
        });
        var alignStartingColumn = 0;
        if (this.options.alignment === 'right') {
            alignStartingColumn = this.options.maxWidth - cursorColumn;
        }
        else if (this.options.alignment === 'center') {
            alignStartingColumn = Math.ceil((this.options.maxWidth - cursorColumn) / 2);
        }
        return {
            width: this.options.width,
            dots: dots.map(function (dot) {
                return {
                    x: dot.x + alignStartingColumn,
                    y: dot.y
                };
            })
        };
    };
    return Line;
}());
module.exports = Line;
