/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-01 16:43:10
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-08-11 17:47:56
 * @FilePath: \koa-vue\koaitem\routes\good.js
 */
const Router = require('koa-router')
const goodController = require('../controller/good')

const router = new Router();

router.get('/good', goodController.getAllGoods)

router.get('/good/:id', goodController.getOneGood)

router.post('/shop', goodController.getStoreGoods)

module.exports = router;