#!/usr/bin/env node
const path = require('path')
const utils = require('./lib/utils.js')
const argv = require('./lib/argv.js')

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
const configPath = argv.get('--config') || argv.get('-c')
const framevuerkDir = path.resolve(process.cwd(), argv.get('--dir') || argv.get('-d') || './node_modules/framevuerk')
const userOutputDir = argv.get('--output-dir') || argv.get('-o')
const outputDir = userOutputDir ? path.resolve(process.cwd(), userOutputDir) : path.resolve(framevuerkDir, './dist')
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
  webpackConfigs.push(utils.generateConfig(Object.assign(config, {
    name: framevuerkPkg.name,
    version: framevuerkPkg.version,
    framevuerkDir,
    entry: path.resolve(framevuerkDir, './src/index.js'),
    path: outputDir,
    watch: argv.is('-w') || argv.is('--watch')
  })))
})

module.exports = webpackConfigs