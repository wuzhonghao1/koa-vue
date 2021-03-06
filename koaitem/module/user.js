/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-19 15:20:19
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-06-02 14:57:49
 * @FilePath: \koa-vue\koaitem\module\user.js
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            mobileNo: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'mobileNo'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password'
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'status',
                defaultValue: true
            },
            cityId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'cityId',
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'address',
            },
        },
        {
            timestamps: false
        }
    );
}