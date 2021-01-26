const getCliOptions = require('./get-cli-options')
const filesServer = require('../index')

const [_, __, ...argvs] = process.argv

let pathToFile = '.'

if(argvs.length) {
  pathToFile = argvs[0].includes('-') ? '.' : argvs[0]
}

const options = getCliOptions(argvs)

filesServer({
  source: pathToFile,
  spa: options.spa
}).listen(options.port)
