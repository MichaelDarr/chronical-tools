/* eslint-disable */
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        bundle: [
            path.resolve(__dirname, 'src/index.tsx')
        ],
    },
    context: __dirname,
    devServer: {
        compress: true,
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        overlay: {
            errors: true,
            warnings: false,
        },
        port: 8080,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            prependData: '@use "variables.scss" as *;\n',
                            sassOptions: {
                                includePaths: [
                                    path.resolve(__dirname, 'src'),
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            }
        ],
    },
    resolve: {
        extensions: [
            '.js',
            '.tsx',
            '.ts',
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: path.resolve(__dirname, 'public'),
    },
    target: 'web',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/robots.txt'),
                    to: path.resolve(__dirname, 'dist/robots.txt'),
                }
            ],
        }),
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, 'public/favicon.png'),
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ],
};
