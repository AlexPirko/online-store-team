const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const esLintPlugin = (isDev) => isDev ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] }) ];


const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 8080,
        static: path.join(__dirname, './'),
    },
};
  
module.exports = ({ development }) => ({
    mode: development ? 'development' : 'production',
    devtool: development ? 'inline-source-map' : false,
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
    rules: [
        {
            test: /\.[tj]s$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
    ],
},
    plugins: [
        ...esLintPlugin(development),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new CopyPlugin({
            patterns: [
                { from: 'public' },
            ],
        }),   
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    ...devServer(development)
});