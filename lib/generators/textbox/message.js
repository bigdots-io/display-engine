var Line = require("./line");
var Word = require("./word");
import System6 from "../../fonts/system-6.json";
import System16 from "../../fonts/system-16.json";
var fonts = {
    "system-6": System6,
    "system-16": System16,
};
var Message = /** @class */ (function () {
    function Message(text, font, options) {
        this.text = text;
        this.font = fonts[font];
        this.options = options;
        this.lines = [];
        this.currentLine = this.newLine();
    }
    Message.prototype.render = function () {
        var _this = this;
        this.text.split(" ").forEach(function (characters, i) {
            var word = new Word(characters, _this.font, _this.options);
            // If the word length along is wider than the message with, hypenate!
            if (_this.options.width && word.getWidth() > _this.options.width) {
                _this.hypenateWord(characters);
            }
            else {
                var projectedWidth = _this.currentLine.calculateProjectedWidth(characters);
                if (_this.options.width && projectedWidth > _this.options.width) {
                    _this.lines.push(_this.currentLine);
                    _this.currentLine = _this.newLine();
                }
                _this.currentLine.append(characters);
            }
        });
        this.lines.push(this.currentLine);
        var dots = [];
        this.lines.forEach(function (line, i) {
            var results = line.render();
            if (i !== 0) {
                var offsetY = i * (_this.font.height + _this.options.spaceBetweenLines);
            }
            results.dots.map(function (dot) {
                dots.push({
                    x: dot.x,
                    y: dot.y + (offsetY || 0),
                });
            });
        });
        return {
            width: this.options.width || this.lines[0].getWidth(),
            height: (this.font.height + this.options.spaceBetweenLines) * this.lines.length,
            dots: dots,
        };
    };
    Message.prototype.newLine = function () {
        return new Line(this.font, {
            spaceBetweenLetters: this.options.spaceBetweenLetters,
            alignment: this.options.alignment,
            maxWidth: this.options.width,
        });
    };
    Message.prototype.hypenateWord = function (characters) {
        var assembledCharacters = [];
        for (var _i = 0, characters_1 = characters; _i < characters_1.length; _i++) {
            var character = characters_1[_i];
            assembledCharacters.push(character);
            var assembledWord = new Word(assembledCharacters, this.font, this.options);
            if (assembledWord.getWidth() > this.options.width) {
                break;
            }
        }
        assembledCharacters.pop(); // pop the offending character
        assembledCharacters.pop(); // pop the previous character
        assembledCharacters.push("-"); // push a hypen in its place
        this.currentLine.append(assembledCharacters.join(""));
        this.lines.push(this.currentLine);
        this.currentLine = this.newLine();
        var slicedCharacters = characters.slice(assembledCharacters.length - 1);
        var slicedWord = new Word(slicedCharacters, this.font, this.options);
        if (slicedWord.getWidth() > this.options.width) {
            this.hypenateWord(slicedCharacters);
        }
        else {
            this.currentLine.append(slicedCharacters);
        }
    };
    return Message;
}());
export { Message };
