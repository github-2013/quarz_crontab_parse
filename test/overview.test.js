const parseCrontab = require("../dist/index.cjs");

describe('test overview', () => {
    test('* * * * * *', () => {
        expect(parseCrontab('* * * * * *')).toBe('每秒')
    })

    test('0 3,15 8-11 * ? ?', () => {
        expect(parseCrontab('0 3,15 8-11 * ? ?')).toBe('每日8时到11时第3和第15分钟0秒')
    })

    test('0 3,15 8-11 */2 ? ?', () => {
        expect(parseCrontab('0 3,15 8-11 */2 ? ?')).toBe('每隔2日8时到11时第3和第15分钟0秒')
    })

    test('0 3,15 8-11 ? ? 1', () => {
        expect(parseCrontab('0 3,15 8-11 ? ? 1')).toBe('每周星期天8时到11时第3和第15分钟0秒')
    })

    test('0 30 21 * ? ?', () => {
        expect(parseCrontab('0 30 21 * ? ?')).toBe('每日21时30分0秒')
    })

    test('0 45 4 1,10,22 * ?', () => {
        expect(parseCrontab('0 45 4 1,10,22 * ?')).toBe('每月第1、第10和第22日4时45分0秒')
    })

    test('0 10 1 ? * 1,2,6', () => {
        expect(parseCrontab('0 10 1 ? * 1,2,6')).toBe('每月第1、第2和第6周1时10分0秒')
    })

    test('0 0,30 18-23 * ? ?', () => {
        expect(parseCrontab('0 0,30 18-23 * ? ?')).toBe('每日18时到23时第0和第30分钟0秒')
    })

    test('0 0 23-7 * ? ?', () => {
        expect(parseCrontab('0 0 23-7 * ? ?')).toBe('每日23时到7时0分0秒')
    })

    test('0 0,1,2,3 0 * ? ? ?', () => {
        expect(parseCrontab('0 0,1,2,3 0 * ? ? ?')).toBe('每日0时第0、第1、第2和第3分钟0秒')
    })

    test('30-59 0 0 * ? ? ?', () => {
        expect(parseCrontab('30-59 0 0 * ? ? ?')).toBe('每日0时0分30秒到59秒')
    })

    test('? ? 0 * ? ? ?', () => {
        expect(parseCrontab('? ? 0 * ? ? ?')).toBe('每日0时')
    })

    test('* ? ? ? ? ? ?', () => {
        expect(parseCrontab('* ? ? ? ? ? ?')).toBe('每秒')
    })

    test('0 0 * ? ? ? ?', () => {
        expect(parseCrontab('0 0 * ? ? ? ?')).toBe('每时0分0秒')
    })

    test('? ? 0-1 * ? ? ?', () => {
        expect(parseCrontab('? ? 0-1 * ? ? ?')).toBe('每日0时到1时')
    })

    test('? ? 0 * ? ? ?', () => {
        expect(parseCrontab('? ? 0 * ? ? ?')).toBe('每日0时')
    })

    test('0 ? ? ? ? ? ', () => {
        expect(parseCrontab('0 ? ? ? ? ? ')).toBe('0秒')
    })

    test('0,1 ? ? ? ? ?', () => {
        expect(parseCrontab('0,1 ? ? ? ? ?')).toBe('第0和第1秒')
    })

    test('0 0 2 1 * ? ?', () => {
        expect(parseCrontab('0 0 2 1 * ? ?')).toBe('每月1日2时0分0秒')
    })

    test('0 15 10 ? ? 2-6', () => {
        expect(parseCrontab('0 15 10 ? ? 2-6')).toBe('每周星期一到星期五10时15分0秒')
    })

    test('0 0 10,14,16 * ? ?', () => {
        expect(parseCrontab('0 0 10,14,16 * ? ?')).toBe('每日第10、第14和第16时0分0秒')
    })

    test('0 5 14-16 * ? ?', () => {
        expect(parseCrontab('0 5 14-16 * ? ?')).toBe('每日14时到16时5分0秒')
    })

    test('0 15 10 L * ?', () => {
        expect(parseCrontab('0 15 10 L * ?')).toBe('每月最后一日10时15分0秒')
    })

    test('0 15 10 ? ? 6', () => {
        expect(parseCrontab('0 15 10 ? ? 6')).toBe('每周星期五10时15分0秒')
    })

    test('0 0 12 ? ? ? 2002', () => {
        expect(parseCrontab('0 0 12 ? ? ? 2002')).toBe('2002年12时0分0秒')
    })

    test('0 15 10 ? ? ? 2002-2005', () => {
        expect(parseCrontab('0 15 10 ? ? ? 2002-2005')).toBe('2002年到2005年10时15分0秒')
    })

    test('0 15 10 ? * 6L', () => {
        expect(parseCrontab('0 15 10 ? * 6L')).toBe('每月最后一周的星期五10时15分0秒')
    })

    test('0 15 10 6#4 * ?', () => {
        expect(parseCrontab('0 15 10 6#4 * ?')).toBe('每月第4个6日10时15分0秒')
    })

    test('0 15 10 ? * ? ?', () => {
        expect(parseCrontab('0 15 10 ? * ? ?')).toBe('每月10时15分0秒')
    })

    test('0 15 10 ? * ? 2005', () => {
        expect(parseCrontab('0 15 10 ? * ? 2005')).toBe('2005年每月10时15分0秒')
    })

    test('0 * 14 ? * ?', () => {
        expect(parseCrontab('0 * 14 ? * ?')).toBe('每月14时每分0秒')
    })

    test('0 0/5 14 * * ?', () => {
        expect(parseCrontab('0 0/5 14 * * ?')).toBe('每月每日14时,从0分开始到55分钟范围内每隔5分钟0秒')
    })

    test('0 0/5 14,18 * * ?', () => {
        expect(parseCrontab('0 0/5 14,18 * * ?')).toBe('每月每日第14和第18时,从0分开始到55分钟范围内每隔5分钟0秒')
    })

    test('8/10 0/5 3/4 * * ?', () => {
        expect(parseCrontab('8/10 0/5 3/4 * * ?')).toBe('每月每日,从3时开始到23小时范围内每隔4小时,从0分开始到55分钟范围内每隔5分钟,从8秒开始到58秒范围内每隔10秒')
    })
})
