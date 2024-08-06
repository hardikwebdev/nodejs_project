const passport = require('passport');
let Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.AuthMiddleware = function (req, res, next) {

    require('./passport').UserAuth(passport);

    passport.authenticate('jwt', async function (err, user, info) {

        if (!user) {
            if (info) {
                return ReE(res, info.message, 401);
            }

            return ReE(res, err, 401);
        }
        let userreturn = user.toWeb();
        if (user.role_id == 0) {
            req.user = {...userreturn, ...req.session.user};
            return next();
        } else {
            return ReE(res, "Unauthorised user", 401);
        }


    })(req, res, next);
};