"use strict";

module.exports = (sequelize, DataTypes) => {
    let Brands = sequelize.define(
        "Brands",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            image_url: DataTypes.STRING,
            sort_order: DataTypes.INTEGER,
            status: DataTypes.TINYINT, // 0: Inactive, 1: Active
            deletedAt: { type: DataTypes.DATE, defaultValue: null }
        },
        {
            freezeTableName: true,
            tableName: "brands",
            paranoid: true,
            getterMethods: {
                thumbnail: function () {
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

    Brands.associate = function (models) {
        this.brand_id = this.hasMany(models.Products, {
            foreignKey: "brand_id",
            onDelete: 'cascade',
            hooks: true,
        });
    };

    return Brands;
};