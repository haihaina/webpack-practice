const path = require('path')
module.exports = {
    entry: './src/index',
    // output 属性告诉 webpack 在哪里输出它所创建的 bundle，
    // 以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，
    // 其他生成文件默认放置在 ./dist 文件夹中。
    output: {
        fileName: "[name].js",
        path: path.join(__dirname, './dist')
    },
    // 在前端项目中经常需要处理 JS 之外的其它资源，
    // 包括 css、ts、图片等，此时需要为这些资源配置适当的加载器：
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
            {
                test: /\.less$/i,
                include: {
                    and: [path.join(__dirname, './src/')]
                },
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    // 添加 eslint-webpack-plugin 插件实例
    plugins: [new ESLintPlugin()],
    resolve: {
        extensions: ['.ts', '.js'],
    }
}