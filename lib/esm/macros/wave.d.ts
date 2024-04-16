import { MacroStopCallback, MacroWaveConfig, PixelsChangeCallback } from "../types.js";
export declare const startWave: (config: MacroWaveConfig, macroIndex: number, onPixelsChange: PixelsChangeCallback) => MacroStopCallback;
