/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-02 15:06:34
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-02 15:08:13
 * @FilePath: \koa-vue\koaitem\routes\order.js
 */
const Router = require('koa-router')
const orderController = require('../controller/order')

const router = new Router();

router.get('/order', orderController.getAllorders)

module.exports = router;