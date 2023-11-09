interface ImagePixel {
    y: number;
    x: number;
    hex: string;
}
export declare const explodeImage: (url: string) => Promise<{
    data: ImagePixel[][];
    animated: boolean;
}>;
export {};
