const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./app.ts', './style.scss'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/build.min.js',
  },
  devServer: {
    port: '4200',
    compress: true,
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js', ',scss', '.css', 'html'],
    alias: {
      '@decorators': path.resolve(__dirname, 'src/decorators'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@environment': path.resolve(__dirname, 'src/environment'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s[c,a]ss$/i,
        exclude: [/node_modules/, /^style\.scss$/],
        use: [
          { loader: 'sass-to-string' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
          { loader: 'css-modules-typescript-loader' },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /style\.scss/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: 'index.html',
    }),
    new CleanPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};
