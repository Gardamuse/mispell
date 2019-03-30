const path = require('path');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bimbo-misspell.js',
      library: 'bimboMisspell',
      libraryTarget: 'var'
   },
   mode: 'development',
   module: {
   }
};
