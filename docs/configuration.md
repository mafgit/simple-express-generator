# Configuration

## Path

> Path to the folder where you want the setup to take place.

**Flag** `-p or --path`

**Default** `./backend/`

**Example** `npx simple-express-generator -p ./server/`

**Note** Write `-p .` if you want to start the setup in the current directory.

## Help

> Shows the help message.

**Flag** `-h or --help`

**Example** `npx simple-express-generator -h`

## Folders

> Specify the folders that you want to create, in a single pair of double quotes.

**Flag** `-f or --folders`

**Default** `"models controllers routes config"`

**Example** `npx simple-express-generator -f ... tests public`

**Note** The value for this flag must be an array, so separate each item with a space. Pass `... ` as well if you want to include the defaults and not overwrite them.

## Dependencies

> Specify the dependencies that you want to install, each separated by a space.

**Flag** `-d or --dependencies`

**Default** `""` _// Express is already there, it won't be overwritten by your arguments._

**Example** `npx simple-express-generator -d mongoose jsonwebtoken`

**Note** The value for this flag must be an array, so separate each item with a space. Pass `... ` as well if you want to include the defaults and not overwrite them.

## Dev Dependencies

> Specify the dev dependencies that you want to install, each separated by a space.

**Flag** `-dd or --devDependencies`

**Default** `"nodemon"`

**Example** `npx simple-express-generator -dd ... jest`

**Note** The value for this flag must be an array, so separate each item with a space. Pass `... ` as well if you want to include the defaults and not overwrite them.

## No Git

> Specify this flag is you don't want git to be initialized

**Flag** `--nogit`

**Default** `false`

**Example** `npx simple-express-generator --nogit`