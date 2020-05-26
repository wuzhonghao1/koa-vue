/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-26 10:56:11
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-26 11:52:15
 * @FilePath: \koaitem\routes\city.js
 */
const Router = require('koa-router')
const cityController = require('../controller/city')

const router = new Router({
    prefix: '/city'
});

router.get('/all', cityController.getAllCity)

module.exports = router;