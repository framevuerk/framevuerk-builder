const { install } = require('enpeem')

const dependencies = require('./package.json').customDependencies
const parsedDependencies = Object.keys(dependencies).map(dep => dep + '@' + dependencies[dep])

console.log('Installing framevuerk-builder...')
install({
  dependencies: parsedDependencies,
  loglevel: 'silent',
  dir: __dirname,
  'cache-min': 999999999
}, err => {
  if (err) {
    console.log('Failed to install framevuerk-builder!')
    throw err
  }
  console.log('framevuerk-builder installed successfully!')
})


// function installDep(package, version) {
//   const exactPackage = package + '@' + version
//   console.log('installing ' + exactPackage + '...')
//   return new Promise((resolve, reject) => {
    
//     exec('npm install ' + exactPackage, (err, stdout, stderr) => {
//       if (err) {
//         console.log('faild to install ', exactPackage + '.')
//           return reject(err)
//       }
//       console.log(exactPackage + ' installed.')
//       resolve(stdout)
//     })
//   })
// }


// const actions = Object.keys(dependencies).map(dep => installDep(dep, dependencies[dep]))

// Promise.all(actions).then(() => {
//   console.log('Done!!!')
// }).catch((err) => {
//   console.log('err')
// })