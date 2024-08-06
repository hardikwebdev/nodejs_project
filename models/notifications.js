"use strict";

module.exports = (sequelize, DataTypes) => {
    let Notifications = sequelize.define(
        "Notifications",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            data: DataTypes.STRING,
            isRead: DataTypes.TINYINT, // 0: No, 1: Yes
            deletedAt: { type: DataTypes.DATE, defaultValue: null }
        },
        {
            freezeTableName: true,
            tableName: "notifications",
            paranoid: true
        },
    );
    
    Notifications.associate = function (models) {
        this.id = this.belongsTo(models.Users, {
            foreignKey: "user_id"
        });
    };

    return Notifications;
};