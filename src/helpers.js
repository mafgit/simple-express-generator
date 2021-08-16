const { exec } = require('child_process')
require('colors')

const addDependencies = (pkgjson, depsObj, cb) => {
  let totalDeps = 0
  let depsAdded = 0

  Object.values(depsObj).forEach((d) => {
    totalDeps += d.length
  })

  Object.keys(depsObj).forEach((depsKey) => {
    if (!pkgjson[depsKey]) pkgjson[depsKey] = {}
    depsObj[depsKey].forEach((dep) => {
      return exec(`npm show ${dep} version`, (err, v) => {
        if (err) return cb(err)
        pkgjson[depsKey][dep] = `^${v}`.replace('\n', '')
        if (++depsAdded >= totalDeps) {
          return cb(null, pkgjson)
        }
      })
    })
  })
}

const logErr = (msg) => {
  console.log(`\n${msg} (!)`.red)
}

const logLoading = (msg) => {
  console.log(`\n=> ${msg}`.green)
}

const successMsg = (rootFolder) => {
  const strSuccess = `Success! Your backend setup is complete.`.green
  const str1 = `Run the following commands to get started:`
  const str2 = `npm i`.blue
  const str3 = `node .`.blue
  let pathStr = !['./', '.', '/'].includes(rootFolder)
    ? `cd ${rootFolder}\n\n`.blue
    : ''
  return `\n${strSuccess}\n\n${str1}\n\n${pathStr}${str2}\n\n${str3}\n`
}

module.exports = {
  logErr,
  logLoading,
  successMsg,
  addDependencies,
}
