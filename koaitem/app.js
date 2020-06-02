/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-19 15:16:22
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-02 15:09:41
 * @FilePath: \koa-vue\koaitem\app.js
 */
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt')
const cors = require('koa2-cors')
const index = require('./routes/index')
const user = require('./routes/user')
const city = require('./routes/city')
const good = require('./routes/good')
const store = require('./routes/store')
const shopingCart = require('./routes/shopingCart')
const order = require('./routes/order')
const verToken = require('./public/javascripts/tool')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(cors({
	origin: function (ctx) { //设置允许来自指定域名请求
		// if (ctx.url === '/test') {
		//     return '*'; // 允许来自所有域名请求
		// }
		// 多个域名的话设置一个白名单
		// const whiteList = ['http://localhost:8082', 'http://localhost:8081']; //可跨域白名单
		// let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
		// if (whiteList.includes(url)) {
		//     return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
		// }
		return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
		// return '*';
	},
	maxAge: 5, //指定本次预检请求的有效期，单位为秒。
	credentials: true, //是否允许发送Cookie
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
	allowHeaders: ['Content-Type', 'Authorization', 'token', 'Accept'], //设置服务器支持的所有头信息字段
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))
// 这里解析当前登录人，获取当前登录人的user和password，统一放在ctx的state中，这样所有的接口就可以直接在ctx对象中拿到登陆人信息
app.use(async (ctx, next) => {
	var token = ctx.headers.authorization;
	if (token == undefined) {
		await next();
	} else {
		verToken.verToken(token).then((data) => {
			ctx.state = {
				data: data
			};
		})
		await next();
	}
})
app.use(async (ctx, next) => {
	return next().catch((err) => {
		if (401 == err.status) {
			ctx.status = 401;
			ctx.body = {
				status: 401,
				msg: '登录过期，请重新登录'
			}
		} else {
			throw err;
		}
	});
});
app.use(koajwt({
	secret: '123456'
}).unless({
	path: [/^\/user\/regist/, /^\/user\/login/, /^\/user\/reactivation/, /^\/user\/deleteUser/]
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(city.routes(), city.allowedMethods())
app.use(good.routes(), good.allowedMethods())

app.use(store.routes(), store.allowedMethods())
app.use(shopingCart.routes(), shopingCart.allowedMethods())
app.use(order.routes(), order.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

module.exports = app
