const eventEmitter = require('../eventEmitter')

eventEmitter.on('line:push_to_nodejs_group', async (message) => {
  let res = await linebot.push(process.env.LINE_GROUP_ID, message)

  console.log('line:push_to_nodejs_group', res)
})
