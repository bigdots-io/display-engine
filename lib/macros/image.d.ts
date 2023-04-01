export = ImageMacro;
declare class ImageMacro {
    static get identifier(): string;
    defaultConfig(): {
        url: string;
        speed: number;
    };
    start(): void;
    currentFrame: number | undefined;
    interval: NodeJS.Timer | undefined;
    stop(): void;
}
