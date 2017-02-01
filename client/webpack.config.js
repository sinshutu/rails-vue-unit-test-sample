const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//var ManifestPlugin = require('extract-text-webpack-plugin')

const env = process.env.NODE_ENV || 'development';
const fileName = (env == 'development') ? '[name]' : '[name]-[hash]';

module.exports = {
    // 起点となるディレクトリ
    context: path.join(__dirname, './assets'),

    // ビルド対象となるファイル
    entry: {
        application: './javascripts/main.js'
    },

    // ビルド先のファイル
    output: {
        path: path.join(__dirname, '../public/assets/'),
        filename: `${fileName}.js`,
        publicPath: '/assets/',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    plugins: [
        // CSSを切り出す
        new ExtractTextPlugin({
            filename: `${fileName}.css`,
            allChunks: true,
        }),

        // JavaScript/CSS変更時に自動でリロードする
        new webpack.HotModuleReplacementPlugin()

        // 本番環境のキャッシュ対策としてハッシュ値を生成する
        //new ManifestPlugin({
        //    fileName: 'webpack.manifest.json'
        //})
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                    }
                }
            },
            // JavaScriptをBabelでトランスパイルする
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // SCSS/CSSを別ファイルに切り出す
            {
                test: /\.s?css$/,
                loader: 'css-loader!sass-loader'
            },
            // 画像を別ファイルに切り出す
            {
                test: /\.(png|jpg|gif|svg|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: `${fileName}.[ext]`
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.scss']
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        inline: true,
        hot: true,
        noInfo: false
    }
};
