const http = require('http')
const path = require('path')
const { getFileContent } = require('./files-reader')
const Logger = require('./logger')

function chooseFileName(url, indexFallback) {
  if(!indexFallback && url === '/') {
    return 'index.html'
  }

  const regex = /\.[a-z]{1,4}$/
  if(indexFallback && !regex.test(url)) {
    return 'index.html'
  }

  return url
}

module.exports = function createServer(folder, mimeTypes, indexFallback) {
  const server = http.createServer(runServer)

  async function runServer(req, res) {
    const fileName = chooseFileName(req.url, indexFallback)
    const filePath = path.resolve(
      ...folder,
      ...fileName.split('/')
    )
  
    const [_, extension] = fileName.split('.')
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
  res.writeHead(400)
  res.end()
}
