/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-02 14:56:51
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-02 15:00:01
 * @FilePath: \koa-vue\koaitem\module\store.js
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'store',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            storeName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'storeName'
            },
            master: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'master'
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'address'
            },
            mainShop: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'mainShop'
            },
            payNum: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'payNum'
            },
            highPraise: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'highPraise'
            },
            imgSrc: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'imgSrc'
            },

        },
        {
            timestamps: false
        }
    )
}