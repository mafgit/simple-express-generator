const { exec } = require('child_process')
const lv = require('latest-version')
require('colors')

const filterArrArg = (arg) =>
  arg.trim() ? [...new Set(arg.trim().split(' '))] : []

const execAsync = (command = '', cb = () => {}) =>
  new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        reject(err)
        return cb(err)
      }
      resolve(stdout)
      return cb(null, stdout)
    })
  })

const addDependencies = (pkgjson, depsObj, cb) => {
  let totalDeps = 0
  let depsAdded = 0
  Object.values(depsObj).forEach((d) => {
    totalDeps += d.length
  })
  Object.keys(depsObj).forEach((depsKey) => {
    if (!pkgjson[depsKey]) pkgjson[depsKey] = {}
    depsObj[depsKey].forEach((dep, i) =>
      lv(dep)
        .then((v) => {
          pkgjson[depsKey][dep] = `^${v}`
          if (++depsAdded >= totalDeps) return cb(null, pkgjson)
        })
        .catch((err) => {
          return cb(err)
        })
    )
  })
}

const logErr = (msg) => {
  console.log(`\n(!) ${msg}\n`.red)
}

const logLoading = (msg) => {
  console.log(`\n(...) ${msg}\n`.green)
}

const successMsg = (rootFolder) => {
  const strSuccess = `Success! Your backend setup is complete.`.green
  const str1 = `Run the following commands to get started:`
  const str2 = `npm i`.blue
  const str3 = `node .`.blue
  let pathStr = !['./', '.', '/'].includes(rootFolder)
    ? `cd ${rootFolder}\n\n`.blue
    : ''
  return `\n\n${strSuccess}\n\n${str1}\n\n${pathStr}${str2}\n\n${str3}\n\n`
}

const generateHelpMessage = () => {
  let str = `
Simple Express Generator

Flags:
`.blue
  const flags = [
    {
      short: 'p',
      long: 'path',
      defaults: './backend/',
      description: 'Specify the path where you want the setup to take place.',
      example: 'npx simple-express-generator -p ./server/',
      note: 'Write `-p .` if you want to start the setup in the current directory.',
    },
    {
      short: 'h',
      long: 'help',
      description: 'See the list of available commands.',
      example: 'npx simple-express-generator -h',
    },
    {
      short: 'f',
      long: 'folders',
      defaults: '"models controllers routes config"',
      example: 'npx simple-express-generator -f "... tests"',
      description:
        'Specify the folders that you want to create, in a single pair of double quotes.',
      note: 'Write `... ` in the beginning of the argument (be sure to give a space after three dots) to include the defaults in your argument, otherwise you will overwrite them.',
    },
    {
      short: 'd',
      long: 'dependencies',
      defaults:
        '"" // Express is already there, it would not be overwritten by your arguments.',
      example: 'npx simple-express-generator -d "mongoose jsonwebtoken"',
      description:
        'Specify the dependencies that you want to install, in a single pair of double quotes.',
    },
    {
      short: 'dd',
      long: 'devDependencies',
      defaults: '"nodemon"',
      example: 'npx simple-express-generator -dd "... jest"',
      description:
        'Specify the developer dependencies that you want to install, in a single pair of double quotes.',
      note: 'Write `... ` in the beginning of the argument (be sure to give a space after three dots) to include the defaults in your argument, otherwise you will overwrite them.',
    },
  ]
  flags.forEach(({ short, long, defaults, description, note, example }) => {
    str += `
${'Flag: '.blue} -${short} or --${long}
${'Description: '.blue} ${description}${
      defaults ? '\nDefault: '.blue + defaults : ''
    }
${'Example: '.blue} ${example}${note ? '\nNote: '.blue + note : ''}
`
  })

  str += `
Github: https://github.com/mafgit/simple-express-generator\n
NPM: https://www.npmjs.com/package/simple-express-generator
`.blue

  return str
}

module.exports = {
  execAsync,
  logErr,
  logLoading,
  successMsg,
  helpMessage: generateHelpMessage(),
  addDependencies,
  filterArrArg,
}
