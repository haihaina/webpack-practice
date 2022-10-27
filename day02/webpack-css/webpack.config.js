const path = require("path");
module.exports = {
    module: {
        entry: "./src/index",
        output: {
            filename: "[name].js",
            path: path.join(__dirname, "./dist"),
          },
        rules: [
            {
                test: /\.css$/i,
                use: ["css-loader"],
            },
        ],
        // mode: 'development', // 设置mode
    },
};
