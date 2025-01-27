const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const { GenerateSW } = require('workbox-webpack-plugin'); // Import Workbox plugin

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Output bundle name
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html', // Template HTML
            filename: 'index.html', // Output HTML file
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.MEANINGCLOUD_API_KEY': JSON.stringify(process.env.MEANINGCLOUD_API_KEY),
        }),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            // Additional Workbox options can be set here if needed
        }),
    ],
};
