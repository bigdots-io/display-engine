import { Dimensions, MacroTextConfig, MacroColorConfig, UpdatePixel } from "./types";
export declare const generateColor: (options: MacroColorConfig, dimensions: Dimensions, macroIndex: number, updatePixel: UpdatePixel) => void;
export declare const generateText: (options: MacroTextConfig, dimensions: Dimensions, macroIndex: number, updatePixel: UpdatePixel) => void;
