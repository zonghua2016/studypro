## 编译ES6、ES7
> babel/babel-presets/babel-plugin

### babel-loader
官网：babeljs.io
安装：
> yarn add babel-loader@8.0.0-beta.0 @babel/core //安装最新版

or
> yarn add babel-loader babel-core

### babel-preset
各种babel规范的总结
安装：
>yarn add @babel/preset-env //安装最新版

or
> yarn add babel-preset-env


``` javascript
{
  test: /\.js$/,
  use: {
    loader: 'babel-loder',
    options: {
      presets: ['@babel/preset-env', {
        targets: { //targets 会报错，待找错
          browsers: ['>1%', 'last 2 versions']  // 市场占有1%并且是最近两个版本
          // chrome: '52'  //必须大于chrome浏览器52版本
        }
      }]
    }
  },
  exculde: '/node_modules/'
}
```
### Babel Polyfill && Babel Runtime Transform  插件

实现一些还不支持的函数和方法
如：Generator、Set、Map、Array.from、Array.prototype.includes

### Babel Polyfill
Prolyfill：垫片
全局垫片，为开发应用而准备的插件
> yarn add babel-polyfill
> import 'babel-polyfill'
### Babel Runtime Transform
局部垫片，为开发框架准备
> yarn add babel-plugin-transform-runtime
> yarn add 'babel-runtime'
> .babelrc


## 提取公用代码
1. 减少代码冗余
2. 提高加载速度

### CommonsChunkPlugin
该插件已内置于webpack
webpack.optimize.CommonsChunkPlugin
[官方文档](https://webpack.docschina.org/plugins/commons-chunk-plugin/#配置)
``` javascript
{
  plugins:[
    new webpack.optimize.CommonsChunkPlugin(options)
  ]
}
```
options参数:
options.name  or options.names  表示chunk名称，可以是多个
options.filename                表示打包后的文件名
options.minChunks               
options.chunks
options.children
options.deepChildren
options.async

### 应用场景
1. 单页应用
2. 单页应用 + 第三方依赖
3. 单页应用 + 第三方依赖 + webpack生成代码

## 代码分隔和懒加载

### 引入css

#### style-loader
把需要引入的css引入页面，创建一个style标签

#### css-loader
让js中可以**import**一个css文件


