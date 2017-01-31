var webpack = require('webpack');

module.exports = {
  entry: [
  'script!jquery/dist/jquery.min.js',
  'script!foundation-sites/dist/foundation.min.js',
  './src/app.jsx'
],
externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      //rename React componenets here for cleaner imports
      Nav: 'src/components/Nav.jsx',
      Main: 'src/scenes/Main.jsx',
      Login: 'src/scenes/Login.jsx',
      Account: 'src/scenes/Account.jsx',
      Import: 'src/scenes/Import.jsx',
      Dashboard: 'src/scenes/Dashboard.jsx',
      FilterByYear: 'src/components/FilterByYear.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};
