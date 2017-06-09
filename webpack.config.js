const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const OpenBrowerPlugin = require('open-browser-webpack-plugin');

const port = 8088;
const host = `http://localhost:${port}/`;

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/bundle.js',
        publicPath: host
    },

    module: {
        rules: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, "src")],
            enforce: "post",
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["es2015"],
                    plugins: ["transform-object-rest-spread"]
                }
            }]
        }, 
        {
            test: /\.css$/,
            // use: ["style-loader", { loader: 'css-loader', options: { importLoaders: 1 } }, "postcss-loader"]
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function() {
                        return [
                            require('postcss-import'),
                            require('postcss-url'),
                            require('postcss-mixins'),
                            require('postcss-nested'),
                            require('postcss-css-variables'),
                            require('autoprefixer')
                        ]
                    }
                }
            }]
        }, 
        {
            test: /\.(?:png|jpg|gif|svg)$/,
            loader: 'url-loader?limit=8192&name=image/[hash].[ext]' //小于8k,内嵌;大于8k生成文件
        }]
    },

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src")
        ],
        extensions: [".js", ".json", ".css"]
    },

    devtool: "eval-source-map",

    context: __dirname,

    devServer: {
        contentBase: [path.join(__dirname, "dist")],
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        port: port
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: true,
            comments: false
        }),
        //指定生成页面插件，元素用js生成
        new HtmlwebpackPlugin({
            template: 'src/default_index.ejs',
            filename: 'index.html',
            title: 'mark-demo',
            //自己加个图标
            // favicon: path.resolve(__dirname, "src/asserts/image/favicon.ico")
        }),
        new OpenBrowerPlugin({
            url: host
        })
    ]
};