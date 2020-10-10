const createServer = require('./lib/server')
const defaultMimeTypes = require('./lib/mime-types')
const Logger = require('./lib/logger')

const defaultParam = { folder: '', mimeTypes: null }
module.exports = function startServer({ folder, mimeTypes } = defaultParam) {
  const usedMimeTypes = selectMimeTypes(mimeTypes)

  const server = createServer(
    folder.split('/'),
    usedMimeTypes
  )

  return {
    listen(port, startFunction) {
      server.listen(
        port,
        startFunction
          ? startFunction(port)
          : Logger.defaultStart(port)
      )
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
