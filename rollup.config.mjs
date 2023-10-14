import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript'
import babel from "@rollup/plugin-babel";
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: "json" };

const production = process.env.ENV === 'prod';

export default {
    input :"./src/index.ts",
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        },
        {
            name: 'parseCrontab',
            file: pkg.umd,
            format: 'umd'
        }
    ],
    plugins: [
        // 解析第三方依赖
        nodeResolve(),
        // 识别commonjs的第三方依赖
        commonjs(),
        // 编译typescript
        typescript({
            module: "ESNext",
            sourceMap: !production,
        }),
        babel({
            // 编译库使用
            babelHelpers: 'bundled',
            // 值转换源码
            exclude: "node_modules/**",
            // 编译ts
            extensions: ['.js', '.ts']
        }),
        production &&
        terser()
    ]
}
