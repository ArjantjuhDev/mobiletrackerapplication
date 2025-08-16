
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
      '@react-navigation/elements/src/useFrameSize': path.resolve(__dirname, 'src/components/useFrameSize.web.js'),
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

  // Patch require calls in useFrameSize.tsx zodat ze niet crashen in de browser
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  config.module.rules.push({
    test: /useFrameSize\.tsx$/,
    loader: 'string-replace-loader',
    options: {
      search: 'require(',
      replace: '(() => { throw new Error("require is not available in the browser"); })(',
      flags: 'g'
    }
  });

  return config;
};
