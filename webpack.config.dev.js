const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // punto de entrada
  entry: './src/index.js',
  // por default es dist
  output: {
    // usa path para garantizar que encontrara la carpeta
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'development',
  watch: true,
  resolve: {
    extensions: ['.js'],
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles/')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        // lee tanto archivos css como el compilar de stylus en este caso
        test: /\.css|.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        // en lugar de utilizar copy-plugin, empaquetamos desde module
        // esto permite también importar los archivos como si fueran variables en base 64
        test: /\.svg|.png$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: '[name].[contenthash].[ext]',
            outputPath: './assets/fonts/',
            publicPath: '../assets/fonts/',
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      // ruta del html
      template: './public/index.html',
      // archivo html final
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    // usando copy-plugin para empaquetar otros recursos, como lo pueden ser imágenes
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assests/images'),
          to: 'assets/images'
        }
      ]
    }),
    new Dotenv()
  ],
  devServer: {
    contewntBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3006
  }
}
