import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import replace from 'rollup-plugin-replace'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import vue from 'rollup-plugin-vue'
import AutoImport from 'unplugin-auto-import/rollup'
import pkg from './package.json'


const env = process.env.NODE_ENV
const path = require('path')
const resolveDir = dir => path.join(__dirname, dir)
export default{
  input: './src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'dinert-element-plus',
      inlineDynamicImports: true,
      sourcemap: true,
      globals: {
        vue: 'Vue'
      }
    },
    {
      file: pkg.module,
      format: 'esm',
      inlineDynamicImports: true,
      sourcemap: true
    },
    {
      file: pkg.main,
      format: 'cjs',
      inlineDynamicImports: true,
      sourcemap: true
    }
  ],
  plugins: [
    vue({
      style: {
        postcssPlugins: [
          autoprefixer(),
        ]
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve(),
    postcss({
      plugins: [
        autoprefixer(), 
      ]
    }),
    alias({
      entries:[
        {find: '@', replacement: resolveDir('src')},
        {find: '#', replacement: resolveDir('packages')}
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    livereload(),
    serve({
      port:3003,
      contentBase: ''
    }),
    AutoImport({
      imports: ['vue'],
    })
  ],
  external: [  //外部库， 使用'umd'文件时需要先引入这个外部库
  'vue',
  'element-plus'
  ],
  watch: {  // 配置监听处理
    exclude: 'node_modules/**'
  }
}