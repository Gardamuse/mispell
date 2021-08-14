const path = require('path');

const serverConfig = {
   entry: './src/main.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'mispell.node.js',
      library: 'mispell',
      libraryTarget: 'umd'
   },
   performance: {
      maxEntrypointSize: 500000,
      maxAssetSize: 500000
   },
   mode: 'production',
   module: {
   }
};

const clientConfig = {
   entry: './src/main.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'mispell.js',
      library: 'mispell',
      libraryTarget: 'var'
   },
   performance: {
      maxEntrypointSize: 500000,
      maxAssetSize: 500000
   },
   mode: 'production',
   module: {
   }
};

module.exports = [serverConfig, clientConfig]
