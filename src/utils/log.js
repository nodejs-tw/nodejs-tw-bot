const logFactory = require('debug')

module.exports = function log (namespace) {
  const debug = logFactory(namespace)

  const error = logFactory(namespace)
  error.log = function (...args) {
    console.error(...args)
  }

  return {
    debug,
    error
  }
}
