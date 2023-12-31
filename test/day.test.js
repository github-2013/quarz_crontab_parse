const parseCrontab = require("../dist/index.cjs");
describe('test day', () => {
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

    test('? ? ? * ? ? ?', () => {
        expect(parseCrontab('? ? ? * ? ? ?')).toBe('每日')
    })

    test('? ? ? 0 ? ? ?', () => {
        expect(parseCrontab('? ? 0 ? ? ? ?')).toBe('0时')
    })

    test('? ? ? 15#3 ? ? ?', () => {
        expect(parseCrontab('? ? ? 15#3 ? ? ?')).toBe('第3个15日')
    })

    test('? ? ? 5,10 ? ? ?', () => {
        expect(parseCrontab('? ? ? 5,10 ? ? ?')).toBe('第5和第10日')
    })

    test('? ? ? 5,10,15,20 ? ? ?', () => {
        expect(parseCrontab('? ? ? 5,10,15,20 ? ? ?')).toBe('第5、第10、第15和第20日')
    })

    test('? ? ? 10-40 ? ? ?', () => {
        expect(() => parseCrontab('? ? ? 10-40 ? ? ?')).toThrow(new Error('日10-40格式不正确'))
    })

    test('? ? ? */5 ? ? ?', () => {
        expect(parseCrontab('? ? ? */5 ? ? ?')).toBe('每隔5日')
    })

    test('? ? ? 10/5 ? ? ?', () => {
        expect(parseCrontab('? ? ? 10/5 ? ? ?')).toBe('从第10日开始，每隔5日')
    })

    test('? ? ? 0/5 ? ? ?', () => {
        expect(parseCrontab('? ? ? 0/5 ? ? ?')).toBe('每隔5日')
    })

    test('? ? ? -1/5 ? ? ?', () => {
        expect(() => parseCrontab('? ? ? -1/5 ? ? ?')).toThrow(new Error('值域不能为负数'))
    })

    test('? ? ? 32/5 ? ? ?', () => {
        expect(() => parseCrontab('? ? ? 32/5 ? ? ?')).toThrow(new Error('日32/5格式不正确'))
    })

    test('? ? ? 32-5 ? ? ?', () => {
        expect(() => parseCrontab('? ? ? 32-5 ? ? ?')).toThrow(new Error('日32-5格式不正确'))
    })
})
