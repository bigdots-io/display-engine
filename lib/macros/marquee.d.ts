export = MarqueeMacro;
declare class MarqueeMacro {
    static get identifier(): string;
    defaultConfig(): {
        color: string;
        backgroundColor: string;
        font: string;
        text: string;
        speed: number;
    };
    start(): void;
    interval: NodeJS.Timer | undefined;
    stop(): void;
}
