const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      'react-native-url-polyfill': path.resolve(
        __dirname,
        'node_modules/react-native-url-polyfill',
      ),
    },
  },
};
