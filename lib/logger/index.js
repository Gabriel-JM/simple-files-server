const colors = require('./colors')

module.exports = class Logger {
  static fileNotFound(filePath) {
    console.clear()
    console.log(
      colors.red('\n[Error]'),
      colors.gray(new Date().toLocaleString()),
      '\nFile not found on path:',
      filePath,
      colors.reset('\n')
    )
  }

  static defaultStart(port) {
    console.clear()
    console.log(
      colors.cyan('[Info]'),
      colors.gray(new Date().toLocaleString()),
      '\nServer started at:',
      colors.underline(`http://localhost:${port}`),
      colors.reset('\n')
    )
  }
}

