const eventEmitter = require('../service/eventEmitter')

module.exports = async (ctx) => {
  console.log('ctx', ctx)
  console.log('body', ctx.request.body)

  let titile = ctx.request.body.title
  let link = ctx.request.body.link
  
  ctx.body = {}  
}
