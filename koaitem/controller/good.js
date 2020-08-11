/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-01 16:39:36
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-08-11 17:49:18
 * @FilePath: \koa-vue\koaitem\controller\good.js
 */
//引入db配置
const db = require('../config/db')
//引入sequelize对象
const Sequelize = db.sequelize
const Op = db.SequelizeOrigin.Op;
//解析token
const tools = require('../public/javascripts/tool')
//引入数据表模型
const good = Sequelize.import('../module/good')

class goodModule {
    static async getAllGoods() {
        return await good.findAll({
            where: {
                id: {
                    [Op.between]: [15, 25]
                },

            }
        })
    }
    static async getOneGood(id) {
        return await good.findOne({
            where: {
                id
            }
        })
    }
    static async getStoreGoods(req) {
        let pageSize = req.pageSize
        let pageNum = req.pageNum
        let storeId = req.storeId
        return await good.findAll({
            where: {
                storeId
            },
            offset: pageSize * (pageNum - 1),
            order: [['id']],
            limit: pageSize
        })
    }
}
class goodController {
    static async getAllGoods(ctx) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getAllGoods = await goodModule.getAllGoods();
                if (!getAllGoods) {
                    return ctx.body = {
                        code: '-1',
                        msg: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getAllGoods,
                        code: '000000',
                        msg: '获取商品信息成功'
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
    static async getOneGood(ctx) {
        const req = ctx.request.body;
        const id = ctx.params.id;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getOneGood = await goodModule.getOneGood(id);
                if (!getOneGood) {
                    return ctx.body = {
                        code: '-1',
                        msg: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getOneGood,
                        code: '000000',
                        msg: '获取商品信息成功'
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
    static async getStoreGoods(ctx) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getStoreGoods = await goodModule.getStoreGoods(req);
                if (!getStoreGoods) {
                    return ctx.body = {
                        code: '-1',
                        msg: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getStoreGoods,
                        code: '000000',
                        msg: '获取商品信息成功'
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
module.exports = goodController;