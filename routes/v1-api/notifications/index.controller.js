const Users = require("../../../models").Users;
const Notifications = require("../../../models").Notifications;
// let notificationEvents = require("../../../events/notificationEvents").notificationEmitter;
let Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getList = async function (req, res, next) {
    let query = req.query;

    let sortBy = query.sortBy ? query.sortBy : "createdAt";
    req.query.sortBy = sortBy;
    let sortOrder = query.sortOrder ? query.sortOrder : "DESC";
    req.query.sortOrder = sortOrder;

    let limit = 10;
    let offset = 0;

    if (
        query.limit &&
        parseInt(query.limit) > 0 &&
        parseInt(query.limit) <= 100
    ) {
        limit = parseInt(query.limit);
    }

    if (query.page && parseInt(query.page) > 0 &&
        parseInt(query.page) <= 100) {
        offset = limit * (parseInt(query.page) - 1);
    }

    await Notifications.findAndCountAll({
        where: { user_id: req.user.id },
        limit: limit,
        offset: offset,
        order: [[sortBy, sortOrder]],
    }).then(async data => {
        await Notifications.update({ isRead: 1 }, {
            where: {
                user_id: parseInt(req.user.id),
                isRead: 0
            }
        }).then(updated => console.log(updated)).catch(err => console.log(err));
        return ReS(res, "Notifications fetched successfully.", {
            payload: {
                data: { count: data.count, rows: data.rows }
            }
        });
    }).catch(err => {
        return ReE(res, err, 400);
    });

};