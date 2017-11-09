const linebot = require('../service/linebot')
const eventEmitter = require('../service/eventEmitter')

module.exports = async (ctx) => {
  console.log('ctx', ctx)
  console.log('ctx', ctx.request.body)

  if (ctx.request.header['X-GitHub-Event'] === 'issues' || ctx.request.body.action === 'opened') {
    console.log('action', ctx.request.body.action)
    console.log('issues', ctx.request.body.issue)

    eventEmitter.emit('github:issue:opened', ctx.request.body)
    ctx.body = {}
    return
  }

  // let message = {
  //   'type': 'template',
  //   'altText': 'nodejs-tw/jobs 新職缺通知',
  //   'template': {
  //     'type': 'buttons',
  //     'thumbnailImageUrl': ctx.request.body.sender.avatar_url,
  //     'title': ctx.request.body.issue.title.substr(0, 40),
  //     'text': ctx.request.body.issue.body.substr(0, 60),
  //     'actions': [
  //       {
  //         'type': 'uri',
  //         'label': '點我看更多',
  //         'uri': ctx.request.body.issue.html_url
  //       }
  //     ]
  //   }
  // }

  // let res = await linebot.push(process.env.LINE_GROUP_ID, message)
  // console.log('res', res)

  ctx.body = {success: true}
}
