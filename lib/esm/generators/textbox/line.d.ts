export class Line {
    constructor(font: any, options: any);
    text: string;
    font: any;
    options: any;
    calculateProjectedWidth(word: any): any;
    getWidth(): number;
    append(word: any): void;
    render(): {
        width: any;
        dots: {
            x: any;
            y: any;
        }[];
    };
}
