export = TwinkleMacro;
declare class TwinkleMacro {
    static get identifier(): string;
    defaultConfig(): {
        color: string;
    };
    start(): void;
    interval: NodeJS.Timer | undefined;
    stop(): void;
}
