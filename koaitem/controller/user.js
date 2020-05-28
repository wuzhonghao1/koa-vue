/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-19 15:21:13
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-28 17:37:13
 * @FilePath: \koa-vue\koaitem\controller\user.js
 */
//引入db配置
const db = require('../config/db')
//引入jwt做token验证
const jwt = require('jsonwebtoken')
//引入sequelize对象
const Sequelize = db.sequelize
const Op = db.SequelizeOrigin.Op;
//解析token
const tools = require('../public/javascripts/tool')
//统一设置token有效时间  为了方便观察，设为10s
const expireTime = '1000000s'
//引入数据表模型
const user = Sequelize.import('../module/user')
const city = Sequelize.import('../module/city')
//自动创建表
user.sync({ force: false });

//数据库操作类
class userModule {
    static async userRegist(data) {
        return await user.create({
            password: data.password,
            mobileNo: data.mobileNo,
            status: 1
        })
    }
    static async getUserInfo(mobileNo, status) {
        return await user.findOne({
            where: {
                mobileNo,
                status: status
            }
        })
    }
    static async updateMsg(mobileNo, status) {
        return await user.update({
            status: status
        }, {
            where: {
                mobileNo,
            }
        })
    }
    static async getCity(abbr) {
        return await city.findOne({
            where: {
                name: {
                    [Op.like]: abbr.slice(0, abbr.length)
                }
            }
        });
    }
    static async deleteUser(mobileNo) {
        return await user.destroy({
            where: {
                mobileNo,
            }
        })
    }
    static async completeUserInfo(ctx) {
        const result = await userModule.getCity(ctx.request.body.abbr);
        return await user.update({
            cityId: result.dataValues.id,
            address: ctx.request.body.obj ? ctx.request.body.obj.district + ctx.request.body.obj.name : ctx.request.body.abbr
        }, {
            where: {
                mobileNo: ctx.state.data.user
            }
        })
    }
}
class userController {
    //注册用户
    static async create(ctx) {
        const req = ctx.request.body;
        console.log(req.mobileNo, req.password);
        if (req.mobileNo && req.password) {
            const query0 = await userModule.getUserInfo(req.mobileNo, 0);
            const query1 = await userModule.getUserInfo(req.mobileNo, 1);
            if (query0) {
                ctx.response.status = 200;
                ctx.body = {
                    code: '-2',
                    desc: '用户曾经注册，但是已经注销'
                }
            } else if (query1) {
                ctx.response.status = 200;
                ctx.body = {
                    code: '-1',
                    desc: '用户已注册'
                }
            } else {
                const param = {
                    password: req.password,
                    mobileNo: req.mobileNo,
                    userName: req.mobileNo,
                }
                const data = await userModule.userRegist(param);
                ctx.response.status = 200;
                ctx.body = {
                    code: '000000',
                    desc: '用户注册成功',
                    userInfo: {
                        mobileNo: req.mobileNo
                    }
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: '请填写正确参数'
            }
        }
    }
    //密码登陆
    static async login(ctx) {
        const req = ctx.request.body;
        if (!req.mobileNo || !req.password) {
            return ctx.body = {
                code: '-1',
                msg: '用户名或密码不能为空'
            }
        } else {
            const data = await userModule.getUserInfo(req.mobileNo, 1);
            const query1 = await userModule.getUserInfo(req.mobileNo, 0);
            if (data) {
                if (data.password === req.password) {
                    //生成token，验证登录有效期
                    const token = jwt.sign({
                        user: req.mobileNo,
                        password: req.password
                    }, '123456', { expiresIn: expireTime });
                    const info = {
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        mobileNo: data.mobileNo,
                        userId: data.userId
                    }
                    ctx.body = {
                        code: '000000',
                        token: token,
                        userInfo: JSON.stringify(info),
                        desc: '登陆成功'
                    }
                } else {
                    ctx.body = {
                        code: '-1',
                        desc: '用户密码错误'
                    }
                }
            } else {
                if (query1) {
                    ctx.body = {
                        code: '-1',
                        desc: '该用户已注销'
                    }
                } else {
                    ctx.body = {
                        code: '-1',
                        desc: '该用户尚未注册'
                    }
                }
            }
        };
    }
    //获取用户信息(除密码外)
    static async getUserInfo(ctx) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                if (!req.mobileNo) {
                    return ctx.body = {
                        code: '-1',
                        desc: '参数错误'
                    }
                } else {
                    let data = await userModule.getUserInfo(req.mobileNo, 1);
                    if (req.mobileNo == data.mobileNo) {
                        const info = {
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                            mobileNo: data.mobileNo,
                            userId: data.userId
                        };
                        return ctx.body = {
                            code: '000000',
                            userInfo: JSON.stringify(info),
                            desc: '获取用户信息成功'
                        }
                    }
                }
            } catch (error) {
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    desc: '登陆过期，请重新登陆'
                }
            }
        } else {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
    }
    // 注销（0），重新活跃（1）用户
    static async reactivation(ctx) {
        const req = ctx.request.body
        if (req.mobileNo && req.password) {
            const query0 = await userModule.getUserInfo(req.mobileNo, 0);
            const query1 = await userModule.getUserInfo(req.mobileNo, 1);
            if (req.status) {
                if (query0) {
                    if (req.password === query0.password) {
                        const update = await userModule.updateMsg(req.mobileNo, 1);
                        ctx.response.status = 200;
                        ctx.body = {
                            code: "000000",
                            desc: '重新启用成功'
                        }
                    } else {
                        ctx.response.status = 200;
                        ctx.body = {
                            code: -1,
                            desc: '密码错误，无法重新启用'
                        }
                    }
                } else {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: -1,
                        desc: query1 ? '此用户可以登录，请登录' : '没有此用户，请注册'
                    }
                }
            } else {
                if (query1) {
                    if (req.password === query1.password) {
                        const update = await userModule.updateMsg(req.mobileNo, 0);
                        ctx.response.status = 200;
                        ctx.body = {
                            code: "000000",
                            desc: '注销成功'
                        }
                    } else {
                        ctx.response.status = 200;
                        ctx.body = {
                            code: -1,
                            desc: '密码错误，无法注销'
                        }
                    }
                } else {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: -1,
                        desc: query0 ? '此用户已注销' : '没有此用户，请注册'
                    }
                }
            }
        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: -1,
                desc: req.status ? '请填写重新启用的用户名称和密码' : '请填写要注销的用户名称和密码'
            }
        }
    }
    // 强制删除用户
    static async deleteUser(ctx) {
        const req = ctx.request.body
        if (req.mobileNo && req.password) {
            const query0 = await userModule.getUserInfo(req.mobileNo, 0);
            const query1 = await userModule.getUserInfo(req.mobileNo, 1);
            if (query0 || query1) {
                const data = await userModule.deleteUser(req.mobileNo)
                ctx.response.status = 200;
                ctx.body = {
                    code: '000000',
                    desc: '用户删除成功'
                }
            } else {
                ctx.response.status = 200;
                ctx.body = {
                    code: -1,
                    desc: '没有此用户'
                }
            }
        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: -1,
                desc: '请输入要删除的用户名和密码'
            }
        }

    }
    // 更新用户信息(地址)
    static async completeUserInfo(ctx) {
        let query = await userModule.completeUserInfo(ctx);
        if (query) {
            ctx.response.status = 200;
            ctx.body = {
                code: '000000',
                desc: '用户修改成功'
            }
        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: 1,
                desc: '更新失败'
            }
        }
    }
}

module.exports = userController;