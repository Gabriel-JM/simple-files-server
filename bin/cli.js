const path = require('path')
const fs = require('fs')
const getCliOptions = require('./get-cli-options')
const filesServer = require('../index')
const Logger = require('../lib/logger')

const [_, __, ...argvs] = process.argv

let pathToFile = '.'

if(argvs.length) {
  pathToFile = argvs[0].includes('-') ? '.' : argvs[0]
}

const options = getCliOptions(argvs)

const fullPath = path.resolve(pathToFile)
const existsFile = fs.existsSync(path.join(fullPath, 'index.html'))

if(existsFile) {
  filesServer({
    sourceFolder: pathToFile,
    spa: options.spa
  }).listen(options.port)
} else {
  Logger.cliPathNotFound(fullPath)
}
