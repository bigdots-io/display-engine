import { System16 } from "../fonts/system-16.js";
import { System6 } from "../fonts/system-6.js";
const fonts = {
    "system-6": System6,
    "system-16": System16,
};
export const renderText = (text, fontName, options) => {
    const font = fonts[fontName];
    const lines = [];
    let currentLine = "";
    text.split(" ").forEach((characters, i) => {
        var wordWidth = getWordWidth(characters, font, options);
        if (options.width && wordWidth > options.width) {
            const [firstHalf, secondHalf] = hypenateWord(characters, options.width, font, options);
            currentLine += firstHalf;
            lines.push(currentLine);
            currentLine = secondHalf;
        }
        else {
            var projectedWidth = getProjectedLineWidth(characters, currentLine, font, options);
            if (options.width && projectedWidth > options.width) {
                lines.push(currentLine);
                currentLine = "";
            }
            currentLine += characters + " ";
        }
    });
    lines.push(currentLine);
    var dots = [];
    lines.forEach((line, i) => {
        const lineDots = renderLine(line, font, options);
        let offsetY = 0;
        if (i !== 0) {
            offsetY = i * (font.height + options.spaceBetweenLines);
        }
        lineDots.map((dot) => {
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
const hypenateWord = (characters, width, font, options) => {
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
const getProjectedLineWidth = (newWord, text, font, options) => {
    var _a;
    const width = getLineWidth(text, font, options);
    const wordWidth = getWordWidth(newWord, font, options);
    return width + (wordWidth + (((_a = getFontCharacter(" ", font)) === null || _a === void 0 ? void 0 : _a.width) || 0));
};
const getLineWidth = (text, font, options) => {
    var width = 0, words = text.split(" ");
    words.forEach((word) => {
        var _a;
        if (word.length !== 0) {
            const wordWidth = getWordWidth(word, font, options);
            width += wordWidth + (((_a = getFontCharacter(" ", font)) === null || _a === void 0 ? void 0 : _a.width) || 0);
        }
    });
    return width;
};
const getFontCharacterWidth = (letter, font) => {
    const character = font.characters[letter];
    return character.width || font.width;
};
const getFontCharacter = (character, font) => {
    try {
        return font.characters[character];
    }
    catch (_a) {
        throw `Unsupported character: ${character}`;
    }
};
const getWordWidth = (word, font, options) => {
    var width = 0;
    for (let i = 0; i < word.length; i++) {
        width += getFontCharacterWidth(word[i], font);
        if (i + 1 < word.length) {
            width += options.spaceBetweenLetters;
        }
    }
    return width;
};
const renderWord = (word, font, options) => {
    let cursorColumn = 0;
    const coordinates = [];
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
const renderLine = (text, font, options) => {
    const dots = [];
    let cursorColumn = 0;
    const words = text.trim().split(" ");
    words.forEach((word, i) => {
        var _a;
        const results = renderWord(word, font, options);
        results.dots.forEach((coordinate) => {
            dots.push({
                x: coordinate.x + cursorColumn,
                y: coordinate.y,
            });
        });
        var cursorAdvancement = results.width;
        if (i + 1 < words.length) {
            cursorAdvancement += ((_a = getFontCharacter(" ", font)) === null || _a === void 0 ? void 0 : _a.width) || 0;
        }
        cursorColumn += cursorAdvancement;
    });
    var alignStartingColumn = 0;
    if (options.width) {
        if (options.alignment === "right") {
            alignStartingColumn = options.width - cursorColumn;
        }
        else if (options.alignment === "center") {
            alignStartingColumn = Math.ceil((options.width - cursorColumn) / 2);
        }
    }
    return dots.map(function (dot) {
        return {
            x: dot.x + alignStartingColumn,
            y: dot.y,
        };
    });
};
