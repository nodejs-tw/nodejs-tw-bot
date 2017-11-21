const linebot = require('../service/linebot')
const eventEmitter = require('../service/eventEmitter')

module.exports = async (ctx) => {
  console.log('ctx', ctx)
  console.log('ctx', ctx.request.body)

  if (ctx.request.header['X-GitHub-Event'] === 'issues' || ctx.request.body.action === 'opened') {
    console.log('action', ctx.request.body.action)
    console.log('issues', ctx.request.body.issue)
    eventEmitter.emit('github:issue:opened', ctx.request.body)
  }

  ctx.body = {success: true}
}
