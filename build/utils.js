const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const lib = {}

lib.styleLoader = function (cnf) {
  const ret = []
  ret.push({
    loader: 'css-loader'
  })
  ret.push({
    loader: 'postcss-loader',
    options: {
      config: {
        path: path.resolve(__dirname, '../.postcssrc.js')
      }
    }
  })

  let sassLoaderData = ''
  Object.keys(cnf).forEach(key => {
    if (typeof cnf[key] === 'string' && cnf[key].indexOf('/') === -1 && cnf[key].indexOf('\\') === -1) {
      sassLoaderData += `$${key}: ${cnf[key]};`
    }
  })
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
      presets: ['env']
    }
  }
}

lib.generateConfig = (cnf) => {
  const fileName = `${cnf.name}${cnf['config-name'] ? `-${cnf['config-name']}` : ''}${cnf.minify ? '.min' : ''}`
  let plugins = [
    new ExtractTextPlugin({
      filename: fileName + '.css'
    }),
    new webpack.DefinePlugin({
      'PKG_NAME': '"' + cnf.name + '"',
      'PKG_VERSION': '"' + cnf.version + '"',
      'process.env': {
        NODE_ENV: '"' + process.env.NODE_ENV + '"',
        name: `"${cnf.name}"`,
        version: `"${cnf.version}"`,
        locale: `"${cnf.locale}"`,
        direction: `"${cnf.direction}"`,
        primaryColor: `"${cnf['primary-color']}"`,
        padding: `"${cnf.padding}"`
      }
    }),
    new WebpackBar(),
    new FriendlyErrorsWebpackPlugin()
  ]
  if (cnf.minify) {
    plugins.push(new UglifyJsPlugin())
    plugins.push(new OptimizeCssAssetsPlugin())
  }
  if (cnf.plugins) {
    plugins = plugins.concat(cnf.plugins)
  }

  const ret = {
    entry: cnf.entry,
    output: {
      path: cnf.path,
      filename: fileName + '.js',
      library: cnf.name.charAt(0).toUpperCase() + cnf.name.substr(1).toLowerCase(), // todo uppercase first letter
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              js: lib.jsLoader(),
              scss: ExtractTextPlugin.extract(lib.styleLoader(cnf)),
              autoprefixer: true
            }
          }
        },
        {
          test: /\.js$/,
          use: lib.jsLoader(),
          exclude: cnf.name.indexOf('docs') > -1 ? /node_modules/ : /galina_blanka_xx/
        },
        {
          test: /\.(scss|css)$/,
          use: ExtractTextPlugin.extract(lib.styleLoader(cnf))
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|ico|zhtml)/,
          loader: 'file-loader?name=./[name].[ext]'
        },
        {
          test: /\.(svg)/,
          loader: 'raw-loader'
        },
        {
          test: /\.none$/,
          loader: 'file-loader?name=./[name]'
        }
      ]
    },
    plugins: plugins
  }

  if (cnf.locale) {
    ret.resolve = {
      alias: {
        locale: path.resolve(cnf.rootDir, `locale/${cnf.locale}.js`)
      }
    }
  }
  return ret
}

module.exports = lib
