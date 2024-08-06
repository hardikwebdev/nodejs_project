const Users = require("../models").Users;
const Outlets = require("../models").Outlets;
const Projects = require("../models").Projects;
const VisitationHistory = require("../models").VisitationHistory;
const Products = require("../models").Products;
const Orders = require("../models").Orders;
const OrderDetails = require("../models").OrderDetails;
const OutletOpenHours = require("../models").OutletOpenHours;
const sequelize = require("../models").sequelize;
let Sequelize = require("sequelize");
const Op = Sequelize.Op;
let bcrypt = require("bcryptjs");
const moment = require('moment');
let _ = require('underscore');
let XLSX = require("xlsx");
const { getJsDateFromExcel } = require("excel-date-to-js");

module.exports.importScript = async function (req, res, next) {
    let localFilePath = "./public/media/Outlet_Info.xls";
    let workbook = XLSX.readFile(localFilePath);
    let sheet_name_list = workbook.SheetNames;
    let row = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    if (row.length > 0) {
        let promises = 0;
        for (let i = 0; i < row.length; i++) {
            let thisData = row[i];
            let regex = /, \d{5} /;
            let str = thisData['Address'];
            let address = str.split(regex);
            let weekday = thisData['Coverage Day'];
            if (thisData) {
                let innerbulkdata = {
                    outlet_name: thisData['Outlet Name'].trim(),
                    address: address[0],
                    postal_code: thisData['Postal Code'],
                    state: thisData.State,
                    city: thisData.City,
                    owner_contact: thisData['Owner Contact Number'] ? thisData['Owner Contact Number'] : null,
                    owner_name: thisData['Owner Contact Name'] ? thisData['Owner Contact Name'] : null,
                    owner_email: thisData['Owner Contact Email'] ? thisData['Owner Contact Email'] : null,
                    person_email: thisData['PIC Email'] ? thisData['PIC Email'] : null,
                    person_name: thisData['PIC Name'] ? thisData['PIC Name'] : null,
                    person_contact: thisData['PIC Contact Number'] ? thisData['PIC Contact Number'] : null,
                    status: 1
                }
                await Outlets.create(innerbulkdata).then(async result => {
                    let days = await getWeekday(weekday);
                    await OutletOpenHours.create({ days: days, outlet_id: result.id, status: 1 }).then(resultD => {
                        promises++;
                    })
                })
            }
        }

        if (promises == row.length) {
            return ReS(res, 'Outlets imported successfully!')
        }
    } else {
        return ReE(res, 'Empty file! Not able to create outlet!', 400)
    }


};

module.exports.effectiveScript = async function (req, res, next) {
    await Orders.findAll({
        include: [{
            model: OrderDetails,
            required: true
        }]
    }).then(async result => {
        let array = _.pluck(result, 'id');

        await Orders.update({
            isEffective: 1
        }, {
            where: {
                id: { [Op.in]: array }
            }
        });

        await Orders.update({
            isEffective: 0
        }, {
            where: {
                id: { [Op.notIn]: array }
            }
        });
        return ReS(res, 'Data updated successfully!')
    }).catch(err => {
        return ReE(res, 'Something went wrong!')
    })
};

module.exports.importReportScript = async function (req, res, next) {

    let localFilePath = "./public/media/report1.xls";
    let workbook = XLSX.readFile(localFilePath, {
        cellDates: true
    });
    let sheet_name_list = workbook.Sheets[workbook.SheetNames[0]];
    let row = XLSX.utils.sheet_to_json(sheet_name_list);
    if (row.length > 0) {
        let promises = 0;
        for (let i = 0; i < row.length; i++) {
            let thisData = row[i];
            if (thisData) {
                let outlet = await Outlets.findOne({ where: { outlet_name: thisData['Outlet'] }, attributes: ['id'], raw: true });
                let user = await Users.findOne({ where: { username: thisData['Username'] }, attributes: ['id'], raw: true });
                let project = await Projects.findOne({ where: { title: thisData['Team'] }, attributes: ['id'], raw: true });
                let productArr = [];
                function getKeyByValue(object, value) {
                    return Object.keys(object).find((key, i) => {
                        if (i > 22) {
                            if (object[key] === value && key != "TOTAL" && key != "__EMPTY") {
                                productArr.push({ key: key, quantity: object[key] })
                            }
                        }
                    });
                }

                await getKeyByValue(thisData, 1);
                let date = new Date(thisData['Visited Date']);
                let converted = 25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));


                thisData['Visited Date'] = moment(await getJsDateFromExcel(converted.toFixed()))
                    .set({ hours: 0, minutes: 0, seconds: 0 }).format("YYYY-MM-DD HH:mm:ss");
                let visitObj = {
                    outlet_id: outlet && outlet.id,
                    project_id: project && project.id,
                    user_id: user.id,
                    type: thisData['Check-out'] != "-" ? 1 : 0,
                    check_in: moment(thisData['Visited Date']).set({
                        hours: moment(thisData['Check-in']).hours(), minutes: moment(thisData['Check-in']).minutes()
                    }).format("YYYY-MM-DD HH:mm:ss"),
                    day: moment(thisData['Visited Date']).format("dddd").toLowerCase()
                }

                let duration = moment(thisData['Duration']).hours() + ":" + moment(thisData['Duration']).minutes() + ":" +
                    moment(thisData['Duration']).seconds();

                let myDate = visitObj.check_in;
                visitObj.check_out = moment(myDate).add(moment.duration(duration)).format('YYYY-MM-DD HH:mm:ss');
                visitObj.createdAt = visitObj.check_in;
                visitObj.updatedAt = visitObj.check_in;


                let visit = await VisitationHistory.findOne({
                    where: {
                        outlet_id: outlet && outlet.id,
                        project_id: project && project.id,
                        user_id: user.id,
                        check_in: visitObj.check_in
                    }
                });

                if (!visit) {
                    visit = await VisitationHistory.create(visitObj).catch(err => { });
                }
                let arr = [];
                if (thisData["Variant"] != "-") {
                    arr.push(thisData["Variant"])
                }
                let innerbulkdata = {
                    outlet_id: outlet && outlet.id,
                    project_id: project && project.id,
                    user_id: user.id,
                    visitation_id: visit.id,
                    status: thisData['Status'] === "Completed" ? 1 : thisData['Status'] === "Void" ? 2 : 0,
                    age_group: thisData['Age Group'],
                    gender: thisData['Gender'],
                    group_segment: thisData['Group Segment'],
                    brands_variant: arr.length > 0 ? JSON.stringify(arr) : null,
                    isEffective: thisData["Effective Contact"],
                    isFree: thisData["Free"] === "No" ? 0 : 1,
                    isVerified: thisData["Verified"] === "No" ? 0 : 1,
                    effective_name: thisData['Name'] != "-" ? thisData['Name'] : null,
                    effective_email: thisData['Email'] != "-" ? thisData['Email'] : null,
                    effective_contact: thisData['Contact Number'] != "-" ? thisData['Contact Number'] : null,
                    createdAt: visitObj.createdAt,
                    updatedAt: visitObj.updatedAt
                };

                let orderObj = null;

                if (productArr.length > 0) {
                    let product = await Products.findOne({
                        where: {
                            name: productArr[0]['key']
                        },
                        raw: true
                    });
                    let isOutlet = productArr.length > 1 ? (productArr[1]['key']).toLowerCase().includes('outlet') : false;
                    orderObj = {
                        order_id: 1,
                        product_id: product.id,
                        amount: (product.amount).toFixed(2),
                        quantity: productArr[0]['quantity'],
                        total_amount: ((product.amount).toFixed(2) * productArr[0]['quantity']).toFixed(2),
                        isOutletStock: isOutlet ? 1 : 0
                    }
                }

                await Orders.create(innerbulkdata).then(async result => {
                    if (orderObj) {
                        orderObj.order_id = result.id;
                        await OrderDetails.create(orderObj).then(resultD => {
                            promises++;
                        })
                    } else {
                        promises++;
                    }
                })
            }
        }


        if (promises == row.length) {
            return ReS(res, 'Outlets imported successfully!')
        }
    } else {
        return ReE(res, 'Empty file! Not able to create outlet!', 400)
    }
}