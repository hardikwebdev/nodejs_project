"use strict";

module.exports = (sequelize, DataTypes) => {
    let Projects = sequelize.define(
        "Projects",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING,
            campaign_id: DataTypes.STRING,
            description: DataTypes.STRING,
            category_id: DataTypes.INTEGER,
            status: DataTypes.TINYINT, //0: Inactive, 1: Active
            isCompleted: DataTypes.TINYINT, //0: No, 1: Yes
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
            deletedAt: { type: DataTypes.DATE, defaultValue: null }
        },
        {
            freezeTableName: true,
            tableName: "projects",
            paranoid: true
        },
    );

    Projects.associate = function (models) {
        this.project_id = this.hasMany(models.UserProjects, {
            foreignKey: "project_id",
            onDelete: 'cascade',
            hooks: true,
        });

        this.project_id = this.hasMany(models.VisitationHistory, {
            foreignKey: "project_id",
            onDelete: 'cascade',
            hooks: true,
        });

        this.category_id = this.belongsTo(models.Category, {
            foreignKey: "category_id"
        });
        
        this.project_id = this.hasMany(models.ProjectOutlets, {
            foreignKey: "project_id",
            onDelete: 'cascade',
            hooks: true,
        });

        this.project_id = this.hasMany(models.Stocks, {
            foreignKey: "project_id",
            onDelete: 'cascade',
            hooks: true,
        });

        this.project_id = this.hasMany(models.Orders, {
            foreignKey: "project_id",
            onDelete: 'cascade',
            hooks: true,
        });

        // this.project_id = this.hasMany(models.TradeRequest, {
        //     foreignKey: "project_id",
        //     onDelete: 'cascade',
        //     hooks: true,
        // });
    }

    return Projects;
};