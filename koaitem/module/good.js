/*
 * @Author: ZhongHao Wu
 * @Date: 2020-06-01 16:33:24
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-01 16:50:50
 * @FilePath: \koa-vue\koaitem\module\good.js
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'good',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'price'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            imgSrc: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'imgSrc',
                defaultValue: true
            },
            appraise: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'appraise',
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'type',
            },
            payNum: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'payNum',
            },
        },
        {
            timestamps: false
        }
    )

}