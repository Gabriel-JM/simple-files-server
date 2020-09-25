const createServer = require('./server')
const defaultMimeTypes = require('./mime-types')

module.exports = function ({ folder = '', mimeTypes = null }) {
  const usedMimeTypes = selectMimeTypes(mimeTypes)

  const server = createServer(
    folder.split('/'),
    usedMimeTypes
  )
  
  function defaultStartFunction(port) {
    console.clear()
    console.log(`Server started at: http://localhost:${port}`)
  }

  return {
    listen(port, startFunction) {
      server.listen(
        port,
        startFunction ? startFunction(port) : defaultStartFunction(port)
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
