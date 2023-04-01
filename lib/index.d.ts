import { Database } from "firebase/database";
export declare enum MacroName {
    SolidColor = "solid-color",
    Text = "text"
}
export interface MacroConfig {
    color: string;
    text: string;
    font: string;
    alignment: string;
    spaceBetweenLetters: number;
    wrap?: string;
}
export interface Dimensions {
    height: number;
    width: number;
}
export interface Pixel {
    y: number;
    x: number;
    hex: string;
}
type PixelChangeCallback = (pixel: Pixel) => void;
export declare function connectDisplay({ displayId, db, dimensions, onPixelChange, }: {
    displayId: string;
    db: Database;
    dimensions: {
        height: number;
        width: number;
    };
    onPixelChange: PixelChangeCallback;
}): void;
export declare function hardcodedDisplay({ macroName, macroConfig, dimensions, onPixelChange, }: {
    macroName: MacroName;
    macroConfig: MacroConfig;
    dimensions: {
        height: number;
        width: number;
    };
    onPixelChange: PixelChangeCallback;
}): void;
export {};
