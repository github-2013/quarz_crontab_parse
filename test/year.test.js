const parseCrontab = require("../dist/index.cjs");
describe('test year', () => {
    test(' ? ? ? ? ? ? ? ', () => {
        expect(parseCrontab(' ? ? ? ? ? ? ? ')).toBe('')
    })

    test(' ? ? ? ? ? ? ?', () => {
        expect(parseCrontab(' ? ? ? ? ? ? ?')).toBe('')
    })

    test('? ? ? ? ? ? ? ', () => {
        expect(parseCrontab('? ? ? ? ? ? ? ')).toBe('')
    })

    test('? ? ? ? ? ? ?', () => {
        expect(parseCrontab('? ? ? ? ? ? ?')).toBe('')
    })

    test('? ? ? ? ? ? *', () => {
        expect(parseCrontab('? ? ? ? ? ? *')).toBe('每年')
    })

    test('? ? ? ? ? ? 0', () => {
        expect(() => parseCrontab('? ? ? ? ? ? 0')).toThrow(new Error('年0格式不正确'))
    })

    test('? ? ? ? ? ? 2002#33', () => {
        expect(parseCrontab('? ? ? ? ? ? 2002#33')).toBe('第33个2002年')
    })

    test('? ? ? ? ? ? 2002,2003', () => {
        expect(parseCrontab('? ? ? ? ? ? 2002,2003')).toBe('第2002和第2003年')
    })

    test('? ? ? ? ? ? 2002,2003,2004,2005', () => {
        expect(parseCrontab('? ? ? ? ? ? 2002,2003,2004,2005')).toBe('第2002、第2003、第2004和第2005年')
    })

    test('? ? ? ? ? ? 2002-2003', () => {
        expect(parseCrontab('? ? ? ? ? ? 2002-2003')).toBe('2002年到2003年')
    })

    test('? ? ? ? ? ? 0/4', () => {
        expect(parseCrontab('? ? ? ? ? ? 0/4')).toBe('每隔4年')
    })

    test('? ? ? ? ? ? */4', () => {
        expect(parseCrontab('? ? ? ? ? ? */4')).toBe('每隔4年')
    })

    test('? ? ? ? ? ? 2003/4', () => {
        expect(parseCrontab('? ? ? ? ? ? 2003/4')).toBe('从第2003年开始，每隔4年')
    })

    test('? ? ? ? ? ? -1', () => {
        expect(() => parseCrontab('? ? ? ? ? ? -1')).toThrow(new Error("值域不能为负数"))
    })

    test('? ? ? ? ? ? 2132/5', () => {
        expect(() => parseCrontab('? ? ? ? ? ? 2132/5')).toThrow(new Error('年2132/5格式不正确'))
    })

    test('? ? ? ? ? ? 1969-2100', () => {
        expect(() => parseCrontab('? ? ? ? ? ? 1969-2100')).toThrow(new Error('年1969-2100格式不正确'))
    })
})
