import { MacroImageConfig, MacroStopCallback, PixelsChangeCallback } from "../types";
export declare const startImage: (config: MacroImageConfig, macroIndex: number, onPixelsChange: PixelsChangeCallback) => MacroStopCallback;
