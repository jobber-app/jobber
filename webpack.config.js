var debug = process.env.NODE_ENV !== "production";
if (!debug) console.log("production mode enabled.");
var webpack = require("webpack");
var path = require("path");

react = {
    devtool: debug ? "inline-sourcemap" : false,
    context: path.join(__dirname, "app/webpack/react/"),
    target: "web",
    entry: ["./main.js"],
    output: {
        filename: "react.js",
        path: path.join(__dirname, "app/assets/javascripts/")
    },
    module: {
        rules: [
            {
                test: /\.(js|es6)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    plugins: ["react-html-attrs", "transform-decorators-legacy"]
                }
            },
        ]
    },
    plugins: debug ? [] : [
        new UglifyJsPlugin()
    ]
};

survey = {
    devtool: debug ? "inline-sourcemap" : false,
    context: path.join(__dirname, "app/webpack/survey/"),
    target: "web",
    entry: ["./main.js"],
    output: {
        filename: "survey.js",
        path: path.join(__dirname, "app/assets/javascripts/")
    },
    module: {
        rules: [
            {
                test: /\.(js|es6)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "stage-0"],
                    plugins: ["transform-decorators-legacy"]
                }
            },
        ]
    },
    plugins: debug ? [] : [
        new UglifyJsPlugin()
    ]
};

module.exports = [react, survey];
