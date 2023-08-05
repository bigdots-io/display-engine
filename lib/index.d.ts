import { MacroConfig, MacroName, PixelChangeCallback } from "./types";
export declare function createDisplayEngine({ macroName, macroConfig, dimensions, onPixelChange, }: {
    macroName: MacroName;
    macroConfig?: Partial<MacroConfig>;
    dimensions?: {
        height: number;
        width: number;
    };
    onPixelChange: PixelChangeCallback;
}): void;
