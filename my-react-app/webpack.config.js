const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "crypto": require.resolve('crypto-browserify'),
      "querystring": require.resolve('querystring'),
      "path": require.resolve("path-browserify"),
    },
  },
};

/*const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "crypto": require.resolve('crypto-browserify'),
      "querystring": require.resolve('querystring'),
      "path": require.resolve("path-browserify"),
    },
  },
};
*/

