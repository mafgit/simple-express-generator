# Simple Express Generator

[![NPM](https://img.shields.io/npm/v/simple-express-generator.svg?style=for-the-badge)](https://www.npmjs.com/package/simple-express-generator)
[![NPM](https://img.shields.io/npm/dt/simple-express-generator?style=for-the-badge)]()

> Generates a simple express server and lets you decide folders, dependencies, etc.

## Usage:

#### Without Installation (Recommended):

`npx simple-express-generator`

#### With Installation:

1) `npm i simple-express-generator -g`
  
1) `simple-express-generator`

## Flags:

### -p or --path

> Specify the path where you want the setup to take place.

**Default:** `./backend/`

**Note:** Write `-p .` if you want to start the setup in the current directory.

### -h or --help

> See the list of available commands

### -f or --folders

> Specify the folders that you want to create, in a single pair of double quotes.

**Default:** `"models controllers routes"`

**Note:** Write `... ` in the beginning of the argument (be sure to give a space after three dots) to include the defaults in your argument, otherwise you will overwrite them.

### -d or --dependencies

> Specify the dependencies that you want to install, in a single pair of double quotes.

**Default:** `"express"`

**Note:** Write `... ` in the beginning of the argument (be sure to give a space after three dots) to include the defaults in your argument, otherwise you will overwrite them.

### -dd or --devDependencies

> Specify the developer dependencies that you want to install, in a single pair of double quotes.

**Default:** `"nodemon dotenv"`

**Note:** Write `... ` in the beginning of the argument (be sure to give a space after three dots) to include the defaults in your argument, otherwise you will overwrite them.

## Links
[Github Repository](https://github.com/mafgit/simple-express-generator)

[NPM Package](https://www.npmjs.com/package/simple-express-generator)