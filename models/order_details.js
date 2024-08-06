"use strict";

module.exports = (sequelize, DataTypes) => {
    let OrderDetails = sequelize.define(
        "OrderDetails",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            order_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            amount: DataTypes.DOUBLE(10,2),
            quantity: DataTypes.INTEGER,
            total_amount: DataTypes.DOUBLE(10,2),
            isOutletStock: DataTypes.TINYINT, // 0: No, 1: Yes
            deletedAt: { type: DataTypes.DATE, defaultValue: null }
        },
        {
            freezeTableName: true,
            tableName: "order_details",
            paranoid: true
        },
    );

    OrderDetails.associate = function (models) {
        this.order_id = this.belongsTo(models.Orders, {
            foreignKey: "order_id",
        });
        this.product_id = this.belongsTo(models.Products, {
            foreignKey: "product_id"
        });
    };

    return OrderDetails;
};