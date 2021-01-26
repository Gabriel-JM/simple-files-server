const createServer = require('./lib/server')
const defaultMimeTypes = require('./lib/mime-types')
const Logger = require('./lib/logger')

module.exports = function startServer({
  source = '',
  mimeTypes,
  spa = false
}) {
  const usedMimeTypes = selectMimeTypes(mimeTypes)

  const server = createServer(
    source.split('/'),
    usedMimeTypes,
    spa
  )

  return {
    listen(port, startFunction) {
      Logger.port = port
      Logger.servingPath = source || './'

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
