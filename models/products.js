"use strict";

module.exports = (sequelize, DataTypes) => {
    let Products = sequelize.define(
        "Products",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            brand_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            description: DataTypes.INTEGER,
            image_url: DataTypes.TEXT('long'),
            amount: DataTypes.DOUBLE(10,2),
            status: DataTypes.TINYINT, //0: Inactive, 1: Active
            deletedAt: { type: DataTypes.DATE, defaultValue: null }
        },
        {
            freezeTableName: true,
            tableName: "products",
            paranoid: true,
            getterMethods: {
                image_url: function () {
                    let signatureUrl = this.getDataValue('image_url');
                    if (signatureUrl) {
                        let baseurl = CONFIG.LIVE_IMAGE_URL_PATH + 'media/thumbnail/';
                        return baseurl + signatureUrl;
                    }
                    return signatureUrl;
                }
            }
        },
    );

    Products.associate = function (models) {
        this.brand_id = this.belongsTo(models.Brands, {
          foreignKey: "brand_id"
        });
        this.product_id = this.hasMany(models.OrderDetails, {
            foreignKey: "product_id",
            onDelete: 'cascade',
            hooks: true
        });
        this.product_id = this.hasMany(models.Stocks, {
            foreignKey: "product_id",
            onDelete: 'cascade',
            hooks: true
        });
        // this.product_id = this.hasMany(models.TradeRequest, {
        //     foreignKey: "product_id",
        //     onDelete: 'cascade',
        //     hooks: true
        // })
      }

    return Products;
};