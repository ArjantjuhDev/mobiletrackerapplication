
const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Voeg Node.js fallbacks toe voor web
  config.resolve = {
    ...(config.resolve || {}),
    alias: {
      'react-native-screens': 'react-native-screens/lib/module/index.js',
      'react-native-safe-area-context': path.resolve(__dirname, 'src/components/SafeAreaProvider.web.js'),
      // Catch-all for any useFrameSize import variant
      // Add aliases for possible relative imports
  // Removed legacy React Navigation useFrameSize alias. Use Expo Router and direct imports only.
      // Add more aliases if needed for other import paths
    },
    fallback: {
      fs: false,
      path: false,
      os: false,
      crypto: false,
      stream: false,
      util: false,
      assert: false,
      http: false,
      https: false,
      url: false,
      buffer: false,
      zlib: false,
      process: false,
    }
  };


  // Ignore native implementation for web

  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /useFrameSize/,
    })
  );



  return config;
};
