export = OfflineMacro;
declare class OfflineMacro {
    static get identifier(): string;
    defaultConfig(): {};
    start(): void;
    stop(): void;
}
