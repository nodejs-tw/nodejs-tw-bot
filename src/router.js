const router = require('koa-router')({
  prefix: '/api/v1'
})
const linebotKoaMiddleware = require('linebot-koa-middleware')
const linebot = require('./service/linebot')



router.get('/', (ctx) => {
  ctx.redirect('https://www.facebook.com/groups/node.js.tw')
});
router.post('/github/webhook', require('./route/github_callback'))
router.post('/zapier/webhook', require('./route/zapier_callback'))
router.post('/line/webhook', linebotKoaMiddleware(linebot))

module.exports = router
