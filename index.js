#!/usr/bin/env node
const fs = require('fs')
const {
	execAsync,
	logErr,
	logLoading,
	successMsg,
	helpMessage,
	indexContent,
} = require('./helpers')
require('colors')
const { exec, execSync } = require('child_process')

const createBackend = (
	path = './backend/',
	dependencies = ['express'],
	devDependencies = ['dotenv', 'nodemon'],
	folders = ['models', 'controllers', 'routes', 'config']
) => {
	let rootFolder = path || './backend/'
	if (!rootFolder.endsWith('/')) {
		rootFolder += '/'
	}

	const filesToCreate = ['index.js', '.env', '.gitignore']
	const defaultDependencies = ['express']
	const defaultDevDependencies = ['dotenv', 'nodemon']
	const defaultFolders = ['models', 'controllers', 'routes', 'config']

	logLoading('Processing')
	// Checking whether the root folder exists
	if (!fs.existsSync(rootFolder)) {
		fs.mkdirSync(rootFolder)
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

	return new Promise((resolve, reject) => {
		// Checking whether its empty
		const files = fs.readdirSync(rootFolder)
		if (files.length > 0) return reject('Root folder must be empty'.red)

		// Creating folders
		logLoading('Creating Folders')
		// folders.forEach((folder) => fs.mkdirSync(`${rootFolder}${folder}`))
		execSync(`cd ${rootFolder} && mkdir ${folders.join(' ')}`)

		// Creating files
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

		// Installing Dependencies
		logLoading('Installing Dependencies')
		console.time('Dependencies Installed In: '.green)
		exec(`cd ${rootFolder} && npm init -y`, () =>
			Promise.all([
				execAsync(`cd ${rootFolder} && npm i ${dependencies.join(' ')}`),
				execAsync(`cd ${rootFolder} && npm i ${devDependencies.join(' ')} -D`),
			])
				.then(() => {
					console.timeEnd('Dependencies Installed In: '.green)

					return resolve(successMsg(rootFolder))
				})
				.catch((err) => reject(err))
		)
	})
}

let dependencies
let devDependencies
let folders
let path

const args = process.argv
let run = true

for (let i = 0; i < args.length; i += 2) {
	const flag = args[i]
	const arg = args[i + 1]
	if (flag === '-h' || flag === '--help') {
		console.log(helpMessage)
		run = false
	} else if (flag === '-p' || flag === '--path') path = arg
	else if (flag === '-d' || flag === '--dependencies') {
		dependencies = arg.split(' ')
	} else if (flag === '-dd' || flag === '--devDependencies') {
		devDependencies = arg.split(' ')
	} else if (flag === '-f' || flag === '--folders') {
		folders = arg.split(' ')
	}
}

if (run === true) {
	console.time('Simple Express App Generated In: '.green)
	createBackend(path, dependencies, devDependencies, folders)
		.then((res) => {
			console.log(res)
			console.timeEnd('Simple Express App Generated In: '.green)
		})
		.catch((err) => {
			if (err) logErr(err)
		})
}
