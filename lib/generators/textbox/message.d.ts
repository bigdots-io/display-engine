export class Message {
    constructor(text: any, font: any, options: any);
    text: any;
    font: any;
    options: any;
    lines: any[];
    currentLine: Line;
    render(): {
        width: any;
        height: number;
        dots: any[];
    };
    newLine(): Line;
    hypenateWord(characters: any): void;
}
import Line = require("./line");
