const sequelize = require("../../../models").sequelize;
let Sequelize = require("sequelize");
const Op = Sequelize.Op;
const fs = require("fs");
let _ = require('underscore');
let moment = require("moment-timezone");
let bcrypt = require("bcryptjs");
let Users = require("../../../models").Users;
let UpdateLog = require("../../../models").UpdateLog;

module.exports.getUser = async function (req, res, next) {
    let id = req.user && req.user.id;

    let user = await Users.findOne({
        where: { id: id },
    }).catch(err => {
        return ReE(res, err, 400);
    });

    if (user) {
        let token = user.getJWT();
        return ReS(res, "", {
            payload: {
                ...user.toWeb(),
                token: token
            }
        });
    } else {
        return ReE(res, "User not found.", 400);
    }
}

module.exports.updatePassword = async function (req, res, next) {
    let postdata = req.body;

    let password = bcrypt.hashSync(postdata.password, 10);
    await Users.update({
        password,
    }, {
        where: {
            id: req.user.id, email: postdata.email
        }
    }).then(updated => {
        if (updated == 1) {
            return ReS(res, "Password updated successfully!");
        } else {
            return ReE(res, "Failed to update password!", 400);
        }
    }).catch(err => {
        return ReE(res, err, 400);
    })
}

module.exports.editUser = async function (req, res, next) {
    let postdata = req.body;

    let userExist = await Users.findOne({
        where: {
            id: { [Op.ne]: req.user.id },
            email: postdata.email,
            username: postdata.username
        }
    }).catch(err => { });

    if (!userExist) {

        await Users.update(postdata, {
            where: { id: req.user.id, email: postdata.email, },
        }).then((updated) => {
            return ReS(res, "Profile updated successfully.");
        }).catch(err => {
            return ReE(res, err, 400);
        });
    } else {
        return ReE(res, "Failed to update user as user already exist with same email address or username!", 400);
    }

}