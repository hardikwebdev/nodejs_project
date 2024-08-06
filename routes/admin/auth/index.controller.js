const sequelize = require("../../../models").sequelize;
let Sequelize = require("sequelize");
const Op = Sequelize.Op;
const fs = require("fs");
let _ = require('underscore');
let moment = require("moment-timezone");
let bcrypt = require("bcryptjs");
let Users = require("../../../models").Users;
const transporter = require("../../../config/nodemailer").transporter;


module.exports.login = async function (req, res, next) {
    let postdata = req.body;
    req.checkBody({
        'email': {
            notEmpty: true,
            isEmail: true,
            errorMessage: 'email is required'
        },
        'password': {
            notEmpty: true,
            errorMessage: 'Password is required',
            isLength: {
                options: { min: 8, max: 20 },
                errorMessage: 'Password must be at least 8 chars long'
            }
        }
    });

    let errors = req.validationErrors();

    if (errors) {
        return ReE(res, errors, 400);
    }

    Users.findOne({
        where: {
            email: postdata.email
        }
    }).then(user => {
        if (!user) {
            return ReE(res, "User not found.");
        }

        if (user.status != 1) {
            return ReE(res, "You haven't activate your account.");
        }

        if (user.role_id != 0) {
            return ReE(res, "You are not authorized user.");
        }

        bcrypt
            .compare(postdata.password, user.password)
            .then(async function (result) {
                if (result == true) {
                    // let userreturn = user.toWeb();
                    let token = user.getJWT();
                    req.session.sessionexpiretime = CONFIG.jwt_expiration;
                    req.session.user = { ...user.toWeb(), token: token };
                    return ReS(res, "", {
                        payload: {
                            ...user.toWeb(),
                            token: token
                        }
                    });
                } else {
                    return ReE(res, "You have entered wrong password.");
                }
            })
            .catch(err => {
                return ReE(res, err, 400);
            });
    });
}

module.exports.logout = async function (req, res, next) {
    if (req.user) {
        req.logout();
        return ReS(res, "Logout Successfull.");
    } else {
        return ReE(res, "No logged in user found.", 400);
    }
}

module.exports.forgotPassword = async function (req, res, next) {
    let postdata = req.body;

    let user = await Users.findOne({
        where: {
            email: postdata.email
        }
    }).catch(err => {
        return ReE(res, err, 400);
    });

    if (user) {
        let token = bcrypt.hashSync(user.id + user.name + CONFIG.jwt_encryption_admin, 15);

        await Users.update({
            resetToken: token
        }, {
            where: {
                email: postdata.email
            }
        }).then(updated => {
            if (updated == 1) {
                let url = CONFIG.BASE_URL + '/admin/changePassword';
                let mailOptions = {
                    from: CONFIG.welcomeemail,
                    to: postdata.email,
                    template: 'password-reset',
                    subject: "Apppp Reset Password",
                    context: {
                        fullName: user.fullname,
                        redirectUrl: url + '?email=' + postdata.email + '&resetToken=' + token
                    }
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (!error) {
                        return ReS(res, "Reset password email sent! Please check your email to continue.");
                    } else {
                        return ReE(res, "Failed to sent email!", 400);
                    }
                });

            }
            else {
                return ReE(res, "Failed to sent email!", 400);
            }
        }).catch(err => {
            return ReE(res, err, 400);
        });

    } else {
        return ReE(res, 'User not exists with this email address.', 400);
    }

}

module.exports.changePassword = async function (req, res, next) {
    let postdata = req.body;

    let password = bcrypt.hashSync(postdata.password, 10);
    await Users.update({
        password, resetToken: null
    }, {
        where: {
            email: postdata.email,
            resetToken: postdata.token
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

