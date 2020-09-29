const http = require('http')
const path = require('path')
const { getFileContent } = require('./files-reader')

const outOfNodeModules = ['..', '..']

module.exports = function createServer(folder, mimeTypes) {
  const server = http.createServer(runServer)

  async function runServer(req, res) {
    const fileName = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(
      __dirname,
      ...outOfNodeModules,
      ...folder,
      fileName
    )
  
    const [_, extension] = fileName.split('.')
    const contentType = mimeTypes[extension]
    
    try {
      const fileContent = await getFileContent(filePath)
  
      if(fileContent) {
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(fileContent)
      }
    } catch(err) {
      console.error('static-server Error:', err)
    }
  
    notFound(res)
  }

  return server
}

function notFound(res) {
  res.writeHead(400)
  res.end()
}