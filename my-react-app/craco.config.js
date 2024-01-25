const CracoAliasPlugin = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  webpack: {
    alias: {},
    plugins: [],
    configure: {
      resolve: {
        fallback: {
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          querystring: require.resolve('querystring-es3'),
          url: require.resolve('url/'),
        },
      },
    },
  },
};