export declare const YearReg: RegExp;
export declare const WeekReg: RegExp;
export declare const MonthReg: RegExp;
export declare const DayReg: RegExp;
export declare const HourReg: RegExp;
export declare const MinuteReg: RegExp;
export declare const SecondReg: RegExp;
export declare const DashReg: {
    周: RegExp;
};
export declare const TimeUnitLabels: string[];
export declare function parse(symbol: string, unit: string, extraReg?: RegExp): string;
export declare function newPrefix(allStr: string, str: string): string;
