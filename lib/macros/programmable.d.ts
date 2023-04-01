export = ProgrammableMacro;
declare class ProgrammableMacro {
    static get identifier(): string;
    start(): void;
    matrixRef: any;
    childChangedCallback: any;
    stop(): void;
}
