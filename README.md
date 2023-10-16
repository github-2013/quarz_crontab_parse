# quarz_crontab_parse
![github license](https://img.shields.io/github/license/github-2013/quarz_crontab_parse)
![Language](https://img.shields.io/badge/language-typescript-brightgreen)
![npm](https://img.shields.io/npm/v/quarz_crontab_parse.svg?style=flat)
![Github Actions](https://github.com/github-2013/quarz_crontab_parse/actions/workflows/tests.yml/badge.svg)
![](https://img.shields.io/github/languages/top/github-2013/quarz_crontab_parse?logo=github)

将复杂难懂的quarzcrontab表达式转换为中文

#### 表达式例子：
```
0 15 10 ? * 2-6 表示周一到周五每天上午10:15执行作业
    
0 0 10,14,16 * * ? 表示每天上午10点，下午2点，4点

0 5 14-16 * * ? 每天下午2点到下午2:05期间的每1分钟触发

0 15 10 L * ? 每月最后一日的上午10:15触发

0 15 10 ? * 6 每月的星期五上午10:15触发

0 0 12 * * ? 2002  2002年每天中午12点触发

0 15 10 ? * ? 2002-2005 2002-2005年每天中午10点15分触发

0 15 10 ? * 6L 每月的最后一个星期五上午10:15触发

0 15 10 6#4 * ? 每月第四周的星期五10点15分触发

0 15 10 * * ? * 每天上午10:15触发

0 15 10 * * ? 2005 2005年的每天上午10:15触发

0 * 14 * * ? 在每天下午2点到下午2:59期间的每1分钟触发

0 0/5 14 * * ? 在每天下午2点到下午2:55期间的每5分钟触发

0 0/5 14,18 * * ? 在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发

8/10 0/5 3/4 * * ? 每天23点到23:59分每4个小时的58分钟内每10秒触发
```

## Usage
### ESModule下使用
```
npm install quarz_crontab_parse -S

import parseCrontab from 'quarz_crontab_parse'

...
const crontabCn = parseCrontab('0 15 10 ? * 2-6')
console.log(crontabCn)
...

```
### umd环境下
```
...
const crontabCn = parseCrontab('0 15 10 ? * 2-6')
console.log(crontabCn)
...

```

### 解析规则
**/**：表示起始时间开始触发，然后每隔固定时间触发一次。

**范围值 + 开始值 - 间隔值 = 范围内最后执行的值**

> 例如在Hours域使用3/4，则意味着从第3小时到24+3-4：23小时范围内，第3小时开始触发第一次，然后每隔4小时，即7，11，15，19，23小时等分别触发一次。
>
> 例如在Minutes域使用5/20，则意味着从第5分钟到60+5-20：45分范围内，第5分钟开始触发第一次，然后每隔20分钟，即25，45分钟等分别触发一次。
>
> 例如在Seconds域使用8/10，则意味着从第8秒到60+8-10：58秒范围内，第8秒开始触发第一次，然后每隔10秒，即18，28，38，48，58秒等分别触发一次。

*****：表示匹配该域的任意值。
> 例如在Minutes域使用*， 即表示每分钟都会触发事件。

**?**：表示只能用在DayOfMonth和DayOfWeek两个域，其作用为不指定

**-**：表示范围。
> 例如在Minutes域使用5-20，表示从5分到20分钟每分钟触发一次

**,**：表示列出枚举值。
> 例如在Minutes域使用5，20，则意味着在5和20分每分钟触发一次。

**L**：表示最后，只能出现在DayOfWeek和DayOfMonth域。
> 如果出现在DayOfMonth域，只能使用L，表示当月最后一天
> 如果在DayOfWeek域 使用数字（1-7）或L（和7的作用一样表示每周的最后一天周六），比如数字"5"表示每周4，"7"或"L"表示每周六
> 使用数字（1-7）结合L，表示当月最后一周的周几，比如"5L" 表示在最后的一周的周四；"3L" 表示最后一周的周二

**#**：用于确定每个月第几个星期几，只能出现在DayofMonth域。 
> 例如 "4#2" 表示某月的第二个星期三（4表示星期三，2表示第二周）;
> “6#3”表示本月第三周的星期五（6表示星期五，3表示第三周）; “2#1”表示本月第一周的星期一; “4#5”表示第五周的星期三。
