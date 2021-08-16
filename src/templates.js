const { execSync } = require('child_process')
const { writeFile, writeFileSync } = require('fs')

const camelCase = (str) => {
  let newStr = ''
  let arr = str.split('-')
  arr.forEach((word) => {
    if (newStr.length === 0) newStr += word.toLowerCase()
    else newStr += word[0].toUpperCase() + word.slice(1).toLowerCase()
  })
  return newStr
}

const create_templates = (
  rootFolder,
  dependencies,
  devDependencies,
  folders
) => {
  return new Promise((resolve, reject) => {
    const deps = [...new Set([...dependencies, ...devDependencies])]
    // Requires
    let requires = ``
    deps.forEach((i) => {
      requires += `const ${camelCase(i)} = require('${i}')\n`
    })

    if (deps.includes('dotenv')) requires += '\ndotenv.config()\n'
    if (deps.includes('mongoose'))
      requires += `const db_connection = require('./config/db_connection')\n`

    // Other content
    let indexContent = ``

    indexContent += `\nconst app = express()\napp.use(express.urlencoded({ extended: false }))\napp.use(express.json())\n${
      folders.includes('routes') ? "app.use(require('./routes/'))\n" : ''
    }`
    if (deps.includes('mongoose')) {
      indexContent += `
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/'
db_connection(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    throw err
  })
`
      if (!folders.includes('config'))
        execSync(`cd ${rootFolder} && mkdir config`)
      writeFileSync(
        `${rootFolder}config/db_connection.js`,
        `const mongoose = require('mongoose')

const options = {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
}
  
module.exports = (uri) => mongoose.connect(uri, options)`
      )
    }
    indexContent += `\nconst PORT = process.env.PORT || 5000\napp.listen(PORT, () => console.log(\`Server running on http://localhost:\${PORT}\`))\n`

    // Creating index.js for routes
    if (folders.includes('routes')) {
      const routesContent = `const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})
    
module.exports = router`
      writeFileSync(`${rootFolder}routes/index.js`, routesContent)
    }

    writeFileSync(`${rootFolder}.gitignore`, '/node_modules\n*.env')
    if (deps.includes('dotenv')) writeFileSync(`${rootFolder}.env`, '')

    // Writing to index.js
    writeFile(`${rootFolder}index.js`, requires + indexContent, (err) => {
      if (err) return reject(err)
      return resolve('created index.js')
    })
  })
}

module.exports = create_templates
