/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-02 15:07:22
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-02 15:08:01
 * @FilePath: \koa-vue\koaitem\routes\shopingCart.js
 */
const Router = require('koa-router')
const shopingCartController = require('../controller/shopingCart')

const router = new Router();

router.get('/shopingCart', shopingCartController.getAllshopingCarts)

module.exports = router;