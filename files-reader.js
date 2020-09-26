const fs = require('fs')

exports.getFileContent = async (filePath) => {
  return new Promise((resolve, reject) => {
    if(fs.existsSync(filePath)) {
      resolve(fs.readFileSync(filePath))
    }
    reject(`\n> File ${filePath.split('/')[1]} not found`)
  })
}
