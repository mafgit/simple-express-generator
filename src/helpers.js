const { exec } = require('child_process')
require('colors')

const execAsync = (command = '', cb = () => {}) =>
  new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        reject(err)
        return cb(err, null)
      }
      resolve(stdout)
      return cb(null, stdout)
    })
  })

const installDependencies = (rootFolder, dependencies, devDependencies) => {
  return Promise.all([
    execAsync(`cd ${rootFolder} && npm i ${dependencies.join(' ')}`),
    execAsync(`cd ${rootFolder} && npm i ${devDependencies.join(' ')} -D`),
  ])
}

const logErr = (msg) => {
  console.log(`\n(!) ${msg}\n`.red)
}

const logLoading = (msg) => {
  console.log(`\n(...) ${msg}\n`.green)
}

const successMsg = (rootFolder) => {
  const strSuccess = `Success!`.green
  const str2 = `Your backend setup is complete`
  const str3 = `Run the following command:`
  let pathStr = !['./', '.', '/'].includes(rootFolder)
    ? `cd ${rootFolder} && `.blue
    : ''
  const strCommands = pathStr + `node index.js`.blue
  return `\n\n${strSuccess}\n\n${str2}\n\n${str3}\n\n${strCommands}\n\n`
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
      defaults: '"nodemon dotenv"',
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
  installDependencies,
}
