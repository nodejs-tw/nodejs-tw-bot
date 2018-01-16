const request = require('request')
const _ = require('lodash')
const moment = require('moment')

const reposName = process.env.REPONAME
const accessToken = process.env.GITHUB_ACCESS_TOKEN
const closeDay = process.env.CLOSEDAY

function closeIsuue (issueID) {
  let options = {
    method: 'PATCH',
    url: `https://api.github.com/repos/${reposName}/issues/${issueID}`,
    headers:
    {
      'Authorization': `token ${accessToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'nodejs-tw-bot'
    },
    body: {state: 'closed'},
    json: true
  }
  request(options)
}

module.exports = function () {
  let options = {
    method: 'GET',
    url: `https://api.github.com/repos/${reposName}/issues?state=open&sort=updated&direction=asc`,
    headers: {
      'Authorization': `token ${accessToken}`,
      'User-Agent': 'nodejs-tw-bot'
    }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)

    body = JSON.parse(body)
    let now = moment()

    _.forEach(body, function (n, key) {
      let diffDays = now.diff(moment(n.updated_at), 'days')

      if (diffDays >= closeDay) {
        closeIsuue(n.number)
      }
    })
  })
}
