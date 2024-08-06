const Projects = require("../../../models").Projects;
const Users = require("../../../models").Users;
const UserProjects = require("../../../models").UserProjects;
const Outlets = require("../../../models").Outlets;
const VisitationHistory = require("../../../models").VisitationHistory;
const ProjectOutlets = require("../../../models").ProjectOutlets;
const OutletOpenHours = require("../../../models").OutletOpenHours;
const sequelize = require("../../../models").sequelize;
// let notificationEvents = require("../../../events/notificationEvents").notificationEmitter;
let Sequelize = require("sequelize");
const Op = Sequelize.Op;
let bcrypt = require("bcryptjs");
const moment = require('moment');
let _ = require('underscore');
let multer = require('multer');
let fs = require('fs');
let weekorder = { sunday: 1, monday: 2, tuesday: 3, wednesday: 4, thursday: 5, friday: 6, saturday: 7 };


const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',
    apiKey: process.env.Google_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports.getAddress = async function (req, res, next) {
    let postdata = req.body;

    req.checkBody({
        'lat': {
            notEmpty: true,
            errorMessage: 'Latitude is required'
        },
        'long': {
            notEmpty: true,
            errorMessage: 'Longitude is required'
        },
    });

    let errors = req.validationErrors();

    if (errors) {
        return ReE(res, errors[0].msg, 400);
    }
    const data = [
        {
            formattedAddress: '3 Rue Paul Chenavard, 69001 Lyon, France',
            latitude: 45.7670101,
            longitude: 4.8329692,
            extra: {
                googlePlaceId: 'ChIJnbwS9_7q9EcR_QROzI0Rzrc',
                confidence: 1,
                premise: null,
                subpremise: null,
                neighborhood: 'Lyon',
                establishment: null
            },
            administrativeLevels: {
                level2long: 'Rhône',
                level2short: 'Rhône',
                level1long: 'Auvergne-Rhône-Alpes',
                level1short: 'Auvergne-Rhône-Alpes'
            },
            streetNumber: '3',
            streetName: 'Rue Paul Chenavard',
            city: 'Lyon',
            country: 'France',
            countryCode: 'FR',
            zipcode: '69001',
            provider: 'google'
        }
    ]
    await geocoder.reverse({ lat: postdata.lat, lon: postdata.long }).then(resultD => {
    let result = resultD[0];
    if (result) {
        let address = {
            address: result.streetNumber ? result.streetNumber + " " + result.streetName : result.streetName,
            city: result.city,
            state: result.country,
            postal_code: result.zipcode
        }

        return ReS(res, "Address fetched successfully!", { payload: address });
    }
    }).catch(err => {
        console.log(err)
        return ReE(res, "Address not fetched!");
    });
}

module.exports.projectOutletList = async function (req, res, next) {
    let whereq = {};
    await ProjectOutlets.findAll({
        where: {
            project_id: req.query.project_id
        }
    }).then(async results => {
        let mondayArr = [];
        let tuesdayArr = [];
        let weddayArr = [];
        let thursdayArr = [];
        let fridayArr = [];
        let saturdayArr = [];
        let totalData = []
        let arr = [];

        let totalD = async function (item) {
            let days = JSON.parse(item.project_days)
            let data = await OutletOpenHours.findAll({
                where: {
                    outlet_id: item.outlet_id,
                    days: { [Op.in]: days }
                },
                include: [{ model: Outlets, where: whereq, required: true }]
            });

            for await (let i of data) {
                let thisData = i.dataValues;
                if (thisData.days == "monday") {
                    thisData.Outlet.dataValues.outlet_open_id = thisData.id;
                    // thisData.Outlet.dataValues.start_time = thisData.start_time;
                    // thisData.Outlet.dataValues.end_time = thisData.end_time;
                    mondayArr.push(thisData.Outlet);
                    if (mondayArr.length > 0) {
                        arr.push({
                            day: 'monday',
                            Outlets: mondayArr
                        })
                    }
                }
                if (thisData.days == "tuesday") {
                    thisData.Outlet.dataValues.outlet_open_id = thisData.id;
                    // thisData.Outlet.dataValues.start_time = thisData.start_time;
                    // thisData.Outlet.dataValues.end_time = thisData.end_time;
                    tuesdayArr.push(thisData.Outlet);
                    if (tuesdayArr.length > 0) {
                        arr.push({
                            day: 'tuesday',
                            Outlets: tuesdayArr
                        })
                    }
                }
                if (thisData.days == "wednesday") {
                    thisData.Outlet.dataValues.outlet_open_id = thisData.id;
                    // thisData.Outlet.dataValues.start_time = thisData.start_time;
                    // thisData.Outlet.dataValues.end_time = thisData.end_time;
                    weddayArr.push(thisData.Outlet);
                    if (weddayArr.length > 0) {
                        arr.push({
                            day: 'wednesday',
                            Outlets: weddayArr
                        })
                    }
                }
                if (thisData.days == "thursday") {
                    thisData.Outlet.dataValues.outlet_open_id = thisData.id;
                    // thisData.Outlet.dataValues.start_time = thisData.start_time;
                    // thisData.Outlet.dataValues.end_time = thisData.end_time;
                    thursdayArr.push(thisData.Outlet);
                    if (thursdayArr.length > 0) {
                        arr.push({
                            day: 'thursday',
                            Outlets: thursdayArr
                        })
                    }
                }
                if (thisData.days == "friday") {
                    thisData.Outlet.dataValues.outlet_open_id = thisData.id;
                    // thisData.Outlet.dataValues.start_time = thisData.start_time;
                    // thisData.Outlet.dataValues.end_time = thisData.end_time;
                    fridayArr.push(thisData.Outlet);
                    if (fridayArr.length > 0) {
                        arr.push({
                            day: 'friday',
                            Outlets: fridayArr
                        })
                    }
                }
                if (thisData.days == "saturday") {
                    thisData.Outlet.dataValues.outlet_open_id = thisData.id;
                    // thisData.Outlet.dataValues.start_time = thisData.start_time;
                    // thisData.Outlet.dataValues.end_time = thisData.end_time;
                    saturdayArr.push(thisData.Outlet);
                    if (saturdayArr.length > 0) {
                        arr.push({
                            day: 'saturday',
                            Outlets: saturdayArr
                        })
                    }
                }
            }
        };

        await _.each(results, async function (thisData) {
            totalData.push(totalD(thisData));
        });

        return Promise.all(totalData).then(function () {

            let result = arr.filter(function (a) {
                let r = a.Outlets.filter(function (b) {
                    return (!this[b.id]) && (this[b.id] = true);
                }, Object.create(null));
                a.Outlets = r;
                return (!this[a.day]) && (this[a.day] = true);
            }, Object.create(null));
            return ReS(res, "Outlet list fetched successfully!", {
                payload: result
            });
        }).catch(function (err) {
            return ReE(res, err, 400);
        });

    })

};

module.exports.outletList = async function (req, res, next) {
    let query = req.query;

    let sortBy = query.sortBy ? query.sortBy : "createdAt";
    req.query.sortBy = sortBy;
    let sortOrder = query.sortOrder ? query.sortOrder : "DESC";
    req.query.sortOrder = sortOrder;

    let limit = 10;
    let offset = 0;

    if (
        query.limit &&
        parseInt(query.limit) > 0 &&
        parseInt(query.limit) <= 100
    ) {
        limit = parseInt(query.limit);
    }

    if (query.page && parseInt(query.page) > 0 &&
        parseInt(query.page) <= 100) {
        offset = limit * (parseInt(query.page) - 1);
    }

    let wheres = {};

    if (query.search) {
        wheres[Op.or] = [
            { outlet_name: { [Op.substring]: query.search } },
            { outlet_email: { [Op.substring]: query.search } },
            { address: { [Op.substring]: query.search } },
        ];
    }

    if (query.status) {
        wheres[Op.or] = [{
            status: query.status
        }]
    }

    await Outlets.findAndCountAll({
        where: wheres,
        distinct: true,
        limit: limit,
        offset: offset,
        order: [[sortBy, sortOrder]],
        include: [{
            model: OutletOpenHours
        }]
    }).then(async data => {

        let promises = []
        let arr = [];
        let outlet_days = [];

        _.map(data.rows, async function (thisData) {

            thisData.dataValues.addressOrg = thisData.dataValues.address.split(',')?.[0]
            thisData.dataValues.address = thisData.dataValues.address
            _.map(thisData.OutletOpenHours, async function (itemD) {
                let item = itemD.dataValues;
                if (item.days == "monday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        outlet_open_id: item.id,
                        name: item.days,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }
                if (item.days == "tuesday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        outlet_open_id: item.id,
                        name: item.days,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }
                if (item.days == "wednesday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        outlet_open_id: item.id,
                        name: item.days,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }
                if (item.days == "thursday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        outlet_open_id: item.id,
                        name: item.days,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }
                if (item.days == "friday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        name: item.days,
                        outlet_open_id: item.id,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }
                if (item.days == "saturday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        name: item.days,
                        outlet_open_id: item.id,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }

                thisData.dataValues.days = arr.sort(function (a, b) {
                    return weekorder[a.name] - weekorder[b.name];
                });
                thisData.dataValues.outlet_days = outlet_days.sort(function (a, b) {
                    return weekorder[a] - weekorder[b];
                });

                return thisData;
            });
            arr = [];
            outlet_days = [];
            delete thisData.dataValues.OutletOpenHours;

            return thisData;
        });

        return ReS(res, "Outlets fetched successfully.", {
            payload: {
                data: { count: data.count, rows: data.rows }
            }
        });
    }).catch(err => {
        return ReE(res, err, 400);
    });
}

module.exports.getAlllist = async function (req, res, next) {

    await Outlets.findAll({
        where: { status: 1 },
        include: [{
            model: OutletOpenHours,
            group: ['days']
        }]
    }).then(async data => {

        let promises = []
        let arr = [];
        let outlet_days = [];

        _.map(data, async function (thisData) {

            thisData.dataValues.addressOrg = thisData.dataValues.address.split(',')?.[0]
            thisData.dataValues.address = thisData.dataValues.address
            _.map(thisData.OutletOpenHours, async function (itemD) {
                let item = itemD.dataValues;
                if (item.days == "monday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        outlet_open_id: item.id,
                        name: item.days,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);

                }
                if (item.days == "tuesday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        outlet_open_id: item.id,
                        name: item.days,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }
                if (item.days == "wednesday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        outlet_open_id: item.id,
                        name: item.days,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }
                if (item.days == "thursday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        outlet_open_id: item.id,
                        name: item.days,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }
                if (item.days == "friday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        name: item.days,
                        outlet_open_id: item.id,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }
                if (item.days == "saturday" && thisData.dataValues.id == item.outlet_id) {
                    let obj = {
                        name: item.days,
                        outlet_open_id: item.id,
                        // start_time: moment(item.start_time, ["h:mm A"]).format("HH:mm"),
                        // start: item.start_time,
                        // end_time: moment(item.end_time, ["h:mm A"]).format("HH:mm"),
                        // end: item.end_time,
                        checked: true
                    }
                    arr.push(obj);
                    outlet_days.push(item.days);
                }

                thisData.dataValues.days = arr.sort(function (a, b) {
                    return weekorder[a.name] - weekorder[b.name];
                });
                thisData.dataValues.outlet_days = outlet_days.sort(function (a, b) {
                    return weekorder[a] - weekorder[b];
                });

                return thisData;
            });
            arr = [];
            outlet_days = [];
            delete thisData.dataValues.OutletOpenHours;

            return thisData;
        });

        return ReS(res, "Outlets fetched successfully.", {
            payload: {
                data: { rows: data }
            }
        });
    }).catch(err => {
        return ReE(res, err, 400);
    });
}

module.exports.createOutlet = async function (req, res, next) {
    let postdata = req.body && req.body.data && JSON.parse(req.body.data);
    let coverage = []
    let cov = postdata.days && postdata.days.map((item => {
        if (item.checked == true) {
            let obj = {
                days: item.name.toLowerCase(),
                // start_time: item.start.toLowerCase().replace(/\s/g, ''),
                // end_time: item.end.toLowerCase().replace(/\s/g, '')
            }
            coverage.push(obj);
        }
    }));
    delete postdata.days;

    postdata.outlet_url = req.file ? req.file.filename : null;
    postdata.status = 1;

    let arrayOfData = [];

    await Outlets.create(postdata).then(async (results) => {
        for (let i = 0; i < coverage.length; i++) {
            arrayOfData.push({
                outlet_id: results.id,
                days: coverage[i].days,
                status: 1,
                // start_time: coverage[i].start_time,
                // end_time: coverage[i].end_time
            });
        }

        let promises = [];

        Object.entries(arrayOfData).forEach(async ([keyi, valuei]) => {
            let newPromise = await OutletOpenHours.create(valuei);
            promises.push(newPromise);

            return newPromise;
        });

        return Promise.all(promises).then(function () {
            return ReS(res, "Outlet created successfully!");
        }).catch(function (err) {
            return ReE(res, err, 400);
        });
    });
}

module.exports.editOutlet = async function (req, res, next) {
    let postdata = req.body && req.body.data && JSON.parse(req.body.data);

    await Outlets.findOne({
        where: {
            id: { [Op.ne]: postdata.id },
            outlet_name: postdata.outlet_name
        }
    }).then(async (found) => {
        if (found) {
            return ReE(res, "Failed to update outlet as outlet already exist with same name!");
        } else {

            let coverage = []
            let cov = postdata.days && postdata.days.map((item => {
                if (item.checked == true) {
                    let obj = {
                        id: item.outlet_open_id,
                        days: item.name.toLowerCase(),
                        // start_time: item.start.toLowerCase().replace(/\s/g, ''),
                        // end_time: item.end.toLowerCase().replace(/\s/g, '')
                    }
                    coverage.push(obj);
                } else if (item.outlet_open_id && item.checked == false){
                    let obj = {
                        id: item.outlet_open_id,
                        days: item.name.toLowerCase(),
                        deletedAt: new Date()
                    }
                    coverage.push(obj);
                }
            }));
            delete postdata.days;

            postdata.outlet_url = req.file ? req.file.filename : null;
            postdata.status = 1;

            let arrayOfData = [];

            await Outlets.update(postdata, { where: { id: postdata.id } }).then(async (results) => {
                for (let i = 0; i < coverage.length; i++) {
                    arrayOfData.push({
                        id: coverage[i].id,
                        days: coverage[i].days,
                        status: 1,
                        deletedAt: coverage[i].deletedAt ? coverage[i].deletedAt : null
                        // start_time: coverage[i].start_time,
                        // end_time: coverage[i].end_time
                    });
                }

                let promises = [];

                Object.entries(arrayOfData).forEach(async ([keyi, valuei]) => {
                    if (valuei.id) {
                        let newPromise = await OutletOpenHours.update(valuei, { where: { id: valuei.id } });
                    } else {
                        valuei.outlet_id = postdata.id;
                        let newPromise = await OutletOpenHours.create(valuei);
                    }

                    promises.push(newPromise);

                    return newPromise;
                });

                return Promise.all(promises).then(function () {
                    return ReS(res, "Outlet updated successfully!");
                }).catch(function (err) {
                    return ReE(res, err, 400);
                });
            });
        }
    }).catch(err => {
        return ReE(res, err, 400);
    });
}

module.exports.editOutletStatus = async function (req, res, next) {
    let postdata = req.body;

    await Outlets.update({
        status: postdata.status
    }, {
        where: {
            id: postdata.id
        }
    }).then((updated) => {
        if (updated) {
            return ReS(res, "Outlet status changes successfully!");
        } else {
            return ReE(res, "Failed to update outlet status!", 400);
        }
    }).catch(err => {
        return ReE(res, err, 400);
    });
}

module.exports.deleteOutlet = async function (req, res, next) {
    let postdata = req.body;

    await Outlets.update({
        deletedAt: new Date()
    }, {
        where: {
            id: postdata.id
        }
    }).then((updated) => {
        if (updated) {
            return ReS(res, "Outlet deleted successfully!");
        } else {
            return ReE(res, "Failed to delete outlet!", 400);
        }
    }).catch(err => {
        return ReE(res, err, 400);
    });
}

module.exports.assignOutlet = async function (req, res, next) {
    let postdata = req.body;
    let promises = [];
    let day = [];
    day.push(postdata.selectedDay)

    let arrayOfData = postdata.outlets;

    Object.entries(arrayOfData).forEach(async ([keyi, valuei]) => {
        let found = await ProjectOutlets.findOne({
            where: {
                project_id: postdata.project_id,
                outlet_id: valuei.id
            }
        });

        if (found) {
            let project_days = found.project_days && JSON.parse(found.project_days);
            if (!project_days.includes(postdata.selectedDay)) {
                project_days.push(postdata.selectedDay)
                let updated = await ProjectOutlets.update({
                    project_days: JSON.stringify(project_days)
                }, {
                    where: {
                        project_id: postdata.project_id,
                        outlet_id: valuei.id
                    }
                });
                promises.push(updated);
                return newPromise;
            }
        } else {
            let newPromise = await ProjectOutlets.create({
                project_id: postdata.project_id,
                outlet_id: valuei.id,
                project_days: JSON.stringify(day)
            });
            promises.push(newPromise);
            return newPromise;
        }
    });

    return Promise.all(promises).then(function () {
        return ReS(res, "Outlet assigned successfully!");
    }).catch(function (err) {
        return ReE(res, err, 400);
    });

}

module.exports.unassignOutlet = async function (req, res, next) {
    let postdata = req.body;
    let promises = [];
    let day = [];
    let totalData = [];
    console.log(postdata)

    let results = await ProjectOutlets.findAll({
        where: {
            project_id: postdata.project_id,
            outlet_id: postdata.id
        }
    });

    let promises = [];

    Object.entries(results).forEach(async ([keyi, valuei]) => {
        let thisData = valuei.dataValues;
        let projectDays = JSON.parse(thisData.project_days);
        let newPromise = ""
        if (projectDays.includes(postdata.day)) {
            if (projectDays.length > 1) {
                let index = projectDays.indexOf(postdata.day);

                if (index > -1) {
                    projectDays.splice(index, 1);
                }
                newPromise = await ProjectOutlets.update({
                    project_days: JSON.stringify(projectDays)
                }, {
                    where: {
                        id: thisData.id
                    }
                });
            } else {
                newPromise = newPromise = await ProjectOutlets.update({
                    deletedAt: new Date()
                }, {
                    where: {
                        id: thisData.id
                    }
                });
            }
        }
        promises.push(newPromise);

        return newPromise;
    });

    return Promise.all(promises).then(function () {
        return ReS(res, "Outlet removed successfully!");
    }).catch(function (err) {
        return ReE(res, err, 400);
    });


}