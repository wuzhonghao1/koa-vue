/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-01 16:39:36
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-08-11 11:40:26
 * @FilePath: \koa-vue\koaitem\controller\store.js
 */
//引入db配置
const db = require('../config/db')
//引入sequelize对象
const Sequelize = db.sequelize
const Op = db.SequelizeOrigin.Op;
//解析token
const tools = require('../public/javascripts/tool')
//引入数据表模型
const store = Sequelize.import('../module/store')

class storeModule {
    static async getAllstores(req) {
        let pageSize = req.pageSize
        let pageNum = req.pageNum
        return await store.findAll({
            offset: pageSize * (pageNum - 1),
            order: [['id']],
            limit: pageSize
        })
    }
    static async getOneStore(id) {
        console.log(id);
        return await store.findOne({
            where: {
                id
            }
        })
    }
}
class storeController {
    static async getAllstores(ctx) {
        const req = ctx.request.body;
        console.log('req', req);

        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getAllstores = await storeModule.getAllstores(req);
                if (!getAllstores) {
                    return ctx.body = {
                        code: '-1',
                        msg: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getAllstores,
                        code: '000000',
                        msg: '获取店铺信息成功'
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
    static async getOneStore(ctx) {
        const req = ctx.request.body;
        const id = ctx.params.id;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getOneStore = await storeModule.getOneStore(id);
                if (!getOneStore) {
                    return ctx.body = {
                        code: '-1',
                        msg: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getOneStore,
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
module.exports = storeController;