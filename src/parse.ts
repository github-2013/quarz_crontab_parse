type Week = {
    [index: string]: {
        nameCn: string,
        nameEn: string,
    }
}

type TimeRange = {
    [index: string]: {
        range: number,
        unit: '秒' | '分钟' | '小时'
    }
}

const Week_Enum: Week = {
    '1': {
        nameCn: '星期天',
        nameEn: 'Sunday',
    },
    '2': {
        nameCn: '星期一',
        nameEn: 'Monday',
    },
    '3': {
        nameCn: '星期二',
        nameEn: 'Tuesday',
    },
    '4': {
        nameCn: '星期三',
        nameEn: 'Wednesday',
    },
    '5': {
        nameCn: '星期四',
        nameEn: 'Thursday',
    },
    '6': {
        nameCn: '星期五',
        nameEn: 'Friday',
    },
    '7': {
        nameCn: '星期六',
        nameEn: 'Saturday',
    }
};

export const YearReg = /^([19|20]\d{2})#(\d+)$/
export const WeekReg = /^([1-7])#(\d+)$/
export const MonthReg = /^(1[0-2]|[1-9])#(\d+)$/
export const DayReg = /^(3[01]|[12][0-9]|[1-9])#(\d+)$/
export const HourReg = /^([0-23])#(\d+)$/
export const MinuteReg = /^([0-59])#(\d+)$/
export const SecondReg = /^([0-59])#(\d+)$/

export const DashReg = {
    '周': /^([1-7])-(\d+)$/
}

const TIME_RANGE: TimeRange = {
    "秒": {
        range: 60,
        unit: "秒"
    },
    "分": {
        range: 60,
        unit: "分钟"
    },
    "时": {
        range: 24,
        unit: "小时"
    },
};

export const TimeUnitLabels = ['秒', '分', '时', '天', '月', '周', '年']

export function parse(symbol: string, unit: string, extraReg?: RegExp): string {
    switch (true) {
        // 解析 *
        case /^\*$/.test(symbol):
            return unit
        // 解析 ？
        case /^\?$/.test(symbol):
            return ''
        // 解析 #
        case /^\d+#\d+$/.test(symbol):
            if (extraReg) {
                const matches = symbol.match(extraReg);
                if (matches) {
                    return getHashLabel(matches![1], matches![2], unit);
                } else {
                    throw new Error(`${unit}${symbol}格式不正确`)
                }
            }

            const range = symbol.split('#');
            const [start, end] = range;
            return `第${end}${unit}的${start}${unit}`;
        // 解析 ,
        case /^(\d+,)+\d+$/.test(symbol): {
            return getCommaLabel(symbol, unit)
        }
        // 解析 -
        case /^[0-9]+-[0-9]+$/.test(symbol): {
            return getDashLabel(symbol, unit);
        }
        // 解析 /
        case /^[*0-9]+\/[0-9]+$/.test(symbol): {
            if (["时", "分", "秒"].includes(unit)) {
                return timeGapInfo(symbol, unit);
            } else {
                const range = symbol.split('/');
                const [start, end] = range
                if (['0', '*'].includes(start)) {
                    return `每隔${end}${unit}`
                }
                return `从第${start}${unit}开始，每隔${end}${unit}`
            }
        }
        // 解析 L
        case /^\d*[Ll]$/.test(symbol): {
            const range = symbol.split('L');
            const [start] = range
            if (matchWeekName(range[0])) {
                return `最后一${unit}的${matchWeekName(start)}`;
            } else {
                return `最后一${unit}`;
            }
        }
        // 解析 数字
        case /^\d+$/.test(symbol): {
            return getNormalLabel(symbol, unit)
        }
        default: {
            return ''
        }
    }
}

function matchWeekName(code: string, cn: boolean = true): string | undefined {
    const week = Object.entries(Week_Enum);
    for (let i = 0; i < week.length; i++) {
        const [key, value] = week[i];
        if (key === code) {
            return cn ? value.nameCn : value.nameEn;
        }
    }
}

function getNormalLabel(value: string, unitType: string): string {
    switch (unitType) {
        case '秒':
            return `${value}秒`
        case '分':
            return `${value}分`
        case '时':
            return `${value}时`
        case '天':
            return `${value}时`
        case '月':
            return `${value}时`
        case '周': {
            return `周${matchWeekName(value)}`
        }
        case '年': {
            return `${value}年`
        }
        default: {
            return ''
        }
    }
}

function getLLabel(value: string, unit: string): string {
    const range = value.split('L') || value.split('l');
    const [start] = range;

    switch (unit) {
        case '秒': {
            return `最后一${unit}`
        }
        case '分': {
            return `最后一${unit}`
        }
        case '时': {
            return `最后一${unit}`
        }
        case '天': {
            return `最后一${unit}`
        }
        case '月': {
            return `最后一${unit}`
        }
        case '周': {
            return `最后一${unit}的${matchWeekName(start)}`
        }
        case '年': {
            return `最后一${unit}`
        }
        default: {
            return ''
        }
    }
}

function getCommaLabel(value: string, unit: string): string {
    function showRangeLabel(value: string) {
        const range = value.split(',')
        if (range.length === 2) {
            return `第${value.replace(/,/g, "和第")}${unit}`;
        } else {
            const lastCommaIndex = value.lastIndexOf(',')
            const lastSymbol = value.substring(lastCommaIndex + 1)
            const restSymbol = value.substring(0, lastCommaIndex)
            return `第${restSymbol.replace(/,/g, "、第")}和第${lastSymbol}${unit}`;
        }
    }

    switch (unit) {
        case '秒': {
            return showRangeLabel(value)
        }
        case '分': {
            return `${showRangeLabel(value)}钟`
        }
        case '时': {
            return showRangeLabel(value)
        }
        case '天': {
            return showRangeLabel(value)
        }
        case '月': {
            return showRangeLabel(value)
        }
        case '周': {
            return showRangeLabel(value)
        }
        case '年': {
            return showRangeLabel(value)
        }
        default: {
            return ''
        }
    }
}

function getDashLabel(value: string, unit: string): string {
    const range = value.split('-');
    const [start, end] = range;

    switch (unit) {
        case '秒': {
            return `${start}${unit}到${end}${unit}`
        }
        case '分': {
            return `${start}${unit}到${end}${unit}`
        }
        case '时': {
            return `${start}${unit}到${end}${unit}`
        }
        case '天': {
            return `${start}${unit}到${end}${unit}`
        }
        case '月': {
            return `${start}${unit}到${end}${unit}`
        }
        case '周': {
            return `${unit}${matchWeekName(start)}到${matchWeekName(end)}`
        }
        case '年': {
            return `${start}${unit}到${end}${unit}`
        }
        default: {
            return ''
        }
    }
}

function getHashLabel(value1: string, value2: string, unit: string): string {
    switch (unit) {
        case '秒': {
            return `第${value2}个${value1}${unit}`
        }
        case '分': {
            return `第${value2}个${value1}${unit}`
        }
        case '时': {
            return `第${value2}个${value1}${unit}`
        }
        case '天': {
            return `第${value2}个${value1}${unit}`
        }
        case '月': {
            return `第${value2}个${value1}${unit}`
        }
        case '周': {
            return `第${value2}个${matchWeekName(value1)}`
        }
        case '年': {
            return `第${value2}个${value1}${unit}`
        }
        default: {
            return ''
        }
    }
}

export function newPrefix(allStr: string, str: string): string {
    if (allStr.length === 0 && str.length === 1) {
        return str
    } else if (allStr.length === 1 && str.length === 1) {
        return str
    } else if (allStr.length > 1 && str.length === 1){
        return allStr
    } else if (allStr.length === 1 && str.length > 1) {
        return str
    }else {
        return allStr + str
    }
}

function timeGapInfo(value: string, unit: string): string {
    const range = value.split('/');
    const [start, end] = range;
    const rangeNum = TIME_RANGE[unit].range + parseInt(start) - parseInt(end);

    return `从${start}${unit}开始到${rangeNum}${TIME_RANGE[unit].unit}范围内每隔${end}${TIME_RANGE[unit].unit},`;
}
