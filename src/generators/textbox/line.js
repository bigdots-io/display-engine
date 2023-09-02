import { Word } from "./word.js";

export class Line {
  constructor(font, options) {
    this.text = "";
    this.font = font;
    this.options = options;
  }

  calculateProjectedWidth(word) {
    var width = this.getWidth();

    var newWord = new Word(word, this.font, {
      spaceBetweenLetters: this.options.spaceBetweenLetters,
    });

    return width + (newWord.getWidth() + this.font.characters[" "].width);
  }

  getWidth() {
    var width = 0,
      words = this.text.split(" ");

    words.forEach((word) => {
      if (word.length !== 0) {
        var word = new Word(word, this.font, {
          spaceBetweenLetters: this.options.spaceBetweenLetters,
        });

        width += word.getWidth() + this.font.characters[" "].width;
      }
    });

    return width;
  }

  append(word) {
    this.text += word + " ";
  }

  render() {
    var dots = [],
      cursorColumn = 0;

    var words = this.text.trim().split(" ");

    words.forEach((word, i) => {
      var word = new Word(word, this.font, {
        spaceBetweenLetters: this.options.spaceBetweenLetters,
      });

      var results = word.render();

      results.dots.forEach((coordinate) => {
        dots.push({
          x: coordinate.x + cursorColumn,
          y: coordinate.y,
        });
      });

      var cursorAdvancement = results.width;

      if (i + 1 < words.length) {
        cursorAdvancement += this.font.characters[" "].width;
      }

      cursorColumn += cursorAdvancement;
    });

    var alignStartingColumn = 0;

    if (this.options.alignment === "right") {
      alignStartingColumn = this.options.maxWidth - cursorColumn;
    } else if (this.options.alignment === "center") {
      alignStartingColumn = Math.ceil(
        (this.options.maxWidth - cursorColumn) / 2
      );
    }

    return {
      width: this.options.width,
      dots: dots.map(function (dot) {
        return {
          x: dot.x + alignStartingColumn,
          y: dot.y,
        };
      }),
    };
  }
}
