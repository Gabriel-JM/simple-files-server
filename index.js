const createServer = require('./lib/server')
const defaultMimeTypes = require('./lib/mime-types')
const Logger = require('./lib/logger')

module.exports = function startServer({
  sourceFolder = '',
  mimeTypes,
  spa = false
}) {
  const usedMimeTypes = selectMimeTypes(mimeTypes)

  const server = createServer(
    sourceFolder.split('/'),
    usedMimeTypes,
    spa
  )

  return {
    listen(port, startFunction) {
      Logger.port = port
      Logger.servingPath = sourceFolder || './'

      Logger.startFunction = startFunction
        ? startFunction
        : Logger.defaultStart
      ;

      server.listen(port, Logger.running())
    }
  }
}

function selectMimeTypes(mimeTypes) {
  if(!mimeTypes) return defaultMimeTypes

  if(typeof mimeTypes === 'function') {
    return mimeTypes(defaultMimeTypes)
  }

  return mimeTypes
}
