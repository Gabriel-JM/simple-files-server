const createServer = require('./lib/server')
const defaultMimeTypes = require('./lib/mime-types')
const Logger = require('./lib/logger')

const defaultParam = {
  folder: '',
  mimeTypes: null,
  whenNoFileFallbackToIndex: true
}

module.exports = function startServer({
  folder,
  mimeTypes,
  whenNoFileFallbackToIndex
} = defaultParam) {
  const usedMimeTypes = selectMimeTypes(mimeTypes)

  const server = createServer(
    folder.split('/'),
    usedMimeTypes,
    whenNoFileFallbackToIndex
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
