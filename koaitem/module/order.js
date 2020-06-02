/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-02 15:00:19
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-02 15:01:45
 * @FilePath: \koa-vue\koaitem\module\order.js
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'order',
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
            goodNum: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'goodNum'
            },
            orderPrice: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'orderPrice'
            },

        },
        {
            timestamps: false
        }
    )
}