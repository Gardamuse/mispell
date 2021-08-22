const path = require('path');

const serverConfig = {
   entry: './src/main.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'mispell.node.js',
      library: {
         name: 'mispell',
         type: 'commonjs2',
      },
   },
   performance: {
      maxEntrypointSize: 500000,
      maxAssetSize: 500000
   },
   mode: 'development',
   devtool: 'cheap-source-map',
   module: {
   }
};

const clientConfig = {
   entry: './src/main.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'mispell.js',
      library: {
         name: 'mispell',
         type: 'var',
      },
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
