const passport = require('passport');
let Sequelize = require("sequelize");

const SubscribedUser = require("../models").SubscribedUser;


module.exports.AuthMiddleware = function (req, res, next) {

    require('./passport').UserAuth(passport);

    passport.authenticate('jwt', async function (err, user, info) {

        if (!user) {
            if (info) {
                return ReE(res, "Token expired!", 401);
            }

            return ReE(res, "Token expired!", 401);
        }
        let userreturn = user.toWeb();
        if (user.role_id != 0 && user.status == 1) {
            req.user = { ...userreturn, ...req.session.user };
            return next();
        } else if (user.status == 0) {
            return ReE(res, "Your account is deactivated! Kindly contact administrator.", 401);
        } else {
            return ReE(res, "Unauthorised user", 401);
        }


    })(req, res, next);
};