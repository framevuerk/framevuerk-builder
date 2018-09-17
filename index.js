#!/usr/bin/env node

const argv = require('./lib/argv.js')


if (argv.is('build') || argv.cmd() === 'framevuerk-builder') {
  const configs = require('./webpack-config.js')
  const webpack = require('webpack')

  const compiler = webpack(configs)
  if (!argv.is('--watch') && !argv.is('-w')) {
    compiler.run(() => {})
  } else {
    compiler.watch({
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }, () => {})
  }
}