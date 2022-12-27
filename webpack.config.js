const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    "mode": "none",
    "entry": "./src/script.ts",
    "output": {
        "path": path.join(__dirname, '/dist'),
        "filename": "bundle.js"
    },
    devServer: {
        static: path.join(__dirname, 'dist')
    },
    experiments: {
        topLevelAwait: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env",]
                }
            }
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },

        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }
}
