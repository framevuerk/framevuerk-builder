const install = require('npm-install-package')

const devDependencies = require('./package.json').devDependencies

const parsedDependencies = Object.keys(devDependencies).map(dep => dep + '@' + devDependencies[dep])

// const strDepenendecies = parsedDependencies.join(' ')
console.log('Installing framevuerk-builder...')
install(parsedDependencies, {
  save: false,
  saveDev: false,
  cache: true,
  silent: true
}, function (err) {
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