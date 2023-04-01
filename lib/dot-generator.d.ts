import { Dimensions, MacroConfig, Pixel } from ".";
export declare const generateColor: (color: string, { height, width, startingColumn, startingRow, }: {
    height: number;
    width: number;
    startingColumn?: number | undefined;
    startingRow?: 0 | undefined;
}) => Pixel[];
export declare const generateText: (options: MacroConfig, dimensions?: Partial<Dimensions>) => Pixel[];
