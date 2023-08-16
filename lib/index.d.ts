import { Macro, MacroColorConfig, MacroMeteorShowerConfig, MacroTextConfig, MacroTwinkleConfig, PixelChangeCallback } from "./types";
export declare const twinkleMacro: (macroConfig: Partial<MacroTwinkleConfig>) => Macro;
export declare const meteorShowerMacro: (macroConfig: Partial<MacroMeteorShowerConfig>) => Macro;
export declare const solidColorMacro: (macroConfig: Partial<MacroColorConfig>) => Macro;
export declare const textMacro: (macroConfig: Partial<MacroTextConfig>) => Macro;
export declare function createDisplayEngine({ macros, dimensions, onPixelChange, }: {
    macros: Macro[];
    dimensions?: {
        height: number;
        width: number;
    };
    onPixelChange: PixelChangeCallback;
}): void;
