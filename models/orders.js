"use strict";
let controller = require("../helpers/index");

module.exports = (sequelize, DataTypes) => {
    let Orders = sequelize.define(
        "Orders",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            project_id: DataTypes.INTEGER,
            outlet_id: DataTypes.INTEGER,
            visitation_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            status: DataTypes.TINYINT, // 0: Pending, 1: Completed, 2: Cancelled
            isEffective: DataTypes.TINYINT, //0: No, 1: Yes
            isFree: DataTypes.TINYINT, //0: No, 1: Yes
            isVerified: DataTypes.TINYINT, //0: No, 1: Yes
            description: DataTypes.STRING,
            gender: DataTypes.STRING,
            age_group: DataTypes.STRING,
            group_segment: DataTypes.STRING,
            brands_variant: DataTypes.STRING,
            effective_name: DataTypes.STRING,
            effective_email: DataTypes.STRING,
            effective_contact: DataTypes.STRING,
            deletedAt: { type: DataTypes.DATE, defaultValue: null }
        },
        {
            freezeTableName: true,
            tableName: "orders",
            paranoid: true,
            getterMethods: {
                brands_variant: function () {
                    let signatureUrl = this.getDataValue('brands_variant');
                    if (signatureUrl) {
                        let baseurl = controller.checkJSON(signatureUrl) ? JSON.parse(signatureUrl) : signatureUrl;
                        return baseurl;
                    } else {
                        return [];
                    }
                },
                project_id: function () {
                    let signatureUrl = this.getDataValue('project_id');
                    if (signatureUrl) {
                        return parseInt(signatureUrl);
                    }
                    else {
                        return "";
                    }
                },
                outlet_id: function () {
                    let signatureUrl = this.getDataValue('outlet_id');
                    if (signatureUrl) {
                        return parseInt(signatureUrl);
                    }
                    else {
                        return "";
                    }
                }
            }
        },
    );


    Orders.associate = function (models) {
        this.id = this.hasMany(models.OrderDetails, {
            foreignKey: "order_id",
            onDelete: 'cascade',
            hooks: true,
        });
        this.project_id = this.belongsTo(models.UserProjects, {
            foreignKey: "project_id"
        });
        this.outlet_id = this.belongsTo(models.Outlets, {
            foreignKey: "outlet_id"
        });
        this.visitation_id = this.belongsTo(models.VisitationHistory, {
            foreignKey: "visitation_id"
        });
        this.project_id = this.belongsTo(models.Projects, {
            foreignKey: "project_id"
        });
        this.user_id = this.belongsTo(models.Users, {
            foreignKey: "user_id"
        });
    };

    return Orders;
};