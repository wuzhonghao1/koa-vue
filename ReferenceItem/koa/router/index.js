/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-18 09:49:49
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-19 15:07:55
 * @FilePath: \koa\router\index.js
 */
const router = require('koa-router')();
const queryWay = require("../config/mysql/mysql")
// 封装返回结果
let encapsulation = (resData) => {
    let body;
    if (resData.constructor === Array) {
        body = {
            resultCode: '000000',
            resultMessage: '成功',
            data: resData
        }
    } else {
        body = {
            resultCode: '999999',
            resultMessage: '失败',
            data: resData
        }
    }
    return body
}
// 获取全部的城市信息 code取值大写的26个英文字母
router.get('/address/:code', async (ctx) => {
    let resData
    await queryWay.queryAddress(ctx.params.code).then(res => {
        resData = res ? res : '返回数据失败'
    })
    ctx.body = encapsulation(resData)
})










module.exports = router