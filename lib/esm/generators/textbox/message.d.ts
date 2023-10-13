import { Line } from "./line.js";
import { Alignment, Font } from "../../types";
export interface RenderedMessage {
    width: number;
    height: number;
    dots: {
        x: number;
        y: number;
    }[];
}
interface Options {
    width?: number;
    spaceBetweenLines?: number;
    spaceBetweenLetters?: number;
    spaceBetweenWords?: number;
    alignment?: Alignment;
}
export declare class Message {
    text: string;
    font: any;
    options: Options;
    lines: Line[];
    currentLine: Line;
    constructor(text: string, font: Font, options: Options);
    render(): RenderedMessage;
    newLine(): Line;
    hypenateWord(characters: string, width: number): void;
}
export {};
