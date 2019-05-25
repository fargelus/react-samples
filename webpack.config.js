const path = require('path');

// Plugins
const HTMLWebpackPlugin = require('html-webpack-plugin');

function makeAbsolutePath(filepath) {
  return path.resolve(__dirname, filepath);
}

module.exports = {
  mode: 'development',

  entry: {
    'hello-react': makeAbsolutePath('src/hello-react-world/hello-react.ts'),
    counter: makeAbsolutePath('src/counter/main.tsx'),
    timer: makeAbsolutePath('src/timer/render.tsx'),
  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3000,
    watchContentBase: true,
    writeToDisk: true,
  },

  output: {
    filename: '[name]/[name].js',
    publicPath: makeAbsolutePath('build'),
    path: makeAbsolutePath('build'),
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true
        },
      },
    },
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'Hello React World',
      template: 'src/index.ejs',
      filename: 'hello-react/index.html',
      chunks: ['hello-react'],
    }),
    new HTMLWebpackPlugin({
      title: 'Counter Button',
      template: 'src/index.ejs',
      filename: 'counter/index.html',
      chunks: ['counter'],
    }),
    new HTMLWebpackPlugin({
      title: 'Timer',
      template: 'src/index.ejs',
      filename: 'timer/index.html',
      chunks: ['timer'],
    }),
  ],
};
