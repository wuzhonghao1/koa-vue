/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-26 11:00:13
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-26 11:13:38
 * @FilePath: \koaitem\module\city.js
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'city',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            is_map: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'is_map'
            },
            longitude: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'longitude',
            },
            latitude: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'latitude',
            },
            sort: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'sort',
            },
            area_code: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'area_code',
            },
            abbr: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'abbr',
            },
            pinyin: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'pinyin',
            },
        },
        {
            timestamps: false
        }
    );
}