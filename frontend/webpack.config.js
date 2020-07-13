/* eslint-disable */
const exec = require('child_process').exec;
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin')
const webpack = require('webpack');

const distPath = path.resolve(__dirname, 'dist');
const publicPath = path.resolve(__dirname, 'public');
const srcPath = path.resolve(__dirname, 'src');
const goPath = path.resolve(srcPath, 'go');
const wasmGlueJSFilepath = '/usr/local/go/misc/wasm/wasm_exec.js';

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        bundle: [
            path.resolve(srcPath, 'index.tsx')
        ],
    },
    context: __dirname,
    devServer: {
        compress: true,
        contentBase: distPath,
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
                                    srcPath,
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
        path: distPath,
        publicPath: '/',
    },
    target: 'web',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: publicPath,
                    to: distPath,
                }, {
                    from: wasmGlueJSFilepath,
                    to: distPath,
                }
            ],
        }),
        new ExtraWatchWebpackPlugin({
            files: [
                path.resolve(goPath, '**/*.go'),
            ],
        }),
        {
            apply: (compiler) => {
                compiler.hooks.done.tap('compileWASM', (compilation) => {
                    exec(
                        `GOOS=js GOARCH=wasm go build -o ${path.resolve(distPath, 'main.wasm')}`,
                        { cwd: goPath },
                        (err, stdout, stderr) => {
                            if (stdout) process.stdout.write(stdout);
                            if (stderr) process.stderr.write(stderr);
                        }
                    );
                });
            }
        },
    ],
};
