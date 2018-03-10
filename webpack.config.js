var debug = process.env.NODE_ENV !== "production";
if (!debug) console.log("production mode enabled.");
var webpack = require("webpack");
var path = require("path");

defaultConfig = {
    devtool: debug ? "inline-sourcemap" : false,
}
module.exports = {
    context: path.join(__dirname, "app/react/"),
    target: "web",
    entry: ["./main.js"],
    output: {
        filename: "react.js",
        path: path.join(__dirname, "app/assets/")
    },
    module: {
        rules: [
            {
                test: /\.(js|es6)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"]
                }
            },
        ]
    },
    plugins: debug ? [] : [
        new UglifyJsPlugin()
    ]
};
