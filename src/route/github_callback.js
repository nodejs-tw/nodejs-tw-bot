const log = require('../utils/log')('ntb:route:github_callback')
const linebot = require('../service/linebot')
const eventEmitter = require('../service/eventEmitter')

module.exports = async (ctx) => {
  log.debug('ctx %j', ctx.request.body)

  if (ctx.request.header['X-GitHub-Event'] === 'issues' || ctx.request.body.action === 'opened') {
    log.debug('action %j', ctx.request.body.action)
    log.debug('issues %j', ctx.request.body.issue)
    eventEmitter.emit('github:issue:opened', ctx.request.body)
  }

  ctx.body = {success: true}
}
