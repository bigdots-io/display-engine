import { MacroMarqueeConfig, MacroStopCallback, PixelsChangeCallback } from "../types.js";
export declare const startMarquee: (config: MacroMarqueeConfig, macroIndex: number, onPixelsChange: PixelsChangeCallback) => MacroStopCallback;
