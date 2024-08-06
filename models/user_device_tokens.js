"use strict";

module.exports = (sequelize, DataTypes) => {
    let UserDeviceToken = sequelize.define(
        "UserDeviceToken",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            device_token: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
            device_type: DataTypes.STRING,
            deletedAt: { type: DataTypes.DATE, defaultValue: null }
        },
        {
            freezeTableName: true,
            tableName: "user_device_token",
            paranoid: true
        },
    );

    UserDeviceToken.associate = function (models) {
        this.id = this.belongsTo(models.Users, {
          foreignKey: "user_id"
        });
      }

    return UserDeviceToken;
};