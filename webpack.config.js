const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin')

const environment = process.env.NODE_ENV || 'development'

module.exports = {
  mode: environment,
  entry: {
    app: ['./src/index.tsx', 'webpack-hot-middleware/client'],
    // vendor: ['react', 'react-dom'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  devServer: {
    contentBase: __dirname,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: path.resolve(__dirname, 'functions'),
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          path.resolve(__dirname, 'functions'),
          path.resolve(__dirname, 'node_modules', 'material-ui-next-pickers'),
        ],
      },
      {
        test: /\.(jpg|png|svg|mp4)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.ejs'),
      title: 'Dash',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: environment, // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new webpack.DefinePlugin({
      MACRO: JSON.stringify(0),
      DASH_API:
        environment === 'development'
          ? JSON.stringify('http://localhost:3000')
          : JSON.stringify('http://dash-api-19.herokuapp.com'),
      GMAPS_API_KEY: JSON.stringify('AIzaSyAyPK-B3XZE4f6XPqyShiWGqspxgXBQjOg')
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'node_modules', 'react', 'umd', 'react.development.js'),
        to: path.resolve(__dirname, 'dist', 'react.development.js'),
      },
      {
        from: path.resolve(__dirname, 'node_modules', 'react-dom', 'umd', 'react-dom.development.js'),
        to: path.resolve(__dirname, 'dist', 'react-dom.development.js'),
      },
    ]),
  ],
}
