/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-15 15:04:38
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-19 11:52:22
 * @FilePath: \koa\index.js
 */
const Koa = require('koa')
const cors = require('koa2-cors')
const router = require('./router/index')
const app = new Koa()
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
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))
app.use(router.routes(), router.allowedMethods())
app.listen(3001)
console.log(`listening on port 3001`)