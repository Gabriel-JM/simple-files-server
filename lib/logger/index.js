const colors = require('./colors')

module.exports = class Logger {
  static startFunction = this.defaultStart
  static port = null
  static servingPath = ''

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

  static running() {
    this.startFunction(this.port)
  }

  static defaultStart(port) {
    console.clear()
    console.log(
      colors.cyan('[Info]'),
      colors.gray(`Serving: ${this.servingPath} | ${new Date().toLocaleString()}`),
      '\nServer running at:',
      colors.underline(`http://localhost:${port}`),
      colors.reset('\n')
    )
  }

  static cliPathNotFound(path) {
    console.log(
      colors.red('[Error]'),
      colors.gray("index.html file doesn\'t exist on given folder path\n"),
      colors.reset(path)
    )
  }
}

