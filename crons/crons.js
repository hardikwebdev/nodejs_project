const sequelize = require("../models").sequelize;
let Sequelize = require("sequelize");
const Op = Sequelize.Op;
const fs = require("fs");
let _ = require('underscore');
let moment = require("moment-timezone");
let Projects = require("../models").Projects;
const VisitationHistory = require("../models").VisitationHistory;


module.exports.updateProjectStatus = async () => {

    let nowdatetime = moment().format("YYYY-MM-DD HH:mm:ss");
    await Projects.findAll({
        where: {
            end_date: { [Op.lt]: nowdatetime },
            isCompleted: 0
        },
        raw: true,
        attributes: ['id']
    }).then(async data => {
        if (data.length > 0) {
            const promises = [];
            for (let i = 0; i < data.length; i++) {
                await Projects.update({ isCompleted: 1 }, {
                    where: {
                        id: data[i].id
                    }
                });
                promises.push(i);
            }
            Promise.all(promises)
                .then((results) => {
                    console.log("Project status updated");
                })
                .catch((e) => {
                    console.log("Project status not updated");
                });
        } else {
            console.log("Project status not updated");
        }

    }).catch(err => { });
}

module.exports.checkoutOutlets = async () => {

    let nowdatetime = moment().format("YYYY-MM-DD HH:mm:ss");
    let whereV = {
        check_out: null,
        type: 0
    }
    whereV[Op.and] = [
        sequelize.where(sequelize.fn('date', sequelize.col('check_in')), '<', moment().format('YYYY-MM-DD'))
    ]
    await VisitationHistory.findAll({
        where: whereV,
        raw: true,
        attributes: ['id']
    }).then(async data => {
        if (data.length > 0) {
            const promises = [];
            for (let i = 0; i < data.length; i++) {
                await VisitationHistory.update({ check_out: new Date(), type: 1 }, {
                    where: {
                        id: data[i].id
                    }
                });
                promises.push(i);
            }
            Promise.all(promises)
                .then((results) => {
                    console.log("Visitation status updated");
                })
                .catch((e) => {
                    console.log("Visitation status not updated");
                });
        } else {
            console.log("Visitation status not updated");
        }

    }).catch(err => { });
}