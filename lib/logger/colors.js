const prefix = '\x1b['

module.exports = {
  reset: (text) => `${prefix}0m${text ? text : ''}`,
  bold: (text) => `${prefix}1m${text}${prefix}22m`,
  underline: (text) => `${prefix}4m${text}${prefix}22m`,

  red: (text) => `${prefix}91m${text}${prefix}39m`,
  cyan: (text) => `${prefix}96m${text}${prefix}39m`,
  gray: (text) => `${prefix}1m${prefix}30m${text}${prefix}0m`
}
