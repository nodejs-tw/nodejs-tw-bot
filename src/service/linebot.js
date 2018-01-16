require('dotenv').config()
const log = require('../utils/log')('ntb:service:linebot')
const linebot = require('linebot')
const fileType = require('file-type')

let bot = linebot({
  channelId: process.env.LINT_CHANNEL_ID,
  channelSecret: process.env.LINT_CHANNEL_SECRET,
  channelAccessToken: process.env.LINT_CHANNEL_TOKEN
})

bot.on('message', async function (event) {
  log.debug('event %j', event)

  if (event.message.type === 'text') {
    log.debug('profile %j', await event.source.profile())

    let msg = event.message.text

    if (msg === '/give_me_id') {
      let groupId = event.source.groupId
      let userId = event.source.userId
      let replyMsg = `* groupId: ${groupId}\n* userId: ${userId}`
      event.reply(replyMsg).then(function (data) {
        console.log(replyMsg)
      }).catch(function (error) {
        if (error) {
          console.log('error')
        }
      })
    }

    // 先拔掉這個功能避免在群組太吵
    // event.reply(replyMsg).then(function (data) {
    //   console.log(replyMsg)
    // }).catch(function (error) {
    //   if (error) {
    //     console.log('error')
    //   }
    // })
  }
})

module.exports = bot
