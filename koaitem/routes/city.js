/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-26 10:56:11
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-26 18:17:45
 * @FilePath: \koa-vue\koaitem\routes\city.js
 */
const Router = require('koa-router')
const cityController = require('../controller/city')

const router = new Router();

router.get('/cities', cityController.getAllCity)

module.exports = router;