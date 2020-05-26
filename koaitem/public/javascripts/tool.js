/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-19 15:23:46
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-19 15:23:46
 * @FilePath: \koaitem\public\javascripts\tool.js
 */
const getToken = require('jsonwebtoken')

exports.verToken = function (token) {
    return new Promise((resolve, rejece) => {
        const info = getToken.verify(token.split(' ')[1], "123456");
        resolve(info);
    })
}