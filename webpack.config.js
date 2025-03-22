// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';


const config = {
    devtool: isProduction ? false : 'eval-source-map',
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        watchFiles: ['./src/templates/*.html'],
        static: {
            directory: path.join(__dirname, './dist'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/templates/index.html',
            chunks: ['index'],
        }),
        new MiniCssExtractPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' } ],
                            ['@babel/preset-react', { runtime: 'automatic'}],
                        ]
                    }
                }

            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    stylesHandler,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require("sass"),
                        }
                    }
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]',
                }
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
