import {prevProcess, parse, postProcess} from "./parse";


/**
 * cron转中文
 * @param { string } exp - 表达式
 * @return { string } - 中文
 */
export default function parseCrontab(exp: string): string {
  return translateToChinese(exp, ['秒', '分', '时', '日', '月', '周', '年']);
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
  if (cronSymbols.length === 6 || cronSymbols.length === 7) {
    // 所有表达式都为*
    const allAsterisk = cronSymbols.every(item => item === '*')
    if (allAsterisk) {
      return "每秒"
    }

    debugger
    if (cronSymbols.length === 7) {
      // 解析年 Year
      const years = cronSymbols[6];
      cronChinese = parse(years, TimeUnits[6])
    }

    // 解析月 Month
    const months = cronSymbols[4];
    const monthLiteral = parse(months, TimeUnits[4])
    cronChinese = prevProcess(cronChinese, monthLiteral)

    // 解析周 Week
    const weeks = cronSymbols[5];
    const weekLiteral = parse(weeks, TimeUnits[5])
    cronChinese = prevProcess(cronChinese, weekLiteral)

    // 解析日 Day
    const days = cronSymbols[3];
    const dayLiteral = parse(days, TimeUnits[3]);
    cronChinese = prevProcess(cronChinese, dayLiteral)

    // 解析时 Hour
    const hours = cronSymbols[2];
    const hourLiteral = parse(hours, TimeUnits[2])
    cronChinese = prevProcess(cronChinese, hourLiteral)

    // 解析分 Minute
    const minutes = cronSymbols[1];
    const minuteLiteral = parse(minutes, TimeUnits[1])
    cronChinese = prevProcess(cronChinese, minuteLiteral)

    // 解析秒 Second
    const seconds = cronSymbols[0];
    const secondLiteral = parse(seconds, TimeUnits[0])
    cronChinese = prevProcess(cronChinese, secondLiteral)

    cronChinese = postProcess(cronChinese)

    if (cronChinese.length) {
      if (/^[每最第从\d]/.test(cronChinese)) {
        return cronChinese
      }
      if (/^[,]/.test(cronChinese)) {
        return cronChinese.substring(1)
      }

      return `每${cronChinese}`
    }

    return cronChinese
  } else {
    throw new Error("crontab格式不正确")
  }
}
