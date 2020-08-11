/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-02 15:00:19
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-02 15:13:30
 * @FilePath: \koa-vue\koaitem\controller\shopingCart.js
 */
//引入db配置
const db = require('../config/db')
//引入sequelize对象
const Sequelize = db.sequelize
const Op = db.SequelizeOrigin.Op;
//解析token
const tools = require('../public/javascripts/tool')
//引入数据表模型
const shopingCart = Sequelize.import('../module/shopingCart')

class shopingCartModule {
    static async getAllshopingCarts() {
        return await shopingCart.findAll()
    }
}
class shopingCartController {
    static async getAllshopingCarts(ctx) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getAllshopingCarts = await shopingCartModule.getAllshopingCarts();
                if (!getAllshopingCarts) {
                    return ctx.body = {
                        code: '-1',
                        msg: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getAllshopingCarts,
                        code: '000000',
                        msg: '获取购物车商品信息成功'
                    }
                }
            } catch (error) {
                console.log(error);
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    msg: '登陆过期，请重新登陆1'
                }
            }
        } else {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                msg: '登陆过期，请重新登陆2'
            }
        }
    }
}
module.exports = shopingCartController;