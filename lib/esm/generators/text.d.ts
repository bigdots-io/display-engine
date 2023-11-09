import { Alignment, Font } from "../types";
type DotCoordinates = {
    y: number;
    x: number;
}[];
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
export declare const renderText: (text: string, fontName: Font, options: MessageOptions) => RenderedMessage;
export {};
