import { System16 } from "../fonts/system-16";
import { System6 } from "../fonts/system-6";
import {
  Alignment,
  Font,
  FontCharacterDefinition,
  FontDefinition,
} from "../types";

const fonts = {
  "system-6": System6,
  "system-16": System16,
};

type DotCoordinates = { y: number; x: number }[];

export interface RenderedMessage {
  width: number;
  height: number;
  dots: DotCoordinates;
}

export interface MessageOptions {
  width: number;
  spaceBetweenLines: number;
  spaceBetweenLetters: number;
  spaceBetweenWords: number;
  alignment: Alignment;
}

export const renderText = (
  text: string,
  fontName: Font,
  options: MessageOptions
): RenderedMessage => {
  const font = fonts[fontName];

  const lines: string[] = [];
  let currentLine = "";

  text.split(" ").forEach((characters, i) => {
    var wordWidth = getWordWidth(characters, font, options);

    if (wordWidth > options.width) {
      const [firstHalf, secondHalf] = hypenateWord(
        characters,
        options.width,
        font,
        options
      );
      currentLine += firstHalf;
      lines.push(currentLine);
      currentLine = secondHalf;
    } else {
      var projectedWidth = getProjectedLineWidth(
        characters,
        currentLine,
        font,
        options
      );

      if (projectedWidth > options.width) {
        lines.push(currentLine);
        currentLine = "";
      }

      currentLine += characters;
    }
  });

  lines.push(currentLine);

  var dots: DotCoordinates = [];

  lines.forEach((line, i) => {
    const results = renderLine(line, font, options);
    let offsetY: number = 0;

    if (i !== 0) {
      offsetY = i * (font.height + options.spaceBetweenLines);
    }

    results.dots.map((dot: any) => {
      dots.push({
        x: dot.x,
        y: dot.y + offsetY,
      });
    });
  });

  return {
    width: options.width || getLineWidth(lines[0], font, options),
    height: (font.height + options.spaceBetweenLines) * lines.length,
    dots: dots,
  };
};

const hypenateWord = (
  characters: string,
  width: number,
  font: FontDefinition,
  options: MessageOptions
) => {
  var assembledCharacters = [];

  for (let character of characters) {
    assembledCharacters.push(character);
    const wordWidth = getWordWidth(assembledCharacters, font, options);
    if (wordWidth > width) {
      break;
    }
  }

  assembledCharacters.pop(); // pop the offending character
  assembledCharacters.pop(); // pop the previous character
  assembledCharacters.push("-"); // push a hypen in its place

  const firstHalf = assembledCharacters.join("");
  const secondHalf = characters.slice(assembledCharacters.length - 1);

  return [firstHalf, secondHalf];
};

const getProjectedLineWidth = (
  newWord: string,
  text: string,
  font: FontDefinition,
  options: MessageOptions
): number => {
  const width = getLineWidth(text, font, options);
  const wordWidth = getWordWidth(newWord, font, options);
  return width + (wordWidth + (getFontCharacter(" ", font)?.width || 0));
};

const getLineWidth = (
  text: string,
  font: FontDefinition,
  options: MessageOptions
): number => {
  var width = 0,
    words = text.split(" ");

  words.forEach((word) => {
    if (word.length !== 0) {
      const wordWidth = getWordWidth(word, font, options);

      width += wordWidth + (getFontCharacter(" ", font)?.width || 0);
    }
  });

  return width;
};

const getFontCharacterWidth = (
  letter: string,
  font: FontDefinition
): number => {
  const character = font.characters[letter];
  return character.width || font.width;
};

const getFontCharacter = (
  character: string,
  font: FontDefinition
): FontCharacterDefinition => {
  try {
    return font.characters[character];
  } catch {
    throw `Unsupported character: ${character}`;
  }
};

const getWordWidth = (
  word: string | string[],
  font: FontDefinition,
  options: MessageOptions
): number => {
  var width = 0;
  for (let i = 0; i < word.length; i++) {
    width += getFontCharacterWidth(word[i], font);

    if (i + 1 < word.length) {
      width += options.spaceBetweenLetters;
    }
  }

  return width;
};

const renderWord = (
  word: string,
  font: FontDefinition,
  options: MessageOptions
): { width: number; dots: DotCoordinates } => {
  let cursorColumn = 0;
  const coordinates: DotCoordinates = [];

  for (let i = 0; i < word.length; i++) {
    const character = font.characters[word[i]];
    const characterWidth = getFontCharacterWidth(word[i], font);

    character.coordinates.forEach((point) => {
      if (point.x < characterWidth) {
        var out = {
          y: point.y,
          x: cursorColumn + point.x,
        };

        coordinates.push(out);
      }
    });

    cursorColumn += characterWidth + options.spaceBetweenLetters;
  }

  return {
    width: cursorColumn,
    dots: coordinates,
  };
};

const renderLine = (
  text: string,
  font: FontDefinition,
  options: MessageOptions
): { width: number; dots: DotCoordinates } => {
  const dots: { x: number; y: number }[] = [];
  let cursorColumn = 0;

  const words = text.trim().split(" ");

  words.forEach((word, i) => {
    const results = renderWord(word, font, options);
    results.dots.forEach((coordinate) => {
      dots.push({
        x: coordinate.x + cursorColumn,
        y: coordinate.y,
      });
    });

    var cursorAdvancement = results.width;

    if (i + 1 < words.length) {
      cursorAdvancement += getFontCharacter(" ", font)?.width || 0;
    }

    cursorColumn += cursorAdvancement;
  });

  var alignStartingColumn = 0;

  if (options.width) {
    if (options.alignment === "right") {
      alignStartingColumn = options.width - cursorColumn;
    } else if (options.alignment === "center") {
      alignStartingColumn = Math.ceil((options.width - cursorColumn) / 2);
    }
  }

  return {
    width: options.width,
    dots: dots.map(function (dot) {
      return {
        x: dot.x + alignStartingColumn,
        y: dot.y,
      };
    }),
  };
};
