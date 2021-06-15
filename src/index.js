const { logErr, helpMessage } = require('./helpers')
require('colors')
const createBackend = require('./create_backend')

let dependencies
let devDependencies
let folders
let path

const args = process.argv
let run = true

for (let i = 0; i < args.length; i += 2) {
  const flag = args[i]
  const arg = args[i + 1]
  if (flag === '-h' || flag === '--help') {
    console.log(helpMessage)
    run = false
  } else if (flag === '-p' || flag === '--path') path = arg
  else if (flag === '-d' || flag === '--dependencies') {
    dependencies = arg.split(' ')
  } else if (flag === '-dd' || flag === '--devDependencies') {
    devDependencies = arg.split(' ')
  } else if (flag === '-f' || flag === '--folders') {
    folders = arg.split(' ')
  }
}

if (run === true) {
  console.time('Simple Express App Generated In: '.green)
  createBackend(path, dependencies, devDependencies, folders)
    .then((res) => {
      console.log(res)
      console.timeEnd('Simple Express App Generated In: '.green)
    })
    .catch((err) => {
      if (err) logErr(err)
    })
}

// Webpack, shebang, tests
