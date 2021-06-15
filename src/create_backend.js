const { existsSync, mkdirSync, readdirSync, appendFileSync } = require('fs')
const { logLoading, successMsg, installDependencies } = require('./helpers')
const { exec, execSync } = require('child_process')
const templates = require('./templates')

const createBackend = (
  path = './backend/',
  dependencies = [], // express is already there
  devDependencies = ['dotenv', 'nodemon'],
  folders = ['models', 'controllers', 'routes', 'config']
) => {
  let rootFolder = path || './backend/'
  if (!rootFolder.endsWith('/')) {
    rootFolder += '/'
  }

  const filesToCreate = ['.gitignore']
  if ([...dependencies, ...devDependencies].includes('dotenv'))
    filesToCreate.push('.env')
  const defaultDependencies = [] // express is already there
  const defaultDevDependencies = ['dotenv', 'nodemon']
  const defaultFolders = ['models', 'controllers', 'routes', 'config']

  logLoading('Processing')
  // Checking whether the root folder exists
  if (!existsSync(rootFolder)) {
    mkdirSync(rootFolder)
  }

  // Checking for ... in args
  if (folders.includes('...'))
    folders = [...defaultFolders, ...folders.filter((i) => i !== '...')]
  if (dependencies.includes('...'))
    dependencies = [
      ...defaultDependencies,
      ...dependencies.filter((i) => i !== '...'),
    ]
  if (devDependencies.includes('...'))
    devDependencies = [
      ...defaultDevDependencies,
      ...devDependencies.filter((i) => i !== '...'),
    ]

  dependencies.push('express') // this default can't be overwritten

  return new Promise((resolve, reject) => {
    // Checking whether its empty
    const files = readdirSync(rootFolder)
    if (files.length > 0) return reject('Root folder must be empty'.red)

    // Creating folders
    logLoading('Creating Folders')
    execSync(`cd ${rootFolder} && mkdir ${folders.join(' ')}`)

    // Creating files
    logLoading('Creating Files')
    filesToCreate.forEach((file) => {
      if (file === '.gitignore')
        appendFileSync(`${rootFolder}${file}`, '/node_modules\n*.env')
    })

    // Installing Dependencies
    logLoading('Installing Dependencies')
    console.time('Dependencies Installed In: '.green)
    exec(`cd ${rootFolder} && npm init -y`, () => {
      return installDependencies(rootFolder, dependencies, devDependencies)
        .then(() => {
          console.timeEnd('Dependencies Installed In: '.green)
          templates(rootFolder, dependencies, devDependencies, folders)
          return resolve(successMsg(rootFolder))
        })
        .catch((err) => reject(err))
    })
  })
}

export default createBackend
