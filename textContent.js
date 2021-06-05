require('colors')

module.exports = {
  helpMessage: `
${'Simple Express Generator'.blue}

Flags:

1) ${'-p'.green} or ${'--path'.green} (Where to set up express server)
    default --> -p ./backend/

2) ${'-h'.green} or ${'--help'.green} (See the list of available commands)

3) ${'-f'.green} or ${
    '--folders'.green
  } (Folders that you want to create. All arguments must be in a single pair of "double quotes".)
    default --> -f "models controllers routes"
    NOTE: Default folders would be overwritten by your arguments, so be sure to write them again.

4) ${'-d'.green} or ${
    '--dependencies'.green
  } (It is followed by the npm dependencies which must all be wrapped inside one pair of "double quotes")
    default --> -d "express"
    NOTE: Default packages would be overwritten by your arguments, so be sure to write them again.

5) ${'-dd'.green} or ${
    '--devDependencies'.green
  } (It is almost the same as -d but it installs dependencies as dev dependencies.)
    default --> -dd "nodemon dotenv"
    NOTE: Default packages would be overwritten by your arguments, so be sure to write them again.
`,
  indexContent: `const express = require('express')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(\`Server running on http://localhost:\${PORT}\`))
`,
}
