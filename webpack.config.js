const path = require('path');

module.exports = {
    "mode": "none",
    "entry": "./src/script.js",
    "output": {
        "path": path.join(__dirname, '/dist'),
        "filename": "bundle.js"
    },
    devServer: {
        static: path.join(__dirname, 'dist')
    },
    "module": {
        "rules": [{
            "test": /\.css$/,
            "use": ["style-loader",
                "css-loader"
            ]
        },]
    }
}
