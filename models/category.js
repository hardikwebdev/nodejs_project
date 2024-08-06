"use strict";

module.exports = (sequelize, DataTypes) => {
    let Category = sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            status: DataTypes.TINYINT, //0: Inactive, 1: Active
            deletedAt: { type: DataTypes.DATE, defaultValue: null }
        },
        {
            freezeTableName: true,
            tableName: "category",
            paranoid: true
        },
    );

    Category.associate = function (models) {
        this.category_id = this.hasMany(models.Projects, {
            foreignKey: "category_id",
            onDelete: 'cascade',
            hooks: true,
        });
    }

    return Category;
};