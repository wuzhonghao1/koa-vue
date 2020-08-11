// const router = require('koa-router')();
// const controller = require('../controller/c-signup')

// // 注册页面
// router.get('/signup', controller.getSignup)
// // post 注册
// router.post('/signup', controller.postSignup)

// module.exports = router
const router = require('koa-router')();
const userModel = require('../lib/mysql.js');
const md5 = require('md5')
const checkNotLogin = require('../middlewares/check.js').checkNotLogin
const checkLogin = require('../middlewares/check.js').checkLogin
const moment = require('moment');
const fs = require('fs')
// 注册页面
router.get('/', async (ctx, next) => {
    await checkNotLogin(ctx)
    await ctx.render('signup', {
        session: ctx.session,
    })
})

module.exports = router