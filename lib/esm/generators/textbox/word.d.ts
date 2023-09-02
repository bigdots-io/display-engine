export class Word {
    constructor(word: any, font: any, options: any);
    word: any;
    font: any;
    options: any;
    getWidth(): number;
    getHeight(): any;
    render(): {
        width: number;
        dots: any[];
    };
}
