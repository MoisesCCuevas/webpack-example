const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // punto de entrada
  entry: './src/index.js',
  // por default es dist
  output: {
    // usa path para garatizar que encontrara la carpeta
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js']
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
        // en lugar de utilizar copy-plugin, enpaquetamos desde module
        // esto permite tambien importar los archivos como si fueran variables
        test: /\.svg$/,
        type: 'asset/resource'
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
    new MiniCssExtractPlugin(),
    // usando copy-plugin para enpaquetar otros recursos, como lo pueden ser imagenes
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assests/images'),
          to: 'assets/images'
        }
      ]
    })
  ]
}
