export = CounterMacro;
declare class CounterMacro {
    static get identifier(): string;
    defaultConfig(): {
        loadingBarColor: string;
        iconColor: string;
        countColor: string;
        icon: null;
        url: string;
        refreshInterval: number;
    };
    start(): void;
    loadingBar: LoadingBar | undefined;
    interval: NodeJS.Timer | undefined;
    stop(): void;
}
declare class LoadingBar {
    constructor(interval: any, options: any, callbacks: any);
    height: any;
    width: any;
    color: any;
    callbacks: any;
    speed: number;
    start(callback: any): void;
    interval: any;
    reset(): void;
    stop(): void;
}
