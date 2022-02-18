const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: `./public/src/main.js`,
  target: "web",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // 処理対象ファイル
        test: /\.js$/,
  
        // 処理対象から外すファイル
        exclude: /node_modules/,
        use: [
          {
            // 利用するローダー
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', {
                    modules: false
                  }
                ]
              ]
            }
          },
        ]
      },
      {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name:'./resource/[name].[ext]'
              }
            },
          ],
        type: 'javascript/auto'
      },
    ]
  },
  resolve:{
    alias: {
      '~': path.resolve(__dirname,'public')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      inject: "body",
      scriptLoading: 'blocking',
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: 'dist',
    open: true,
  }
};