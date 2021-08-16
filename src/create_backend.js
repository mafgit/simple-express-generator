const {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} = require('fs')
const { logLoading, successMsg, addDependencies } = require('./helpers')
const { exec, execSync } = require('child_process')
const create_templates = require('./templates')

const create_backend = ({
  path,
  dependencies, // express is already there
  devDependencies,
  folders,
  nogit,
}) => {
  let rootFolder = path || './backend/'
  if (!rootFolder.endsWith('/')) {
    rootFolder += '/'
  }

  const defaultDependencies = [] // express is already there
  const defaultDevDependencies = ['nodemon']
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

  if (!dependencies.includes('express')) dependencies.push('express') // this default can't be overwritten

  return new Promise((resolve, reject) => {
    // Checking whether its empty
    const files = readdirSync(rootFolder)
    if (files.length > 0) return reject('Root folder must be empty')

    // Creating folders
    if (folders.length > 0) {
      logLoading('Generating Folders')
      execSync(`cd ${rootFolder} && mkdir ${folders.join(' ')}`)
    }

    // Installing Dependencies
    logLoading('Generating package.json')
    exec(
      `cd ${rootFolder} && npm init -y${!nogit ? ' && git init' : ''}`,
      (err) => {
        if (err) return reject(err)
        const pkgjson = JSON.parse(readFileSync(`${rootFolder}package.json`))
        return addDependencies(
          pkgjson,
          { dependencies, devDependencies },
          (err, new_pkgjson) => {
            if (err) return reject(err)
            writeFileSync(
              `${rootFolder}package.json`,
              JSON.stringify(new_pkgjson)
            )
            logLoading('Generating files')
            create_templates(rootFolder, dependencies, devDependencies, folders)
              .then(() => {
                return resolve(successMsg(rootFolder))
              })
              .catch((err) => reject(err))
          }
        )
      }
    )
  })
}

module.exports = create_backend
