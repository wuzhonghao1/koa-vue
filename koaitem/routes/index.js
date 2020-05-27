/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-19 15:16:22
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-27 16:15:26
 * @FilePath: \koa-vue\koaitem\routes\index.js
 */
const os = require("os");
const router = require('koa-router')()
//解析token
const tools = require('../public/javascripts/tool')

let networkInterfaces = os.networkInterfaces();
let ip = networkInterfaces['WLAN'][0].address;

router.get('/belongCity', async (ctx, next) => {
	const token = ctx.headers.authorization;
	if (token) {
		try {
			const result = await tools.verToken(token);
			if (!ip) {
				return ctx.body = {
					code: '-1',
					desc: '参数错误'
				}
			} else {
				return ctx.body = {
					data: id,
					code: '000000',
					desc: '获取ip成功'
				}
			}
		} catch (error) {
			ctx.status = 401;
			return ctx.body = {
				code: '-1',
				desc: '登陆过期，请重新登陆1'
			}
		}
	} else {
		ctx.status = 401;
		return ctx.body = {
			code: '-1',
			desc: '登陆过期，请重新登陆2'
		}
	}
})

module.exports = router
