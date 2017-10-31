const eventEmitter = require('../eventEmitter')

eventEmitter.on('github:issue:opened', (payload) => {
  let message = {
    'type': 'template',
    'altText': 'nodejs-tw/jobs 新職缺通知',
    'template': {
      'type': 'buttons',
      'thumbnailImageUrl': payload.sender.avatar_url,
      'title': payload.issue.title.substr(0, 40),
      'text': payload.issue.body.substr(0, 60),
      'actions': [
        {
          'type': 'uri',
          'label': '點我看更多',
          'uri': payload.issue.html_url
        }
      ]
    }
  }

  eventEmitter.emit('line:push_to_nodejs_group', message)
})
