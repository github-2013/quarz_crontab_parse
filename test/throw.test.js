const parseCrontab = require("../dist/index.cjs");
describe('test throw exception', () => {
    test('* * * * *', () => {
        expect(() => parseCrontab('? ? ? ? ? ? 1889#3')).toThrow(new Error('年1889#3格式不正确'))
    })

    test('? ? ? ? ? ? 1889#3', () => {
        expect(() => parseCrontab('? ? ? ? ? ? 1889#3')).toThrow(new Error('年1889#3格式不正确'))
    })

    test('? ? ? ? ? ? 2100#3', () => {
        expect(() => parseCrontab('? ? ? ? ? ? 2100#3')).toThrow(new Error('年2100#3格式不正确'))
    })

    test('? ? ? ? 89#3 ? ?', () => {
        expect(() => parseCrontab('? ? ? ? 89#3 ? ?')).toThrow(new Error('月89#3格式不正确'))
    })

    test('? ? ? ? ? 15#3 ?', () => {
        expect(() => parseCrontab('? ? ? ? ? 15#3 ?')).toThrow(new Error('周15#3格式不正确'))
    })
})
