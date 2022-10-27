# webpack-practice
Webpack5 核心原理与应用实践demo

## 1.认识webpack

#### 1.1 打包过程

- **输入**：从文件系统读入代码文件；
- **模块递归处理**：调用 Loader 转译 Module 内容，并将结果转换为 AST，从中分析出模块依赖关系，进一步递归调用模块处理过程，直到所有依赖文件都处理完毕；
- **后处理**：所有模块递归处理完毕后开始执行后处理，包括模块合并、注入运行时、产物优化等，最终输出 Chunk 集合；
- **输出**：将 Chunk 写出到外部文件系统；

从上述打包流程角度，Webpack 配置项大体上可分为两类：

- **流程类**：作用于打包流程某个或若干个环节，直接影响编译打包效果的配置项
- **工具类**：打包主流程之外，提供更多工程化工具的配置项

> 

#### 1.2 配置相关
- 输入输出：
  - `entry`：用于定义项目入口文件，Webpack 会从这些入口文件开始按图索骥找出所有项目文件；
  - `context`：项目执行上下文路径；
  - `output`：配置产物输出路径、名称等；
- 模块处理：
  - `resolve`：用于配置模块路径解析规则，可用于帮助 Webpack 更精确、高效地找到指定模块
  - `module`：用于配置模块加载规则，例如针对什么类型的资源需要使用哪些 Loader 进行处理
  - `externals`：用于声明外部资源，Webpack 会直接忽略这部分资源，跳过这些资源的解析、打包操作
- 后处理：
  - `optimization`：用于控制如何优化产物包体积，内置 Dead Code Elimination、Scope Hoisting、代码混淆、代码压缩等功能
  - `target`：用于配置编译产物的目标运行环境，支持 web、node、electron 等值，不同值最终产物会有所差异
  - `mode`：编译模式短语，支持 `development`、`production` 等值，可以理解为一种声明环境的短语

#### 1.3 提升研发效率


开发效率类：

- `watch`：用于配置持续监听文件变化，持续构建
- `devtool`：用于配置产物 Sourcemap 生成规则
- `devServer`：用于配置与 HMR 强相关的开发服务器功能

性能优化类：

- `cache`：Webpack 5 之后，该项用于控制如何缓存编译过程信息与编译结果
- `performance`：用于配置当产物大小超过阈值时，如何通知开发者

日志类：

- `stats`：用于精确地控制编译过程的日志内容，在做比较细致的性能调试时非常有用
- `infrastructureLogging`：用于控制日志输出方式，例如可以通过该配置将日志输出到磁盘文件

#### 1.4 实战

新建文件夹webpack-demo

```
npm init 
```

新建

```
├── src
|   └── index.js
└── webpack.config.js
```

声明项目入口

```javascript
// webpack.config.js
module.exports = {
  entry: "./src/index"
};
```

声明产物输出路径

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
  }
};
```

资源配置加载器

```javascript
const path =require('path')
module.exports = {
    entry:'./src/index.js',
    // output 属性告诉 webpack 在哪里输出它所创建的 bundle，
    // 以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，
    // 其他生成文件默认放置在 ./dist 文件夹中。
    output:{
        fileName: "[name].js",
        path:path.join(__dirname,'./dist')
    },
    // 在前端项目中经常需要处理 JS 之外的其它资源，
    // 包括 css、ts、图片等，此时需要为这些资源配置适当的加载器：
    module:{
        rules:[
            {
                test:/\.less$/i,
                include: {
                    and:[path.join(__dirname,'./src/')]
                },
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader:"less-loader"
                    }
                ]
            }
        ]
    }
}
```
## 2.脚手架工具Vue/React

- [Vue CLI](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fguide%2F)：用于帮助用户快速创建、运行 Vue.js 项目脚手架的命令行工具；
- [create-react-app](https://link.juejin.cn/?target=https%3A%2F%2Freactjs.org%2Fdocs%2Fcreate-a-new-react-app.html)：用于创建 React 项目脚手架的命令行工具；
- [webpack-cli](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-cli)：Webpack 官方提供的命令行工具，提供了一套交互式生成配置文件的指令集，以及项目编译、开发、迁移等功能；
- [react-starter-kit](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fkriasoft%2Freact-starter-kit)：用于创建 [React](https://link.juejin.cn/?target=https%3A%2F%2Freactjs.org%2F) + [Relay](https://link.juejin.cn/?target=https%3A%2F%2Frelay.dev%2F) + [GraphQL](https://link.juejin.cn/?target=https%3A%2F%2Fgraphql.org%2F) 应用的脚手架工具，内置 SSR 支持。

### 2.1 [Vue CLI](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fguide%2F) 搭建项目脚手架

安装依赖：

```
npm install -g @vue/cli

# 或者使用 yarn
yarn global add @vue/cli
```

`vue create` 命令创建项目

```
vue create [项目名]
```

选择第三个选项 "Manually select features" 定制各项特性：

![image-20221027103908402](/Users/hejinhai/Library/Application Support/typora-user-images/image-20221027103908402.png)

启动项目

```
npm run serve
# 或者
yarn serve
```

![image-20221027104006932](/Users/hejinhai/Library/Application Support/typora-user-images/image-20221027104006932.png)

Vue CLI可通过 `configureWebpack` 与 `chainWebpack` 配置项修改 Webpack 配置信息。

```javascript
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```

`configureWebpack` 的配置规则与 Webpack 一致，同样支持 `plugins/module/resolve` 等配置项,Vue CLI 内部最终会调用 [webpack-merge](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsurvivejs%2Fwebpack-merge) 将 `configureWebpack` 值与其它上下文配置合并生成 Webpack 配置信息。

`chainWebpack` 的用法与 `configureWebpack` 一致，区别仅在于此处支持 [webpack-chain](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fneutrinojs%2Fwebpack-chain) 语法 —— 即以函数方式链式修改 Webpack 配置：

```javascript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .tap(options => {
          // modify the options...
          return options
        })
  }
}
```

Vue CLI 在 Webpack 基础上包装多一层更易用的功能结构，这确实能极速提升研发效率与体验，但代价则是我们完全不清楚其内部运作细节，这会导致开发者比较难做一些深度定制或者性能优化，此时可使用 `inspect` 命令生成完整的 Webpack 配置信息：

```
vue inspect > output.js
```

执行inspect会生成

![image-20221027104515522](/Users/hejinhai/Library/Application Support/typora-user-images/image-20221027104515522.png)

针对编译环境生成配置

```
vue inspect --mode production > output.prod.js
```

### 使用 [create](https://link.juejin.cn/?target=https%3A%2F%2Freactjs.org%2Fdocs%2Fcreate-a-new-react-app.html) 搭建项目脚手架

安装依赖：

```

npm install -g create-app-react

# 或者使用 yarn
yarn global add create-app-react
```

命令创建项目

```
npx create-react-app my-app
```

运行

```
yarn start
```

可以通过  `npm run eject` 导出完整的项目配置结构

导出配置后，可直接修改 `webpack.config.js`

##  3.使用 Babel

Babel 是一个开源 JavaScript 转编译器，它能将高版本 —— 如 ES6 代码等价转译为向后兼容

在webpack-demo中

1. 安装依赖

   ```
   npm i -D @babel/core @babel/preset-env babel-loader
   ```

2. 添加模块处理规则

   ```
   rules:[
               ++ {
               ++   test: /\.js$/,
               ++    use: ['babel-loader'],
               ++ },
               {
                   test:/\.less$/i,
                   include: {
                       and:[path.join(__dirname,'./src/')]
                   },
                   use:[
                       "style-loader",
                       "css-loader",
                       {
                           loader:"less-loader"
                       }
                   ]
               }
           ]
   ```

   

3. 编译命令

   ```
   npx webpack
   ```

安装 *@babel/preset-env*

```
 npm i -D @babel/preset-env
```

- [`babel-preset-react`](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-preset-react)：包含 React 常用插件的规则集，支持 `preset-flow`、`syntax-jsx`、`transform-react-jsx` 等；
- [`@babel/preset-typescript`](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-typescript)：用于转译 TypeScript 代码的规则集
- [`@babel/preset-flow`](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-flow%2F)：用于转译 [Flow](https://link.juejin.cn/?target=https%3A%2F%2Fflow.org%2Fen%2Fdocs%2Fgetting-started%2F) 代码的规则集

## 4.使用 TypeScript

Webpack 有很多种接入 TypeScript 的方法，包括 `ts-loader`、`awesome-ts-loader`、 `babel-loader`。通常可使用 `ts-loader` 构建 TypeScript 代码：

安装依赖

```
npm i -D typescript ts-loader
```

配置 Webpack

```
   module:{
        rules:[
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
            {
                test:/\.less$/i,
                include: {
                    and:[path.join(__dirname,'./src/')]
                },
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader:"less-loader"
                    }
                ]
            },
           +++ {
           +++     test: /\.ts$/,
           +++    use: 'ts-loader'
           +++   }
        ]
    },
   +++ resolve: {
   +++     extensions: ['.ts', '.js'],
   +++ }
   }
```

创建 tsconfig.json

```
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "moduleResolution": "node"
  }
}
```
## 5.css工程环境(day02)

在 Webpack 中处理 CSS 文件，通常需要用到：

- [`css-loader`](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Floaders%2Fcss-loader%2F)：该 Loader 会将 CSS 等价翻译为形如 `module.exports = "${css}"` 的JavaScript 代码，使得 Webpack 能够如同处理 JS 代码一样解析 CSS 内容与资源依赖；
- [`style-loader`](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Floaders%2Fstyle-loader%2F)：该 Loader 将在产物中注入一系列 runtime 代码，这些代码会将 CSS 内容注入到页面的 `<style>` 标签，使得样式生效；
- [`mini-css-extract-plugin`](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fplugins%2Fmini-css-extract-plugin)：该插件会将 CSS 代码抽离到单独的 `.css` 文件，并将文件通过 `<link>` 标签方式插入到页面中。
- 

- Webpack 不能理解 CSS 代码，所以需要使用 `css-loader`、`style-loader`、`mini-css-extract-plugin` 三种组件处理样式资源；
- Less/Sass/Stylus/PostCSS 等工具可弥补原生 CSS 语言层面的诸多功能缺失，例如数值运算、嵌套、代码复用等。

### 6.Vue-loader 处理 SFC 代码

- `<template>`：用于指定 Vue 组件模板内容，支持类 HTML、Pug 等语法，其内容会被预编译为 JavaScript 渲染函数；
- `<script>`：用于定义组件选项对象，在 Vue2 版本支持导出普通对象或 [defineComponent](https://link.juejin.cn/?target=https%3A%2F%2Fv3.cn.vuejs.org%2Fapi%2Fglobal-api.html%23definecomponent) 值；Vue3 之后还支持 `<script setup>` 方式定义组件的 `setup()` 函数；
- `<style>`：用于定义组件样式，通过配置适当 Loader 可实现 Less、Sass、Stylus 等预处理器语法支持；也可通过添加 `scoped`、`module` 属性将样式封装在当前组件内；
- Custom Block：用于满足领域特定需求而预留的 SFC 扩展模块，例如 `<docs>`；Custom Block 通常需要搭配特定工具使用，详情可参考 [Custom Blocks | Vue Loader](https://link.juejin.cn/?target=https%3A%2F%2Fvue-loader.vuejs.org%2Fguide%2Fcustom-blocks.html%23example) 。

创建webpack-vue

安装依赖

```
yarn add -D webpack webpack-cli vue-loader
```

加入vue-loader
