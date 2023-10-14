const parseCrontab = require("../dist/index.cjs");

test('0 0,1,2,3 0 * * ? *', () => {
    expect(parseCrontab('0 0,1,2,3 0 * * ? *')).toBe('每天0时第0,1,2,3分')
})
test('0 0,1,2,3 0 * * ? *', () => {
    expect(parseCrontab('0 0,1,2,3 0 * * ? *')).toBe('每天0时第0,1,2,3分')
})
test('30-59 0 0 * * ? *', () => {
    expect(parseCrontab('30-59 0 0 * * ? *')).toBe('每天0时0分30秒到59秒')
})
test('* * 0 * * ? *', () => {
    expect(parseCrontab('* * 0 * * ? *')).toBe('每天0时')
})
test('* * * * * ? *', () => {
    expect(parseCrontab('* * * * * ? *')).toBe('每天')
})
test('0 0 * * * ? *', () => {
    expect(parseCrontab('0 0 * * * ? *')).toBe('每天0分')
})
test('* * 0-1 * * ? *', () => {
    expect(parseCrontab('* * 0-1 * * ? *')).toBe('每天0时到1时')
})
test('* * 0 * * ? *', () => {
    expect(parseCrontab('* * 0 * * ? *')).toBe('每天0时')
})
test('0 ? ? ? ? ? ', () => {
    expect(parseCrontab('0 ? ? ? ? ? ')).toBe('每0秒')
})
test('0,1 ? ? ? ? ?', () => {
    expect(parseCrontab('0,1 ? ? ? ? ?')).toBe('第0,1秒')
})
test('0 0 2 1 * ? *', () => {
    expect(parseCrontab('0 0 2 1 * ? *')).toBe('每月1号每天2时0分')
})
test('0 15 10 ? * 2-6', () => {
    expect(parseCrontab('0 15 10 ? * 2-6')).toBe('每周的星期一到星期五每天10时15分')
})
test('0 0 10,14,16 * * ?', () => {
    expect(parseCrontab('0 0 10,14,16 * * ?')).toBe('每天每天10,14,16时0分')
})
test('0 5 14-16 * * ?', () => {
    expect(parseCrontab('0 5 14-16 * * ?')).toBe('每天14时到16时5分')
})
test('0 15 10 L * ?', () => {
    expect(parseCrontab('0 15 10 L * ?')).toBe('每月最后一天每天10时15分')
})
test('0 15 10 ? * 6', () => {
    expect(parseCrontab('0 15 10 ? * 6')).toBe('每周的星期五每天10时15分')
})
test('0 0 12 * * ? 2002', () => {
    expect(parseCrontab('0 0 12 * * ? 2002')).toBe('2002年每天每天12时0分')
})
test('0 15 10 ? * ? 2002-2005', () => {
    expect(parseCrontab('0 15 10 ? * ? 2002-2005')).toBe('2002年到2005年每天10时15分')
})
test('0 15 10 ? * 6L', () => {
    expect(parseCrontab('0 15 10 ? * 6L')).toBe('每月的最后一周的星期五每天10时15分')
})
test('0 15 10 6#4 * ?', () => {
    expect(parseCrontab('0 15 10 6#4 * ?')).toBe('每月第4周星期五每天10时15分')
})
test('0 15 10 * * ? *', () => {
    expect(parseCrontab('0 15 10 * * ? *')).toBe('每天每天10时15分')
})
test('0 15 10 * * ? 2005', () => {
    expect(parseCrontab('0 15 10 * * ? 2005')).toBe('2005年每天每天10时15分')
})
test('0 * 14 * * ?', () => {
    expect(parseCrontab('0 * 14 * * ?')).toBe('每天每天14时')
})
test('0 0/5 14 * * ?', () => {
    expect(parseCrontab('0 0/5 14 * * ?')).toBe('每天每天14时从0分开始到55分范围内,每隔5分钟')
})
test('0 0/5 14,18 * * ?', () => {
    expect(parseCrontab('0 0/5 14,18 * * ?')).toBe('每天每天14,18时从0分开始到55分范围内,每隔5分钟')
})
test('8/10 0/5 3/4 * * ?', () => {
    expect(parseCrontab('8/10 0/5 3/4 * * ?')).toBe('每天从3时开始到23时范围内,每隔4小时从0分开始到55分范围内,每隔5分钟从8秒开始到58秒范围内,每隔10秒')
})
test('0 0 7 ? 1-5 WED 2021', () => {
    expect(parseCrontab('0 0 7 ? 1-5 WED 2021')).toBe('2021年1月到5月每周的星期三每天7时0分')
})
