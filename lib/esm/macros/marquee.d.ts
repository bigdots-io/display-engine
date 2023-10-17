import { MacroMarqueeConfig, MacroStopCallback, PixelChangeCallback } from "../types.js";
export declare const startMarquee: (config: MacroMarqueeConfig, macroIndex: number, onPixelChange: PixelChangeCallback) => MacroStopCallback;
