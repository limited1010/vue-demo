// webpack.config.js
const path = require('path');

// 导入插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
先将图片保存到src/img目录，并在app.vue加载;
当遇到.gif等文件时,url-loader将图片编译到dist目录下;如果这个文件小于1kb就以base64加载;
,不会生成一个文件;
 */
var config = module.exports = {
    entry: './src/js/entry.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        use: 'css-loader',
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }, {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            })
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=1024'
/*            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[hash:8]-[name].[ext]'
                }
            }]*/
        }]
    },
    plugins: [
        // 重命名提取后的css
        new ExtractTextPlugin({
            filename:'[name].css',
            allChunks:true
        })
    ],
    devtool: 'cheap-module-eval-source-map',  // 加上对应的配置
};

module.exports = config;
