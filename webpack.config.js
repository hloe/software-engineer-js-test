const path = require('path');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const root = path.resolve(__dirname, '.');
const { buildAliases } = require('./aliases');
const alias = buildAliases(root);

module.exports = {
  entry: path.resolve(root, 'app', 'index.tsx'),
  output: {
    filename: '[name].[fullhash].bundle.js',
    path: path.resolve(root, 'dist'),
    publicPath: '/',
    clean: true
  },
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TSConfigPathsPlugin({
        configFile: './tsconfig.json'
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        type: 'asset/inline'
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'app', 'index.html'),
      filename: './index.html'
    })
  ],
  mode: 'development',
  devServer: {
    hot: true,
    watchFiles: {
      paths: ['./app/**/*'],
      options: {
        ignored: [/\.test.tsx?$/]
      }
    },
    static: {
      directory: path.resolve(root, 'dist')
    },
    client: {
      progress: true
    },
    port: 3000,
    open: true,
    historyApiFallback: true
  }
};