"use strict";
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      system_id: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      contact_number: DataTypes.STRING,
      profile_picture: DataTypes.TEXT('long'),
      qr_code: DataTypes.TEXT('long'),
      resetToken: DataTypes.STRING,
      last_login: DataTypes.DATE,
      is_verified: DataTypes.TINYINT, // 0: No, 1: Yes
      status: DataTypes.TINYINT, // 0: Pending/Inactive, 1: Active   
      role_id: DataTypes.TINYINT, // 0: admin, 1: supervisor, 2: Other user
      deletedAt: { type: DataTypes.DATE, defaultValue: null }
    },
    {
      freezeTableName: true,
      tableName: "users",
      paranoid: true,
      getterMethods: {
        profile_picture: function () {
          let signatureUrl = this.getDataValue('profile_picture');
          if (signatureUrl) {
            let baseurl = CONFIG.LIVE_IMAGE_URL_PATH + 'media/thumbnail/';
            return baseurl + signatureUrl;
          }
          return signatureUrl ? signatureUrl : '';
        },
        qr_code: function () {
          let signatureUrl = this.getDataValue('qr_code');
          let all = [];
          if (signatureUrl) {
            let allImage = JSON.parse(signatureUrl);
            for (let i = 0; i < allImage.length; i++) {
              let baseurl = CONFIG.LIVE_IMAGE_URL_PATH + 'media/thumbnail/';
              all.push({ url: baseurl + allImage[i] });
            }
          }
          return all?.length > 0 ? all : [];
        }
      }
    },
  );

  Users.associate = function (models) {
    this.user_id = this.hasMany(models.UserProjects, {
      foreignKey: "user_id",
      onDelete: 'cascade',
      hooks: true,
    });
    this.user_id = this.hasMany(models.LoginHistory, {
      foreignKey: "user_id",
      onDelete: 'cascade',
      hooks: true,
    });
    this.user_id = this.hasMany(models.Notifications, {
      foreignKey: "user_id",
      onDelete: 'cascade',
      hooks: true,
    });
    this.role_id = this.belongsTo(models.Roles, {
      foreignKey: "role_id"
    });
    this.user_id = this.hasMany(models.Orders, {
      foreignKey: "user_id",
      onDelete: 'cascade',
      hooks: true,
    });
  }

  Users.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    delete json["password"];
    return json;
  };

  Users.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return (
      "Bearer " +
      jwt.sign({ id: this.id }, CONFIG.jwt_encryption_admin, {
        expiresIn: expiration_time
      })
    );
  };

  return Users;
};