export = MeteorShowerMacro;
declare class MeteorShowerMacro {
    static get identifier(): string;
    defaultConfig(): {
        color: string;
        meteorCount: number;
        maxTailLength: number;
        minTailLength: number;
        maxDepth: number;
        minSpeed: number;
        maxSpeed: number;
    };
    start(): void;
    interval: NodeJS.Timer | undefined;
    stop(): void;
}
