/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-16 19:30:10
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-19 15:07:03
 * @FilePath: \koa\config\mysql\mysql.js
 */
/*
准备工作：
1.创建地址表，并插入全国的地址信息（数据自己准备）数据形式 （addressData）
*/
const mysql = require('mysql');
const config = require('./default.js')
// const addressData = require("../../data/index")
const pool = mysql.createPool({
    host: config.HOST,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    port: config.PORT
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log('成功')
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}
// 查询所有的地址信息
exports.queryAddress = (value) => {
    let _sql = value ? `select * from address where abbr like "${value}%"` : `select * from address`
    return query(_sql)
}


// 创建地址表
// let post = `create table if not exists address(
//      id INT NOT NULL AUTO_INCREMENT,
//      name VARCHAR(100) COMMENT '地址名称',
//      is_map VARCHAR(100) COMMENT '是否在地图上',
//      longitude VARCHAR(100) COMMENT '经度',
//      latitude VARCHAR(100) COMMENT '纬度',
//      sort VARCHAR(100) COMMENT '类型',
//      area_code VARCHAR(100) COMMENT '地区编码',
//      abbr VARCHAR(200) COMMENT '地址简称',
//      pinyin VARCHAR(100) COMMENT '拼音',
//      PRIMARY KEY(id)
//     );`
// query(post)


// 向地址表中插入全国的地址信息
// let insert = `insert into address set pinyin=?,is_map=?,longitude=?,latitude=?,sort=?,area_code=?,abbr=?,name=?,id=?;`
// let values = [];
// addressData.data.forEach(function (n, i) {
//     var _arr = [];
//     for (var m in n) {
//         _arr.push(n[m]);
//     }
//     values.push(_arr);
// })
// for (let i = 0; i < addressData.data.length; i++) {
//     query(insert, values[i])
// }
