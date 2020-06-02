/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-02 15:01:59
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-02 15:02:29
 * @FilePath: \koa-vue\koaitem\module\shopingCart.js
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'shopingCart',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'userId'
            },
            goodId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'goodId'
            },
        },
        {
            timestamps: false
        }
    )
}