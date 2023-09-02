import System6 from "../../fonts/system-6.json" assert { type: "json" };
import System16 from "../../fonts/system-16.json" assert { type: "json" };
import { Word } from "./word.js";
import { Line } from "./line.js";

const fonts = {
  "system-6": System6,
  "system-16": System16,
};

export class Message {
  constructor(text, font, options) {
    this.text = text;
    this.font = fonts[font];
    this.options = options;

    this.lines = [];
    this.currentLine = this.newLine();
  }

  render() {
    this.text.split(" ").forEach((characters, i) => {
      var word = new Word(characters, this.font, this.options);

      // If the word length along is wider than the message with, hypenate!
      if (this.options.width && word.getWidth() > this.options.width) {
        this.hypenateWord(characters);
      } else {
        var projectedWidth =
          this.currentLine.calculateProjectedWidth(characters);

        if (this.options.width && projectedWidth > this.options.width) {
          this.lines.push(this.currentLine);
          this.currentLine = this.newLine();
        }

        this.currentLine.append(characters);
      }
    });

    this.lines.push(this.currentLine);

    var dots = [];

    this.lines.forEach((line, i) => {
      var results = line.render();

      if (i !== 0) {
        var offsetY = i * (this.font.height + this.options.spaceBetweenLines);
      }

      results.dots.map((dot) => {
        dots.push({
          x: dot.x,
          y: dot.y + (offsetY || 0),
        });
      });
    });

    return {
      width: this.options.width || this.lines[0].getWidth(),
      height:
        (this.font.height + this.options.spaceBetweenLines) * this.lines.length,
      dots: dots,
    };
  }

  newLine() {
    return new Line(this.font, {
      spaceBetweenLetters: this.options.spaceBetweenLetters,
      alignment: this.options.alignment,
      maxWidth: this.options.width,
    });
  }

  hypenateWord(characters) {
    var assembledCharacters = [];

    for (let character of characters) {
      assembledCharacters.push(character);
      var assembledWord = new Word(
        assembledCharacters,
        this.font,
        this.options
      );
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
    } else {
      this.currentLine.append(slicedCharacters);
    }
  }
}