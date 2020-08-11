/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-02 15:05:37
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-08-11 11:23:07
 * @FilePath: \koa-vue\koaitem\routes\store.js
 */
const Router = require('koa-router')
const storeController = require('../controller/store')

const router = new Router();

router.post('/store', storeController.getAllstores)

router.get('/store/:id', storeController.getOneStore)

module.exports = router;