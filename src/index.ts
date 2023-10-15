import {DayReg, HourReg, MinuteReg, MonthReg, newPrefix, parse, SecondReg, WeekReg, YearReg} from "./parse";



/**
 * cron转中文
 * @param { string } exp - 表达式
 * @return { string } - 中文
 */
export default function parseCrontab(exp: string): string {
  return translateToChinese(exp, ['秒', '分', '时', '天', '月', '周', '年']);
}

/**
 * 解析为中文
 * @param { String } exp - exp 表达式
 * @param { Array } TimeUnits - 单位
 */
function translateToChinese(exp: string, TimeUnits: string[]): string {
  if (exp === null || exp.trim().length < 1) {
    throw new Error('cron表达式为空');
  }

  let cronSymbols = exp.trim().split(' ');
  let cronChinese = '';
  debugger
  if (cronSymbols.length === 6 || cronSymbols.length === 7) {
    if (cronSymbols.length === 7) {
      // 解析年 Year
      const years = cronSymbols[6];
      cronChinese = parse(years, TimeUnits[6], YearReg)
    }

    // 所有表达式都为*
    const allAsterisk = cronSymbols.every(item => item === '*')
    if (allAsterisk) {
      return "每秒"
    }

    // 解析月 Month
    const months = cronSymbols[4];
    const monthLiteral = parse(months, TimeUnits[4], MonthReg)
    cronChinese = newPrefix(cronChinese, monthLiteral)

    // 解析周 Week
    const weeks = cronSymbols[5];
    const weekLiteral = parse(weeks, TimeUnits[5], WeekReg)
    cronChinese = newPrefix(cronChinese, weekLiteral)

    // 解析日 Day
    const days = cronSymbols[3];
    const dayLiteral = parse(days, TimeUnits[3], DayReg);
    cronChinese = newPrefix(cronChinese, dayLiteral)

    // 解析时 Hour
    const hours = cronSymbols[2];
    const hourLiteral = parse(hours, TimeUnits[2], HourReg)
    cronChinese += hourLiteral

    // 解析分 Minute
    const minutes = cronSymbols[1];
    const minuteLiteral = parse(minutes, TimeUnits[1], MinuteReg)
    cronChinese += minuteLiteral

    // 解析秒 Second
    const seconds = cronSymbols[0];
    const secondLiteral = parse(seconds, TimeUnits[0], SecondReg)
    cronChinese += secondLiteral

    if (cronChinese.length) {
      if (cronChinese.startsWith("最后一")) {
        return cronChinese
      }
      if (cronChinese.startsWith("第")) {
        return cronChinese
      }
      if (cronChinese.includes("年")) {
        return cronChinese
      }
      return `每${cronChinese}`
    } else {
      return ''
    }
  } else {
    throw new Error("crontab格式不正确")
  }
}
