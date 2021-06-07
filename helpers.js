const { exec } = require('child_process')

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

module.exports = { execAsync, logErr, logLoading, successMsg }
