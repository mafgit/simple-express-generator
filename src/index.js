#!/usr/bin/env node

require('colors')
const create_backend = require('./create_backend')
const { logErr } = require('./helpers')

const Program = require('simple-node-args')
const program = new Program({
  name: 'simple-express-generator',
  description: 'A simple CLI tool to generate basic express boilerplate.',
  version: '1.6.0',
  links: [
    {
      name: 'Docs',
      value: 'https://mafgit.github.io/simple-express-generator/#/',
    },
    { name: 'Github', value: 'https://github.com/mafgit' },
  ],
})

const models = [
  {
    short: 'h',
    long: 'help',
    help_flag: true,
    description: 'Shows this help message.',
  },
  {
    short: 'p',
    long: 'path',
    default: './backend/',
    description: 'Path to the folder where you want the setup to take place.',
  },
  {
    short: 'd',
    long: 'dependencies',
    type: 'string[]',
    default: '[]',
    description: 'Dependencies for your express app, separated by spaces.',
  },
  {
    short: 'dd',
    long: 'devDependencies',
    type: 'string[]',
    default: "['nodemon']",
    description: 'Dev dependencies for your express app, separated by spaces.',
  },
  {
    short: 'f',
    long: 'folders',
    type: 'string[]',
    default: "['models', 'controllers', 'routes', 'config']",
    description:
      'Folders to be created in your express app, separated by spaces.',
  },
  {
    long: 'nogit',
    will_have_value: false,
    default: false,
    description: 'Pass this if you do not want to initialize git.',
  },
]

program.on_error = (err) => {
  logErr(err)
  process.exit(1)
}
program.parse(process.argv, models)

const { args } = program

if (!args.help) {
  const { path, dependencies, devDependencies, folders, nogit } = args
  console.time('Simple Express App Generated In: '.green)
  create_backend({
    path,
    dependencies: dependencies.filter((i) => i !== ''),
    devDependencies: devDependencies.filter((i) => i !== ''),
    folders: folders.filter((i) => i !== ''),
    nogit,
  })
    .then((res) => {
      console.log(res)
      console.timeEnd('Simple Express App Generated In: '.green)
    })
    .catch((err) => {
      if (err) logErr(err)
    })
}
