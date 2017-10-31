const eventEmitter = require('../service/eventEmitter')

module.exports = async (ctx) => {
  console.log('ctx', ctx)
  console.log('ctx', ctx.request.body)
  ctx.body = {}  
}
