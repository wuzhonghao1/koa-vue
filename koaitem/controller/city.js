/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-26 10:59:08
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-26 12:05:31
 * @FilePath: \koaitem\controller\city.js
 */
//引入db配置
const db = require('../config/db')
//引入sequelize对象
const Sequelize = db.sequelize
//解析token
const tools = require('../public/javascripts/tool')
//引入数据表模型
const city = Sequelize.import('../module/city')


class cityModule {
    static async getAllCity() {
        return await city.findAll({});
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
                console.log('result', result);

                const getAllCity = await cityModule.getAllCity();
                console.log(getAllCity);
                if (!getAllCity) {
                    return ctx.body = {
                        code: '-1',
                        desc: '参数错误'
                    }
                } else {
                    return ctx.body = {
                        code: '000000',
                        desc: '获取用户信息成功'
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
        // } else {
        //     ctx.response.status = 416;
        //     ctx.body = {
        //         code: -1,
        //         desc: '请填写正确参数'
        //     }
        // }
    }
}
module.exports = cityController;