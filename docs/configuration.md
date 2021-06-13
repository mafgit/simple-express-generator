# Configuration

## Path

> Specify the path where you want the setup to take place.

**Flag** `-p or --path`

**Default** `./backend/`

**Example** `npx simple-express-generator -p ./server/`

**Note** Write `-p .` if you want to start the setup in the current directory.

## Help

> See the list of available commands

**Flag** `-h or --help`

**Example** `npx simple-express-generator -h`

## Folders

> Specify the folders that you want to create, in a single pair of double quotes.

**Flag** `-f or --folders `

**Default** `npx simple-express-generator -f "models controllers routes"`

**Note** Write `... ` in the beginning of the argument (be sure to give a space after three dots) to include the defaults in your argument, otherwise you will overwrite them.

## Dependencies

> Specify the dependencies that you want to install, in a single pair of double quotes.

**Flag** `-d or --dependencies`

**Default** `npx simple-express-generator -d "express"`

**Note** Write `... ` in the beginning of the argument (be sure to give a space after three dots) to include the defaults in your argument, otherwise you will overwrite them.

## Dev Dependencies

> Specify the dev dependencies that you want to install, in a single pair of double quotes.

**Flag** `-dd or --devDependencies`

**Default** `npx simple-express-generator -dd "nodemon dotenv"`

**Note** Write `... ` in the beginning of the argument (be sure to give a space after three dots) to include the defaults in your argument, otherwise you will overwrite them.
