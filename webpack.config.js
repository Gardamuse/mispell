const path = require('path');

const serverConfig = {
   entry: './src/main.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'mispell.node.js',
      library: 'mispell',
      libraryTarget: 'commonjs2'
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
   mode: 'development',
   module: {
   }
};

module.exports = [serverConfig, clientConfig]
