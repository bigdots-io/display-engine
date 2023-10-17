import { MacroImageConfig, MacroStopCallback, PixelChangeCallback } from "../types";
export declare const startImage: (config: MacroImageConfig, macroIndex: number, onPixelChange: PixelChangeCallback) => MacroStopCallback;
