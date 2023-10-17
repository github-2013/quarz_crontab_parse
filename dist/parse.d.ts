type ValidReg = {
    [index: string]: RegExp;
};
export declare const NormalReg: ValidReg;
export declare const HashReg: ValidReg;
export declare const SlashReg: ValidReg;
export declare const DashReg: ValidReg;
export declare function parse(symbol: string, unit: string, extraReg?: RegExp): string;
export declare function prevProcess(allStr: string, str: string): string;
export declare function postProcess(allStr: string, allSymbol: string[]): string;
export {};
