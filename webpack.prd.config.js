// webpack.prd.config.js

/*
    下面安装的webpack-merge模块就是用来合并两个webpack的配置文件,prod的配置是在
webpack.config.js基础上拓展,静态资源大部分都有缓存,更新上线后一般都希望用户及时看到
内容,所以给打包后的css和js文件的名称都加了20位的hash值,只要不对htm设置缓存，上线后
就可以立即加载最新内容;
    html-webpack-plugin用来生成html文件,它通过template选项来读取指定的模板,index.ejs,
然后输出到filename指定的目录,也就是demo/index_prod.html。模板index.ejs动态设置
静态资源的路径和文件名;
    ejs是一个js模板库,用来从json数据中生成html字符串,常用于nodejs;
 */

var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config');

// 清空基本配置的插件列表

webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
    output: {
        // ./dist/这样才能找到文件;
        publicPath: './dist/',
        // 将入口文件重命名为带有20位hash值的唯一文件;
        filename: '[name].[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            // 提取css,重命名为带有20位hash值的唯一文件;
            filename: '[name].[hash].css',
            allChunks: true
        }),
        // 定义当前node为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // warning: false
            }
        }),
        // 提取模板并保存入口html文件;
        new HtmlwebpackPlugin({
            filename: '../index_prod.html',
            template: './index.ejs',
            inject: false
        })
    ]
});

