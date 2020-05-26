/*
 * @Author: ZhongHao Wu
 * @Date: 2020-05-21 10:43:00
 * @LastEditors: ZhongHao Wu
 * @LastEditTime: 2020-05-26 11:07:03
 * @FilePath: \koaitem\basicOperation.js
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