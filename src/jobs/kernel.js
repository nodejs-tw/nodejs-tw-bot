const schedule = require('node-schedule')
const autoClosedIssue = require('./autoClosedIssue')

schedule.scheduleJob('* * * * *', function () {
  autoClosedIssue()
})
