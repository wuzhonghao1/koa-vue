/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-19 15:18:37
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-27 10:42:48
 * @FilePath: \koa-vue\koaitem\config\db.js
 */
var Sequelize = require("sequelize")
var sequelize = new Sequelize('nodesql', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: true,
    dialectOptions: {
        //字符集
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00',  //东八时区
});
var SequelizeOrigin = Sequelize

module.exports = {
    sequelize,
    SequelizeOrigin
};