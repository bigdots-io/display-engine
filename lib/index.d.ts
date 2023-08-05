import { MacroConfig, MacroName, PixelChangeCallback } from "./types";
export declare function display({ macroName, macroConfig, dimensions, onPixelChange, }: {
    macroName: MacroName;
    macroConfig?: Partial<MacroConfig>;
    dimensions?: {
        height: number;
        width: number;
    };
    onPixelChange: PixelChangeCallback;
}): void;
