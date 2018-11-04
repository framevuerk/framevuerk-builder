const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackBar = require('webpackbar')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const lib = {}
console.log(path.resolve(__dirname, '../node_modules'))
lib.styleLoader = function (cnf) {
  const ret = []
  ret.push({
    loader: 'css-loader'
  })

  let sassLoaderData = ''
  Object.keys(cnf).forEach(key => {
    if (typeof cnf[key] === 'string' && cnf[key].indexOf('/') === -1 && cnf[key].indexOf('\\') === -1) {
      sassLoaderData += `$${key}:${cnf[key]};`
    }
  })
  sassLoaderData = sassLoaderData.split(' ').join('')
  ret.push({
    loader: 'sass-loader',
    options: {
      data: sassLoaderData
    }
  })

  return ret
}

lib.jsLoader = function () {
  return {
    loader: 'babel-loader',
    options: {
      presets: [require('babel-preset-env')]
    }
  }
}

lib.generateConfig = (cnf) => {
  const fileName = `${cnf.name}${cnf['config-name'] ? `-${cnf['config-name']}` : ''}`
  let plugins = [
    new VueLoaderPlugin(),
    new ExtractTextPlugin({
      filename:  '[name].css'
    }),
    new webpack.DefinePlugin({
      'PKG_NAME': '"' + cnf.name + '"',
      'PKG_VERSION': '"' + cnf.version + '"',
      'process.env': {
        NODE_ENV: '"' + process.env.NODE_ENV + '"',
        name: `"${cnf.name}"`,
        version: `"${cnf.version}"`,
        direction: `"${cnf.direction}"`,
        primaryColor: `"${cnf['primary-color']}"`,
        padding: `"${cnf.padding}"`
      }
    }),
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      uglifyOptions: {

      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g
    }),
    new WebpackBar({
      name: fileName,
      compiledIn: false,
      color: cnf['primary-color']
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: cnf.watch
    })
  ]


  const entry = {}
  entry[fileName] = cnf.entry
  entry[fileName + '.min'] = cnf.entry
  const ret = {
	resolveLoader: {
		modules: [(path.resolve(__dirname, '../node_modules'))],
	},
    entry: entry,
    output: {
      path: cnf.path,
      filename: '[name].js',
      library: cnf.name.charAt(0).toUpperCase() + cnf.name.substr(1).toLowerCase(),
      libraryTarget: 'umd',
      libraryExport: 'default'
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          use: lib.jsLoader(),
          exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          )
        },
        {
          test: /\.(scss|css)$/,
          use: ExtractTextPlugin.extract(lib.styleLoader(cnf))
        },
        {
          test: /\.(svg)/,
          use: 'raw-loader'
        },
        {
          test: /\.pug$/,
          loader: 'pug-html-loader'
        }
      ]
    },
    plugins: plugins
  }

  return ret
}

module.exports = lib
