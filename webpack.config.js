const path = require('path');
const webpack = require('webpack');
const projectPath = './'; // path.resolve('..', __dirname.replace('Frontend', 'Website'));
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/app.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            path: projectPath
            // root: projectPath
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // Specify the common bundle's name.
        }),
        new ExtractTextPlugin("css/styles.css", {
            allChunks: true
        })
    ],
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.resolve(projectPath, 'dist'),
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './postcss.config.js'
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=/images/',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=/fonts/',
            }
        ]
    }
};