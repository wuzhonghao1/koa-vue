/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-02 15:00:19
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-02 15:13:50
 * @FilePath: \koa-vue\koaitem\controller\order.js
 */
//引入db配置
const db = require('../config/db')
//引入sequelize对象
const Sequelize = db.sequelize
const Op = db.SequelizeOrigin.Op;
//解析token
const tools = require('../public/javascripts/tool')
//引入数据表模型
const order = Sequelize.import('../module/order')

class orderModule {
    static async getAllorders() {
        return await order.findAll()
    }
}
class orderController {
    static async getAllorders(ctx) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getAllorders = await orderModule.getAllorders();
                if (!getAllorders) {
                    return ctx.body = {
                        code: '-1',
                        desc: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getAllorders,
                        code: '000000',
                        desc: '获取订单商品信息成功'
                    }
                }
            } catch (error) {
                console.log(error);
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
    }
}
module.exports = orderController;