const CRON_TIME_CN = ['秒', '分', '时', '天', '月', '周', '年'];
const HOURS = 24;
const TIMESCALE = 60;

const WEEK_ENUM: any = {
  '1,SUN': {
    nameCn: '星期天',
    nameEn: 'Sunday',
  },
  '2,MON': {
    nameCn: '星期一',
    nameEn: 'Monday',
  },
  '3,TUE': {
    nameCn: '星期二',
    nameEn: 'Tuesday',
  },
  '4,WED': {
    nameCn: '星期三',
    nameEn: 'Wednesday',
  },
  '5,THU': {
    nameCn: '星期四',
    nameEn: 'Thursday',
  },
  '6,FRI': {
    nameCn: '星期五',
    nameEn: 'Friday',
  },
  '7,SAT': {
    nameCn: '星期六',
    nameEn: 'Saturday',
  },
};

function matchWeekName(code: string, cn: boolean = true): string {
  const week = Object.entries(WEEK_ENUM);
  for (let i = 0; i < week.length; i++) {
    const [key, value] = week[i] as [string, {nameCn: string, nameEn: string}];
    if (key.includes(code)) {
      return cn ? value.nameCn : value.nameEn;
    }
  }
}

/**
 * cron转中文.
 * @param cronExp 表达式
 * @return 中文
 */
export default function parseCrontab(cronExp: string): string {
  return translateToChinese(cronExp, CRON_TIME_CN);
}

/**
 *
 * @param cronExp
 * @param cronTimeArr
 */
function translateToChinese(cronExp: string, cronTimeArr: string[]): string {
  if (cronExp === null || cronExp.trim().length < 1) {
    throw new Error('cron表达式为空');
  }

  const tmpCorns = cronExp.trim().split(' ');
  let sBuffer = '';
  if (tmpCorns.length === 6 || tmpCorns.length === 7) {
    if (tmpCorns.length === 7) {
      // 解析年 Year
      const year = tmpCorns[6];
      if (year !== '*' && year !== '?') {
        if (year.includes('-')) {
          const splitYear = year.split('-');
          const yearOne = splitYear[0];
          const yearTwo = splitYear[1];
          sBuffer += `${yearOne}年到${yearTwo}年`;
        } else {
          sBuffer += `${year}${cronTimeArr[6]}`;
        }
      }
    }
    // 解析月 Month
    const months = tmpCorns[4];
    if (months !== '*' && months !== '?') {
      if (months.includes('/')) {
        sBuffer += `从${months.split('/')[0]}号开始",每${months.split('/')[1]}${cronTimeArr[4]}`;
      } else {
        if (sBuffer.includes('-')) {
          sBuffer += '每年';
        }
        const splitMonth = months.split('-');
        const monthOne = splitMonth[0];
        const monthTwo = splitMonth[1];
        sBuffer += `${monthOne}月到${monthTwo}月`;
      }
    }

    // 解析周 dayOfWeek 主要解析 , - 1~7/L 1L~7L
    let dayOfWeek = tmpCorns[5];
    if (dayOfWeek !== '*' && dayOfWeek !== '?') {
      if (dayOfWeek.includes(',')) {
        // 多个数字，逗号隔开
        sBuffer += `每周的第${dayOfWeek}${cronTimeArr[3]}`;
      }
      // 1L-7L
      else if (dayOfWeek.includes('L') && dayOfWeek.length > 1) {
        const weekNum = dayOfWeek.split('L')[0];
        const weekName = judgeWeek(weekNum);
        sBuffer += '每月的最后一周的';
        sBuffer += weekName;
      } else if (dayOfWeek.includes('-')) {
        const splitWeek = dayOfWeek.split('-');
        const weekOne = judgeWeek(splitWeek[0]);
        const weekTwo = judgeWeek(splitWeek[1]);
        sBuffer += `每周的${weekOne}到${weekTwo}`;
      } else {
        // 1-7/L
        // L 转换为7，便于识别
        if ('L' === dayOfWeek) {
          dayOfWeek = '7';
          // dayOfWeek = "SAT";
        }
        // int weekNums = Integer.parseInt(dayOfWeek);
        // if (weekNums < 0 || weekNums > 7) {
        //   return "cron表达式有误，dayOfWeek数字应为1-7";
        // }
        sBuffer += '每周的';
        const weekName = judgeWeek(dayOfWeek);
        sBuffer += weekName;
      }
    }
    // 解析日 days -- DayofMonth 需要解析的 / # L W
    // * “6#3”表示本月第三周的星期五（6表示星期五，3表示第三周）;
    // * “2#1”表示本月第一周的星期一;
    // * “4#5”表示第五周的星期三。
    const days = tmpCorns[3];
    if (days !== '?' && days !== '*') {
      if (days.includes('/')) {
        sBuffer += `每周从第${days.split('/')[0]}天开始,每${days.split('/')[1]}${cronTimeArr[3]}`;
      }
      // 处理L 每月的最后一天
      else if ('L' === days) {
        sBuffer += '每月最后一天';
      }
      // 处理W 暂时不懂怎么处理
      else if ('W' === days) {
        sBuffer += days;
      } else if (days.includes('#')) {
        const splitDays = days.split('#');
        const weekNum = splitDays[0]; // 前面数字表示周几
        const weekOfMonth = splitDays[1]; // 后面的数字表示第几周 范围1-4 一个月最多4周
        const weekName = judgeWeek(weekNum);
        sBuffer += `每月第${weekOfMonth}${cronTimeArr[5]}${weekName}`;
      } else {
        // sBuffer.append("每月").append(days).append(cronTimeArr[3]);
        sBuffer += `每月${days}号`;
      }
    } else {
      if ((sBuffer.length === 0 || tmpCorns.length === 7) && !sBuffer.includes('星期')) {
        // 前面没有内容的话，拼接下
        sBuffer += `每${cronTimeArr[3]}`;
      }
    }
    // 解析时 Hours 主要解析 /
    const hours = tmpCorns[2];
    if (hours !== '*') {
      if (hours.includes('/')) {
        sBuffer += appendGapInfo(hours, HOURS, 2);
      } else {
        if (!(sBuffer.length > 0)) {
          // 对于 , 的情况，直接拼接
          sBuffer += `每天${hours}${cronTimeArr[2]}`;
        } else {
          sBuffer += `${hours}${cronTimeArr[2]}`;
        }
      }
    }

    // 解析分 Minutes 主要解析 /
    const minutes = tmpCorns[1];
    if (minutes !== '*') {
      if (minutes.includes('/')) {
        // sBuffer.append("内，从第").append(minutes.split("/")[0]).append("分开始").append(",每")
        // .append(minutes.split("/")[1]).append(cronTimeArr[1]);
        sBuffer += appendGapInfo(minutes, TIMESCALE, 1);
      } else if (minutes.includes('0')) {
      } else if (minutes.includes('-')) {
        const splitMinute = minutes.split('-');
        sBuffer += `${splitMinute[0]}${cronTimeArr[1]}到${splitMinute[1]}${cronTimeArr[1]}每分钟`;
      } else {
        sBuffer += `${minutes}${cronTimeArr[1]}`;
      }
    }

    // 解析秒 Seconds 主要解析 /
    const seconds = tmpCorns[0];
    if (seconds !== '*') {
      if (seconds.includes('/')) {
        // sBuffer.append("内，从第").append(seconds.split("/")[0]).append("秒开始").append(",每")
        // .append(seconds.split("/")[0]).append(cronTimeArr[0]);
        sBuffer += appendGapInfo(seconds, TIMESCALE, 0);
      } else if (seconds !== '0') {
        sBuffer += `${seconds}${cronTimeArr[0]}`;
      }
    }


    sBuffer += '表达式中文转换异常';
  }
  return sBuffer;
}

function judgeWeek(weekNum: string): string {
  const weekNums = window.parseInt(weekNum);
  if (weekNums < 0 || weekNums > 7) {
    throw new Error('crontab表达式有误，dayOfWeek数字应为1-7');
  }
  return matchWeekName(weekNum);
}

function appendGapInfo(time: string, rangeNum: number, index: number): string {
  let sBufferTemp = '';
  const splitTime = time.split('/');
  const startNum = splitTime[0];
  const gapNum = splitTime[1];
  const endNum = rangeNum + window.parseInt(startNum) - window.parseInt(gapNum);
  const endStr = `${endNum}`;
  const timeUnit = CRON_TIME_CN[index];
  let splitTimeUnit = CRON_TIME_CN[index];
  if (index == 1) {
    splitTimeUnit = '分钟';
  } else if (index == 2) {
    splitTimeUnit = '小时';
  }
  sBufferTemp += `从${startNum}${timeUnit}开始到${endStr}${timeUnit}范围内,每隔${gapNum}${splitTimeUnit}`;
  return sBufferTemp;
}
