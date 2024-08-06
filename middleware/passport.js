const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Users = require("../models").Users;

const UserAuth = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption_admin;

  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {      
      Users.findByPk(jwt_payload.id)
        .then(agent => {          
          if (!agent) {
            done("User Not Found", false);
          }
          done(null, agent);
        });
    })
  );
};

module.exports.UserAuth = UserAuth;
