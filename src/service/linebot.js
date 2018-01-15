require('dotenv').config()
const linebot = require('linebot')
const fileType = require('file-type')

let bot = linebot({
  channelId: process.env.LINT_CHANNEL_ID,
  channelSecret: process.env.LINT_CHANNEL_SECRET,
  channelAccessToken: process.env.LINT_CHANNEL_TOKEN
})

bot.on('message', async function (event) {
  console.log(event)
  console.log(await event.message.content())
  console.log(fileType(await event.message.content()))

  if (event.message.type === 'text') {
    let msg = event.message.text
    let replyMsg = `Got: ${msg}`

    console.log('profile', await event.source.profile())
    console.log('replyMsg', replyMsg)

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
