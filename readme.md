# Simple Express Generator

[![NPM](https://img.shields.io/npm/v/simple-express-generator.svg?style=for-the-badge)](https://www.npmjs.com/package/simple-express-generator)
[![NPM](https://img.shields.io/npm/dt/simple-express-generator?style=for-the-badge)]()

> Generates a simple express server and lets you decide the folders and dependencies.

## Usage:

#### Without Installation:

- `npx simple-express-generator`

#### With Installation:

- `npm i simple-express-generator -g`
  
   Then

- `simple-express-generator`

## Flags:

### '-p' or '--path'

> Where to set up express server

**Default:** *-p ./backend/*

### '-h' or '--help'

> See the list of available commands

### '-f' or '--folders'

> Folders that you want to create. All arguments must be in a single pair of "double quotes".

**Default:** *-f "models controllers routes"*

**NOTE:** *Default folders would be overwritten by your arguments, so be sure to write them again.*

### '-d' or '--dependencies'

   > It is followed by the npm dependencies which must all be wrapped inside one pair of "double quotes"

**Default:** *-d "express"*

**NOTE:** *Default packages would be overwritten by your arguments, so be sure to write them again.*

### '-dd' or '--devDependencies'

   > It is almost the same as -d but it installs dependencies as dev dependencies.

**Default:** *-dd "nodemon dotenv"*

**NOTE:** *Default packages would be overwritten by your arguments, so be sure to write them again.*
