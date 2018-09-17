#!/usr/bin/env node
const path = require('path')
const utils = require('./build/utils.js')
const argv = require('./lib/argv.js')

  process.env.NODE_ENV = process.env.NODE_ENV || 'production'
  const configPath = argv.get('--config') || argv.get('-c')
  const framevuerkDir = path.resolve(process.cwd(), argv.get('--dir') || argv.get('-d') || './node_modules/framevuerk')
  const framevuerkPkg = require(path.resolve(framevuerkDir, './package.json'))

  const defaultConfig = {
    'locale': 'en',
    'direction': 'ltr',
    'primary-color': '#41b883',
    'secondary-color': '#35485d',
    'danger-color': '#dd4b39',
    'warning-color': '#ef8f00',
    'info-color': '#14b0cf',
    'bg-color': '#fff',
    'header-bg-color': '#35485d',
    'sidebar-bg-color': '#3a3a3a',
    'footer-bg-color': '#3a3a3a',
    'padding': '15px',
    'transition-speed': '0.35s',
    'border-radius': '2px',
    'shadow-size': '1px'
  }
  let configs = [defaultConfig]
  if (configPath) {
    const configContent = require(path.resolve(process.cwd(), configPath))
    const parsedConfigContent = Array.isArray(configContent) ? configContent : [configContent]
    configs = parsedConfigContent.map(config => Object.assign(defaultConfig, config))
  }

  const webpackConfigs = []
  configs.forEach(config => {
    const cnf = Object.assign(config, {
      name: framevuerkPkg.name,
      version: framevuerkPkg.version,
      rootDir: path.resolve(framevuerkDir),
      entry: path.resolve(framevuerkDir, './src/index.js'),
      path: path.resolve(framevuerkDir, './dist')
    })
    webpackConfigs.push(utils.generateConfig(Object.assign(cnf, {
      minify: false
    })))
    webpackConfigs.push(utils.generateConfig(Object.assign(cnf, {
      minify: true
    })))
  })

  module.exports = webpackConfigs