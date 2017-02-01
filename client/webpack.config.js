var path = require('path')
var webpack = require('webpack')

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
        path: path.join(__dirname, '../public/assets'),
        filename: `${fileName}.js`,
        publicPath: '/assets/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                    }
                    // other vue-loader options go here
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
                loader: ExtractTextPlugin.extract('css!sass')
            },
            // 画像を別ファイルに切り出す
            {
                test: /\.(gif|jpg|png)$/,
                loader: 'file-loader',
                options: {
                    name: `${fileName}.[ext]`
                }
            }
        ]
    },
    plugins: [
        // CSSを切り出す
        new ExtractTextPlugin(`${fileName}.css`),

        // JavaScript/CSS変更時に自動でリロードする
        new webpack.HotModuleReplacementPlugin(),

        // 本番環境のキャッシュ対策としてハッシュ値を生成する
        new ManifestPlugin({
            fileName: 'webpack.manifest.json'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.scss']
    },
    devServer: {
        contentBase: 'public/assets',
        inline: true,
        hot: true,
        historyApiFallback: true,
        noInfo: true
    }
};

//module.exports = {
//  entry: './client/assets/javascript',
//  output: {
//    path: path.resolve(__dirname, './dist'),
//    publicPath: '/dist/',
//    filename: 'build.js'
//  },
//  module: {
//    rules: [
//      {
//        test: /\.vue$/,
//        loader: 'vue-loader',
//        options: {
//          loaders: {
//            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
//            // the "scss" and "sass" values for the lang attribute to the right configs here.
//            // other preprocessors should work out of the box, no loader config like this nessessary.
//            'scss': 'vue-style-loader!css-loader!sass-loader',
//            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
//          }
//          // other vue-loader options go here
//        }
//      },
//      {
//        test: /\.js$/,
//        loader: 'babel-loader',
//        exclude: /node_modules/
//      },
//      {
//        test: /\.(png|jpg|gif|svg)$/,
//        loader: 'file-loader',
//        options: {
//          name: '[name].[ext]?[hash]'
//        }
//      }
//    ]
//  },
//  resolve: {
//    alias: {
//      'vue$': 'vue/dist/vue.common.js'
//    }
//  },
//  devServer: {
//    historyApiFallback: true,
//    noInfo: true
//  },
//  performance: {
//    hints: false
//  },
//  devtool: '#eval-source-map'
//}
//
//if (process.env.NODE_ENV === 'production') {
//  module.exports.devtool = '#source-map'
//  // http://vue-loader.vuejs.org/en/workflow/production.html
//  module.exports.plugins = (module.exports.plugins || []).concat([
//    new webpack.DefinePlugin({
//      'process.env': {
//        NODE_ENV: '"production"'
//      }
//    }),
//    new webpack.optimize.UglifyJsPlugin({
//      sourceMap: true,
//      compress: {
//        warnings: false
//      }
//    }),
//    new webpack.LoaderOptionsPlugin({
//      minimize: true
//    })
//  ])
//}
