const { logErr, helpMessage } = require('./helpers')
require('colors')
const create_backend = require('./create_backend')

const args_obj = {}

const args = process.argv
let run = true

for (let i = 0; i < args.length; i += 2) {
  const flag = args[i]
  const arg = args[i + 1]
  if (flag === '-h' || flag === '--help') {
    console.log(helpMessage)
    run = false
  } else if (flag === '-p' || flag === '--path') args_obj.path = arg
  else if (flag === '-d' || flag === '--dependencies') {
    args_obj.dependencies = arg.split(' ')
  } else if (flag === '-dd' || flag === '--devDependencies') {
    args_obj.devDependencies = arg.split(' ')
  } else if (flag === '-f' || flag === '--folders') {
    args_obj.folders = arg.split(' ')
  }
}

if (run === true) {
  console.time('Simple Express App Generated In: '.green)
  create_backend(args_obj)
    .then((res) => {
      console.log(res)
      console.timeEnd('Simple Express App Generated In: '.green)
    })
    .catch((err) => {
      if (err) logErr(err)
    })
}