var path = require("path");
module.exports = {
    entry: "./ts/script.ts",
    resolve: {
        extensions: [".ts",".js",],
    },
    output: {
        path: path.resolve(__dirname,"/static/"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    }
};