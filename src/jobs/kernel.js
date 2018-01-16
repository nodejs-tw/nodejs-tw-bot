const log = require('../utils/log')('ntb:jobs:kernel')
const schedule = require('node-schedule')
const autoClosedIssue = require('./autoClosedIssue')

schedule.scheduleJob('09 20 * * *', function () {
  log.debug('autoClosedIssue')
  autoClosedIssue()
})
