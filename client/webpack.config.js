module.exports = {
  entry: './src/app.jsx',
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
      Account: 'src/scenes/Account.jsx'

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
