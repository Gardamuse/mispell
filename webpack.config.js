const path = require('path');

const serverConfig = {
   entry: './src/main.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'mispell.node.js',
      library: 'mispell',
      libraryTarget: 'commonjs2'
   },
   performance: {
      maxEntrypointSize: 350000,
      maxAssetSize: 350000
   },
   mode: 'development',
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
      maxEntrypointSize: 350000,
      maxAssetSize: 350000
   },
   mode: 'production',
   module: {
   }
};

module.exports = [serverConfig, clientConfig]
