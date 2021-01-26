const path = require('path')
const { promises: fs } = require('fs')

async function parseRequestUrl(url, folder, indexFallback) {
  try {
    const filePath = path.resolve(...folder, ...url.split('/'))
    await fs.access(filePath)
    
    const stats = await fs.lstat(filePath)
      
    if(stats.isDirectory()) {
      const pathWithIndexHtml = path.join(filePath, 'index.html')

      await fs.access(pathWithIndexHtml)

      return {
        ok: true,
        filePath: pathWithIndexHtml,
        extension: 'html'
      }
    }

    if(stats.isFile()) {
      return {
        ok: true,
        filePath,
        extension: filePath.split('.')[1]
      }
    }
  } catch(catchedError) {
    if(indexFallback) {
      return parseUrl('/', folder, true)
    }

    return {
      ok: false,
      error: catchedError
    }
  }
}

module.exports = parseRequestUrl
