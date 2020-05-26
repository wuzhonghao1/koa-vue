/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-19 15:26:58
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-26 10:57:32
 * @FilePath: \koaitem\routes\user.js
 */
const Router = require('koa-router');
const userController = require('../controller/user')

const router = new Router({
    prefix: '/user'
});

//用户注册
router.post('/regist', userController.create)

//密码登陆
router.post('/login', userController.login)

//获取用户信息
router.post('/getUserInfo', userController.getUserInfo)

//注销，重新激活用户
router.post('/reactivation', userController.reactivation)

//删除用户
router.post('/deleteUser', userController.deleteUser)

module.exports = router;