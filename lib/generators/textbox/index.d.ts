export = Textbox;
declare class Textbox {
    constructor(options?: {});
    font: any;
    startingColumn: any;
    startingRow: any;
    width: any;
    height: any;
    spaceBetweenLetters: any;
    spaceBetweenLines: any;
    alignment: any;
    hex: any;
    wrap: any;
    options: {};
    getWidth(text: any): any;
    write(text: any): {
        x: any;
        y: any;
        hex: any;
    }[];
}
