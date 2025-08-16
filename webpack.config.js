
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
      '@react-navigation/elements/lib/module/useFrameSize': path.resolve(__dirname, 'src/components/useFrameSize.web.js'),
      '@react-navigation/elements/useFrameSize': path.resolve(__dirname, 'src/components/useFrameSize.web.js'),
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

  // Patch require calls in useFrameSize.ts/tsx zodat ze niet crashen in de browser
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  config.module.rules.push({
    test: /useFrameSize\.(ts|tsx)$/,
    loader: 'string-replace-loader',
    options: {
    search: 'require\\(',
    replace: '(() => { throw new Error("require is not available in the browser"); })(',
    flags: 'g'
    }
  });

  // Patch require() calls in all node_modules JS files for browser safety
  config.module.rules.push({
    test: /node_modules\/.*\.js$/,
    loader: 'string-replace-loader',
    options: {
    search: 'require\\(',
    replace: '(() => { throw new Error("require is not available in the browser"); })(',
    flags: 'g'
    }
  });

  // Ignore native implementation for web

  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /useFrameSize\.native\.ts$/
    })
  );
  config.plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /useFrameSize\.ts$/
    })
  );

  // Add a global require polyfill to all output bundles
  config.plugins.push(
    new webpack.BannerPlugin({
      banner: `if (typeof window !== 'undefined' && typeof window.require === 'undefined') { window.require = function() { throw new Error('require is not available in the browser'); }; }`,
      raw: true,
      entryOnly: true
    })
  );

  // Prevent require from being bundled in the final output
  config.externals = {
    ...config.externals,
    require: 'undefined'
  };

  return config;
};
