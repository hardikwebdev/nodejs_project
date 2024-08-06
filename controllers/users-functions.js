const Projects = require("../models").Projects;
const Users = require("../models").Users;
const UserProjects = require("../models").UserProjects;
const Orders = require("../models").Orders;
const OrderDetails = require("../models").OrderDetails;
const VisitationHistory = require("../models").VisitationHistory;
const Products = require("../models").Products;
const Stocks = require("../models").Stocks;
const StocksHistory = require("../models").StocksHistory;
const LoginHistory = require("../models").LoginHistory;
const Notifications = require("../models").Notifications;
const TradeRequest = require("../models").TradeRequest;
const Brands = require("../models").Brands;
const sequelize = require("../models").sequelize;
// let notificationEvents = require("../../../events/notificationEvents").notificationEmitter;
let Sequelize = require("sequelize");
const Op = Sequelize.Op;
let bcrypt = require("bcryptjs");
const moment = require('moment');
let _ = require('underscore');
let multer = require('multer');
let fs = require('fs');

module.exports.getUserData = async function (req, callback) {
    Users.findOne({
        where: { id: req.user.id },
        include: [
            {
            model: UserProjects,
            required: false,
            where: {
                user_id: req.user.id
            },
            include: { model: Projects, where: { isCompleted: 0 }, attributes: ['title', 'description'] }
        }, 
        {
            model: LoginHistory,
            attributes: ['type', 'createdAt'],
            limit: 5,
            order: [["createdAt", "DESC"]],
        }, {
            model: Notifications,
            limit: 5,
            order: [["createdAt", "DESC"]],
        }],
    }).then(async user => {
        if (user == null) {
            let err = {
                code: 500,
                message: "Opps! User does not exist."
            };

            return ReE(res, err, err.code);
        } else {

            let userreturn = user.toWeb();
            userreturn.projectsCount = userreturn.UserProjects && userreturn.UserProjects.length;
            userreturn.token = user.getJWT();
            delete userreturn.UserProjects;
            return callback({
                code: 200,
                data: { ...userreturn }
            });
        }
    });
}