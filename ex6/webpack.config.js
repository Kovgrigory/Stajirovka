var path = require("path");
module.exports = {
    entry: "./ts/script.ts",
    resolve: {
        extensions: [".ts"],
    },
    output: {
        path: path.resolve(__dirname,"./bundle/"),
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