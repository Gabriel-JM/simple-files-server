const http = require('http')
const parseRequestUrl = require('./parseRequestUrl')
const { getFileContent } = require('./files-reader')
const Logger = require('./logger')

module.exports = function createServer(folder, mimeTypes, indexFallback) {
  const server = http.createServer(runServer)

  async function runServer(req, res) {
    const parseResult = await parseRequestUrl(req.url, folder, indexFallback)

    if(!parseResult.ok) {
      Logger.fileNotFound(parseResult.error.message)
      return notFound(res)
    }

    const { extension, filePath } = parseResult
    const contentType = mimeTypes[extension]
    
    try {
      const fileContent = await getFileContent(filePath)
  
      if(fileContent) {
        Logger.running()
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(fileContent)
      }
    } catch(err) {
      Logger.fileNotFound(err.message)
    }

    notFound(res)
  }

  return server
}

function notFound(res) {
  res.writeHead(404)
  res.end()
}
