module.exports = (argvs) => {
  const defaultPort = 3500

  const options = argvs.reduce((acc, value, index) => {
    if(value === '--port' || value === '-p') {
      return {
        ...acc,
        port: Number(argvs[index + 1]) || defaultPort
      }
    }

    if(value === '--spa') {
      return { ...acc, spa: true }
    }

    return acc
  }, { port: defaultPort, spa: false })

  return options
}
