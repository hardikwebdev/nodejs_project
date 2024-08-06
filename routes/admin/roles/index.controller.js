const Category = require("../../../models").Category;
const Subcategory = require("../../../models").Subcategory;
const Roles = require("../../../models").Roles;
const Users = require("../../../models").Users;
const sequelize = require("../../../models").sequelize;
let Sequelize = require("sequelize");
const Op = Sequelize.Op;
let bcrypt = require("bcryptjs");
const moment = require('moment');
let _ = require('underscore');
let multer = require('multer');
let fs = require('fs');

module.exports.rolesList = async function (req, res, next) {
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

    let wheres = {};

    if (query.search) {
        wheres[Op.or] = [
            { name: { [Op.substring]: query.search } },
        ];
    }

    if (query.status) {
        wheres[Op.or] = [{
            status: query.status
        }]
    }

    await Roles.findAndCountAll({
        where: wheres,
        limit: limit,
        offset: offset,
        order: [[sortBy, sortOrder]]
    }).then(data => {
        return ReS(res, "Roles fetched successfully.", {
            payload: {
                data: { count: data.count, rows: data.rows }
            }
        });
    }).catch(err => {
        return ReE(res, err, 400);
    });

};

module.exports.addRole = async function (req, res, next) {
    let postdata = req.body;
    postdata.status = 1;

    await Roles.findOne({
        where: {
            name: postdata.name
        }
    }).then(async (found) => {
        if (found) {
            return ReE(res, "Role already exist with same name!");
        } else {
            await Roles.create(postdata).then(result => {
                if (result) {
                    return ReS(res, "Role created successfully!");
                } else {
                    return ReE(res, "Failed to create role!");
                }
            });
        }
    }).catch(err => {
        return ReE(res, err, 400);
    });

}

module.exports.editRole = async function (req, res, next) {
    let postdata = req.body;

    let wheres = {}; let wheres = {};
    if (postdata.name === undefined && postdata.type === "updateStatus") {
        wheres = { id: postdata.id }

        await Roles.update(postdata, {
            where: {
                id: postdata.id
            }
        }).then((updated) => {
            if (updated) {
                return ReS(res, "Role updated successfully!");
            } else {
                return ReE(res, "Failed to update role!", 400);
            }
        }).catch(err => {
            return ReE(res, err, 400);
        });
    } else {
        wheres = {
            id: { [Op.ne]: postdata.id },
            name: postdata.name
        }

        await Roles.findOne({
            where: wheres
        }).then(async (found) => {
            if (found) {
                return ReE(res, "Failed to update role as role already exist with same name!");
            } else {

                await Roles.update(postdata, {
                    where: {
                        id: postdata.id
                    }
                }).then((updated) => {
                    if (updated) {
                        return ReS(res, "Role updated successfully!");
                    } else {
                        return ReE(res, "Failed to update role!", 400);
                    }
                }).catch(err => {
                    return ReE(res, err, 400);
                });
            }
        }).catch(err => {
            return ReE(res, err, 400);
        });
    }

}

module.exports.deleteRole = async function (req, res, next) {
    let postdata = req.body;

    let users = await Users.findOne({
        where: {
            role_id: postdata.id
        }
    });

    if (users) {
        return ReE(res, "Failed to delete role as role is associated to user!", 400);
    } else {
        await Roles.update({
            deletedAt: new Date()
        }, {
            where: {
                id: postdata.id
            }
        }).then((updated) => {
            if (updated) {
                return ReS(res, "Role deleted successfully!");
            } else {
                return ReE(res, "Failed to delete role!", 400);
            }
        }).catch(err => {
            return ReE(res, err, 400);
        });
    }

}

module.exports.getAllRoles = async function (req, res, next) {

    await Roles.findAndCountAll({
        attributes: ['id', 'name'],
        where: { status: 1 }
    }).then(data => {
        return ReS(res, "Roles fetched successfully.", {
            payload: {
                data: { count: data.count, rows: data.rows }
            }
        });
    }).catch(err => {
        return ReE(res, err, 400);
    });

};