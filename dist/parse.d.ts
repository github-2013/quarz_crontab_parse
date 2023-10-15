type ValidReg = {
    [index: string]: RegExp;
};
export declare const NormalReg: ValidReg;
export declare const HashReg: ValidReg;
export declare const DashReg: ValidReg;
export declare const TimeUnitLabels: string[];
export declare function parse(symbol: string, unit: string, extraReg?: RegExp): string;
export declare function prevProcess(allStr: string, str: string): string;
export declare function postProcess(allStr: string): string;
export {};
