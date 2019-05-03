const path = require('path');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function makeAbsolutePath(filepath) {
  return path.resolve(__dirname, filepath);
}

module.exports = {
  mode: 'development',

  entry: {
    'hello-react': makeAbsolutePath('hello-react-world/ts/hello-react.ts'),
  },

  devServer: {
    port: 3000,
  },

  output: {
    filename: '[name].js',
    publicPath: makeAbsolutePath('build'),
    path: makeAbsolutePath('build'),
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: makeAbsolutePath('node_modules'),
      }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './hello-react-world/index.html',
      }
    ])
  ],
};
