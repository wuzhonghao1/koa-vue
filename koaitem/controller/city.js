/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-26 10:59:08
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-01 16:42:30
 * @FilePath: \koa-vue\koaitem\controller\city.js
 */
//引入db配置
const db = require('../config/db')
//引入sequelize对象
const Sequelize = db.sequelize
const Op = db.SequelizeOrigin.Op;
//解析token
const tools = require('../public/javascripts/tool')
//引入数据表模型
const city = Sequelize.import('../module/city')

class cityModule {
    static async getAllCity() {
        return await city.findAll({});
    }
    static async getComCity(abbr) {
        return await city.findAll({
            order: [['abbr', 'DESC']],
            where: {
                abbr: {
                    [Op.like]: '%' + abbr + '%'
                }
            }
        });
    }
    static async getHotCity() {
        return await city.findAll({
            where: {
                is_hot: '1'
            }
        });
    }
}

class cityController {
    //获取全部的城市信息
    static async getAllCity(ctx) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getAllCity = await cityModule.getAllCity();
                console.log(getAllCity);
                if (!getAllCity) {
                    return ctx.body = {
                        code: '-1',
                        desc: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getAllCity,
                        code: '000000',
                        desc: '获取城市信息成功'
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
    //获取模糊的的城市信息
    static async getComCity(ctx) {
        const id = ctx.params.id;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getComCity = await cityModule.getComCity(id);
                if (!getComCity) {
                    return ctx.body = {
                        code: '-1',
                        desc: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getComCity,
                        code: '000000',
                        desc: '获取城市信息成功'
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
    //获取模糊的的城市信息
    static async getHotCity(ctx) {
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                const getHotCity = await cityModule.getHotCity();
                if (!getHotCity) {
                    return ctx.body = {
                        code: '-1',
                        desc: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        data: getHotCity,
                        code: '000000',
                        desc: '获取热门城市信息成功'
                    }
                }
            } catch (error) {
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
module.exports = cityController;