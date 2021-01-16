const path = require('path')
const fs = require('fs')
const getCliOptions = require('./get-cli-options')
const filesServer = require('../index')
const Logger = require('../lib/logger')

const [_, __, pathToFile = '.', ...argvs] = process.argv

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
