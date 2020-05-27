/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-21 10:43:00
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-27 16:31:34
 * @FilePath: \koa-vue\koaitem\basicOperation.js
 * @http https://itbilu.com/nodejs/npm/sequelize-docs-v5.html
 */
const Op = Sequelize.Op;

Post.findAll({
    where: {
        authorId: 2
    }
});
// SELECT * FROM post WHERE authorId = 2

Post.findAll({
    where: {
        authorId: 12,
        status: 'active'
    }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';

Post.findAll({
    where: {
        [Op.or]: [{ authorId: 12 }, { authorId: 13 }]
    }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;

Post.findAll({
    where: {
        authorId: {
            [Op.or]: [12, 13]
        }
    }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;

Post.destroy({
    where: {
        status: 'inactive'
    }
});
// DELETE FROM post WHERE status = 'inactive';

Post.update({
    updatedAt: null,
}, {
    where: {
        deletedAt: {
            [Op.ne]: null
        }
    }
});
// UPDATE post SET updatedAt = null WHERE deletedAt NOT NULL;

Post.findAll({
    where: sequelize.where(sequelize.fn('char_length', sequelize.col('status')), 6)
});
// SELECT * FROM post WHERE char_length(status) = 6;






// Node sequelize 查询参数详解
// const Op = Sequelize.Op

// [Op.and]: {a: 5}           // AND (a = 5)
// [Op.or]: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
// [Op.gt]: 6,                // > 6
// [Op.gte]: 6,               // >= 6
// [Op.lt]: 10,               // < 10
// [Op.lte]: 10,              // <= 10
// [Op.ne]: 20,               // != 20
// [Op.eq]: 3,                // = 3
// [Op.not]: true,            // IS NOT TRUE
// [Op.between]: [6, 10],     // BETWEEN 6 AND 10
// [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
// [Op.in]: [1, 2],           // IN [1, 2]
// [Op.notIn]: [1, 2],        // NOT IN [1, 2]
// [Op.like]: '%hat',         // LIKE '%hat'
// [Op.notLike]: '%hat'       // NOT LIKE '%hat'
// [Op.iLike]: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
// [Op.notILike]: '%hat'      // NOT ILIKE '%hat'  (PG only)
// [Op.regexp]: '^[h|a|t]'    // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
// [Op.notRegexp]: '^[h|a|t]' // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
// [Op.iRegexp]: '^[h|a|t]'    // ~* '^[h|a|t]' (PG only)
// [Op.notIRegexp]: '^[h|a|t]' // !~* '^[h|a|t]' (PG only)
// [Op.like]: { [Op.any]: ['cat', 'hat']}
//                        // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
// [Op.overlap]: [1, 2]       // && [1, 2] (PG array overlap operator)
// [Op.contains]: [1, 2]      // @> [1, 2] (PG array contains operator)
// [Op.contained]: [1, 2]     // <@ [1, 2] (PG array contained by operator)
// [Op.any]: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)