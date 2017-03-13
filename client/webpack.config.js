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
      FilterByYear: 'src/components/FilterByYear.jsx',
      FilterByFocusArea: 'src/components/FilterByFocusArea.jsx',
      FilterByCity: 'src/components/FilterByCity.jsx',
      FilterByAgency: 'src/components/FilterByAgency.jsx',
      FilterByInvested: 'src/components/FilterByInvested.jsx',
      FilterByPopulation: 'src/components/FilterByPopulation.jsx',
      FilterByElement: 'src/components/FilterByElement.jsx',
      FilterByEngagement: 'src/components/FilterByEngagement.jsx',
      ChartDollarsCity: 'src/components/ChartDollarsCity.jsx',
      ChartMoneyInvested: 'src/components/ChartMoneyInvested.jsx',
      TableExample: 'src/components/TableExample.jsx',
      TableAdmin: 'src/components/TableAdmin.jsx',
      d3map: 'src/components/d3map.jsx',
      'chartjs': require.resolve('chart.js')
    },
    extensions: ['', '.js', '.jsx',]
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_component)/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        include: /fixed-data-table/,
        exclude: /foundation-sites/,
      }
    ]
  },
  node: {
    fs:'empty'
  }
};
