const linebot = require('../service/linebot')
const facebook = require('../service/facebook/facebook')

module.exports = async (ctx) => {
  // console.log('ctx', ctx)
  console.log('ctx.request.body', ctx.request.body)

  if (ctx.request.header['X-GitHub-Event'] === 'issues') {
    console.log('action', ctx.request.body.action)
    console.log('issues', ctx.request.body.issue)
  }

  let issue_info = {
    title: ctx.request.body.issue.title,
    desc: ctx.request.body.issue.body,
    username: ctx.request.body.sender.login,
    avatar: ctx.request.body.sender.avatar_url,
    url: ctx.request.body.issue.html_url,
  }

  facebook.pushFeed(issue_info);

  let message = {
    'type': 'template',
    'altText': 'nodejs-tw/jobs 新職缺通知',
    'template': {
      'type': 'buttons',
      'thumbnailImageUrl': ctx.request.body.sender.avatar_url,
      'title': ctx.request.body.issue.title.substr(0, 40),
      'text': ctx.request.body.issue.body.substr(0, 60),
      'actions': [
        {
          'type': 'uri',
          'label': '點我看更多',
          'uri': ctx.request.body.issue.html_url
        }
      ]
    }
  }

  let res = await linebot.push(process.env.LINE_GROUP_ID, message)
  console.log('res', res)

  ctx.body = res
}
