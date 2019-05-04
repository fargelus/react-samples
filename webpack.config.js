const path = require('path');

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');

function makeAbsolutePath(filepath) {
  return path.resolve(__dirname, filepath);
}

module.exports = {
  mode: 'development',

  entry: {
    'hello-react': makeAbsolutePath('src/hello-react-world/ts/hello-react.ts'),
  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
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
    new CopyWebpackPlugin([
      {
        from: 'src/hello-react-world/index.html',
      }
    ])
  ],
};
