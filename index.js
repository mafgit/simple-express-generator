#!/usr/bin/env node
const fs = require('fs')
const { helpMessage, indexContent } = require('./textContent')
require('colors')

const { execSync } = require('child_process')

const logErr = (msg) => {
  console.log(`\n(!) ${msg}\n`.red)
}

const logLoading = (msg) => {
  console.log(`\n(...) ${msg}\n`.green)
}

const createBackend = (
  path = './backend/',
  dependencies = ['express'],
  devDependencies = ['dotenv', 'nodemon'],
  folders = ['models', 'controllers', 'routes']
) => {
  let rootFolder = path || './backend/'
  if (!rootFolder.endsWith('/')) {
    rootFolder += '/'
  }

  const filesToCreate = ['index.js', '.env', '.gitignore']

  return new Promise((res, rej) => {
    logLoading('Processing')
    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder)
    }

    const files = fs.readdirSync(rootFolder)
    if (files.length > 0) return rej('Root folder must be empty'.red)

    logLoading('Installing Dependencies')
    execSync(
      `cd ${rootFolder} && npm init -y && npm i ${dependencies.join(
        ' '
      )} && npm i ${devDependencies.join(' ')} -D`
    )

    logLoading('Creating Folders')
    folders.forEach((folder) => fs.mkdirSync(`${rootFolder}${folder}`))

    logLoading('Creating Files')
    filesToCreate.forEach((file) =>
      fs.appendFileSync(
        `${rootFolder}${file}`,
        file === 'index.js'
          ? indexContent
          : file === '.gitignore'
          ? '/node_modules\n.env'
          : ''
      )
    )

    const strSuccess = `Success!`.green
    const str2 = `Your backend setup is complete`
    const str3 = `Run the following command:`
    let pathStr = !['./', '.', '/'].includes(rootFolder)
      ? `cd ${rootFolder} && `.blue
      : ''

    const strCommands = pathStr + `node index.js`.blue

    return res(`\n\n${strSuccess}\n\n${str2}\n\n${str3}\n\n${strCommands}\n\n`)
  })
}

let dependencies
let devDependencies
let folders
let path

const args = process.argv
for (let i = 0; i < args.length; i += 2) {
  const flag = args[i]
  const arg = args[i + 1]
  if (flag === '-h' || flag === '--help') {
    console.log(helpMessage)
  } else if (flag === '-p' || flag === '--path') path = arg
  else if (flag === '-d' || flag === '--dependencies') {
    dependencies = arg.split(' ')
  } else if (flag === '-dd' || flag === '--devDependencies') {
    devDependencies = arg.split(' ')
  } else if (flag === '-f' || flag === '--folders') {
    folders = arg.split(' ')
  }
}

createBackend(path, dependencies, devDependencies, folders)
  .then((res) => console.log(res))
  .catch((err) => {
    if (err) logErr(err)
  })
