const fs = require('fs/promises')

exports.getFileContent = (filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fs.access(filePath)
      
      const fileContent = await fs.readFile(filePath)
      resolve(fileContent)
    } catch {
      reject(new Error(filePath))
    }
  })
}
