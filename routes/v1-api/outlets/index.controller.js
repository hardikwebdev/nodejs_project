const Projects = require("../../../models").Projects;
const Users = require("../../../models").Users;
const UserProjects = require("../../../models").UserProjects;
const Stocks = require("../../../models").Stocks;
const StocksHistory = require("../../../models").StocksHistory;
const Outlets = require("../../../models").Outlets;
const VisitationHistory = require("../../../models").VisitationHistory;
const BrandsVariant = require("../../../models").BrandsVariant;
const ProjectOutlets = require("../../../models").ProjectOutlets;
const OutletOpenHours = require("../../../models").OutletOpenHours;
const GeneralConfigs = require("../../../models").GeneralConfigs;
const Orders = require("../../../models").Orders;
const OrderDetails = require("../../../models").OrderDetails;
const Brands = require("../../../models").Brands;
const Products = require("../../../models").Products;
const PDPA = require("../../../models").PDPA;
const sequelize = require("../../../models").sequelize;
let notificationEvents = require("../../../events/notificationEvents").notificationEmitter;
let Sequelize = require("sequelize");
const Op = Sequelize.Op;
let bcrypt = require("bcryptjs");
const moment = require('moment');
let _ = require('underscore');
let multer = require('multer');
let fs = require('fs');
let path = require('path');
let request = require('request');
let controller = require("../../../controllers/projects-functions.js");
let weekorder = { sunday: 1, monday: 2, tuesday: 3, wednesday: 4, thursday: 5, friday: 6, saturday: 7 };
let mime = require('mime');
const bufferFrom = require('buffer-from');
let imageUpload = require("../../../middleware/image_upload");


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

module.exports.getVisit = async function (user_id, outlet_id, project_id, day, outletsArr, today) {

    if (outlet_id) {
        let startOfWeek = moment().startOf('isoWeek').toDate();
        let endOfWeek = moment().endOf('isoWeek').toDate();
        let days = [];
        for (i = 0; i <= 6; i++) {
            days.push(moment(startOfWeek).add(i, 'days').set({ hour: 0, minute: 0 }).toDate());
        };
        let startDate = days[0];
        let endDate = days[6];

        let visit = await VisitationHistory.findAll({
            where: {
                user_id: user_id,
                outlet_id: outlet_id,
                project_id: project_id,
                type: { [Op.ne]: 2 },
                day: day,
                check_in: {
                    [Op.between]: [startDate, endDate]
                }
            },
            limit: 1,
            order: [['id', 'DESC']]
        });

        if (visit && visit.length > 0 && visit[0].id) {
            if (day === "monday") {
                startDate = days[0];
                endDate = days[1];
            } if (day === "tuesday") {
                startDate = days[1];
                endDate = days[2];
            } if (day === "wednesday") {
                startDate = days[2];
                endDate = days[3];
            } if (day === "thursday") {
                startDate = days[3];
                endDate = days[4];
            } if (day === "friday") {
                startDate = days[4];
                endDate = days[5];
            } if (day === "saturday") {
                startDate = days[5];
                endDate = days[6];
            }
            let f = await VisitationHistory.findOne({
                where: {
                    id: visit[0].id,
                    day: day,
                    check_in: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            let f1 = await VisitationHistory.findOne({
                where: {
                    id: visit[0].id,
                    day: day,
                    reason: { [Op.ne]: null }
                }
            });

            return f1 ? f1 : f ? f : null;
        } else {
            return null;
        }
    } else {
        let startOfWeek = moment(new Date()).startOf('isoWeek').toDate();
        let endOfWeek = moment().endOf('isoWeek').toDate();
        let days = [];
        for (i = 0; i <= 6; i++) {
            days.push(moment(startOfWeek).add(i, 'days').set({ hour: 0, minute: 0 }).toDate());
        };

        let startDate = days[0];
        let endDate = days[6];

        if (today) {
            startDate = moment().set({ hour: 0, minute: 0 }).toDate();
            endDate = moment().set({ hour: 23, minute: 59 }).toDate()
        }

        let defaultOptions = {
            where: {
                user_id: user_id,
                project_id: project_id,
                outlet_id: { [Op.notIn]: outletsArr },
                type: { [Op.ne]: 2 },
                check_in: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [['id', 'DESC']]
        }

        if (day != "others") {
            defaultOptions.limit = 1
        }

        let visit = await VisitationHistory.findAll(defaultOptions);

        if (visit && visit.length >= 1 && day === "others") {
            return visit;
        } else {
            if (visit && visit.length > 0 && visit[0].id) {
                if (day === "monday") {
                    startDate = days[0];
                    endDate = days[1];
                } if (day === "tuesday") {
                    startDate = days[1];
                    endDate = days[2];
                } if (day === "wednesday") {
                    startDate = days[2];
                    endDate = days[3];
                } if (day === "thursday") {
                    startDate = days[3];
                    endDate = days[4];
                } if (day === "friday") {
                    startDate = days[4];
                    endDate = days[5];
                } if (day === "saturday") {
                    startDate = days[5];
                    endDate = days[6];
                }
                let f = await VisitationHistory.findOne({
                    where: {
                        id: visit[0].id,
                        check_in: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                });
                return f ? f : null;
            } else {
                return null;
            }
        }

    }

}

module.exports.outletList = async function (req, res, next) {
    let query = req.query;

    await ProjectOutlets.findAll({
        where: {
            project_id: req.query.project_id
        }
    }).then(async result => {
        let mondayArr = [];
        let tuesdayArr = [];
        let weddayArr = [];
        let thursdayArr = [];
        let fridayArr = [];
        let saturdayArr = [];
        let totalData = [];
        let arr = [];
        let resultD = result.map(el => el.get({ plain: true }));
        let ids = _.pluck(resultD, 'outlet_id');
        let today = moment().format('dddd');

        let startOfWeek = moment(new Date()).startOf('isoWeek').toDate();
        let daysArr = [];
        for (i = 0; i <= 6; i++) {
            daysArr.push(moment(startOfWeek).add(i, 'days').set({ hour: 0, minute: 0 }).toDate());
        };

        let whereeq = {};

        whereeq[Op.or] = {
            outlet_id: {
                [Op.in]: ids
            },
        }

        let wheres = { status: 1 };
        if (req.query.search) {
            wheres[Op.or] = [
                { outlet_name: { [Op.substring]: query.search } },
                { outlet_email: { [Op.substring]: query.search } },
                // { address: { [Op.substring]: query.search } },
                // { city: { [Op.substring]: query.search } }
            ];

            let d = await Outlets.findAll({
                where: wheres
            });

            let othersArr = [];
            let outletsArr = _.pluck(d, 'id');
            let totalD = async function (item) {
                let thisData = item.dataValues;
                let visit = await exports.getVisit(req.user.id, thisData.id, req.query.project_id, 'others', outletsArr);

                thisData.checkInStatus = visit ? visit.type == 0 ? "Ongoing" : "Visited" : null;
                thisData.visitation_id = visit ? parseInt(visit.id) : null;
                thisData.day = 'others';
                othersArr.push(thisData);
                if (othersArr.length > 0) {
                    arr.push({
                        day: 'others',
                        date: daysArr[new Date().getDay()],
                        Outlets: othersArr
                    })
                }

                return thisData;
            }
            await _.each(d, async function (thisData) {
                totalData.push(totalD(thisData));
            });

        }

        let totalD = async function (item) {
            let days = JSON.parse(item.project_days)
            let data = await OutletOpenHours.findAll({
                where: {
                    outlet_id: item.outlet_id,
                    days: { [Op.in]: days }
                },
                include: [{ model: Outlets, where: wheres, required: true }]
            });

            for await (let i of data) {
                let thisData = i;
                if (thisData.days == "monday") {

                    let visit = await exports.getVisit(req.user.id, thisData.dataValues.Outlet.dataValues.id, req.query.project_id, 'monday');

                    thisData.dataValues.Outlet.dataValues.checkInStatus = visit ? visit.type == 0 ? "Ongoing" : "Visited" : null;
                    thisData.dataValues.Outlet.dataValues.visitation_id = visit ? parseInt(visit.id) : null;
                    thisData.dataValues.Outlet.dataValues.day = 'monday';
                    mondayArr.push(thisData.dataValues.Outlet);
                    if (mondayArr.length > 0) {
                        arr.push({
                            day: 'monday',
                            date: daysArr[1],
                            Outlets: mondayArr
                        })
                    }
                }
                if (thisData.days == "tuesday") {
                    let visit = await exports.getVisit(req.user.id, thisData.dataValues.Outlet.dataValues.id, req.query.project_id, 'tuesday');

                    thisData.dataValues.Outlet.dataValues.checkInStatus = visit ? visit.type == 0 ? "Ongoing" : "Visited" : null;
                    thisData.dataValues.Outlet.dataValues.visitation_id = visit ? parseInt(visit.id) : null;
                    thisData.dataValues.Outlet.dataValues.day = 'tuesday';
                    tuesdayArr.push(thisData.dataValues.Outlet);
                    if (tuesdayArr.length > 0) {
                        arr.push({
                            day: 'tuesday',
                            date: daysArr[2],
                            Outlets: tuesdayArr
                        })
                    }
                }
                if (thisData.days == "wednesday") {
                    let visit = await exports.getVisit(req.user.id, thisData.dataValues.Outlet.dataValues.id, req.query.project_id, 'wednesday');

                    thisData.dataValues.Outlet.dataValues.checkInStatus = visit ? visit.type == 0 ? "Ongoing" : "Visited" : null;
                    thisData.dataValues.Outlet.dataValues.visitation_id = visit ? parseInt(visit.id) : null;
                    thisData.dataValues.Outlet.dataValues.day = 'wednesday';
                    weddayArr.push(thisData.dataValues.Outlet);
                    if (weddayArr.length > 0) {
                        arr.push({
                            day: 'wednesday',
                            date: daysArr[3],
                            Outlets: weddayArr
                        })
                    }
                }
                if (thisData.days == "thursday") {
                    let visit = await exports.getVisit(req.user.id, thisData.dataValues.Outlet.dataValues.id, req.query.project_id, 'thursday');

                    thisData.dataValues.Outlet.dataValues.checkInStatus = visit ? visit.type == 0 ? "Ongoing" : "Visited" : null;
                    thisData.dataValues.Outlet.dataValues.visitation_id = visit ? parseInt(visit.id) : null;
                    thisData.dataValues.Outlet.dataValues.day = 'thursday';
                    thursdayArr.push(thisData.dataValues.Outlet);
                    if (thursdayArr.length > 0) {
                        arr.push({
                            day: 'thursday',
                            date: daysArr[4],
                            Outlets: thursdayArr
                        })
                    }
                }
                if (thisData.days == "friday") {
                    let visit = await exports.getVisit(req.user.id, thisData.dataValues.Outlet.dataValues.id, req.query.project_id, 'friday');

                    thisData.dataValues.Outlet.dataValues.checkInStatus = visit ? visit.type == 0 ? "Ongoing" : "Visited" : null;
                    thisData.dataValues.Outlet.dataValues.visitation_id = visit ? parseInt(visit.id) : null;
                    thisData.dataValues.Outlet.dataValues.day = 'friday';
                    fridayArr.push(thisData.dataValues.Outlet);
                    if (fridayArr.length > 0) {
                        arr.push({
                            day: 'friday',
                            date: daysArr[5],
                            Outlets: fridayArr
                        })
                    }
                }
                if (thisData.days == "saturday") {
                    let visit = await exports.getVisit(req.user.id, thisData.dataValues.Outlet.dataValues.id, req.query.project_id, 'saturday');

                    thisData.dataValues.Outlet.dataValues.checkInStatus = visit ? visit.type == 0 ? "Ongoing" : "Visited" : null;
                    thisData.dataValues.Outlet.dataValues.visitation_id = visit ? parseInt(visit.id) : null;
                    thisData.dataValues.Outlet.dataValues.day = 'saturday';
                    saturdayArr.push(thisData.dataValues.Outlet);
                    if (saturdayArr.length > 0) {
                        arr.push({
                            day: 'saturday',
                            date: daysArr[6],
                            Outlets: saturdayArr
                        })
                    }
                }
            }

            return thisData;
        };

        await _.each(result, async function (thisData) {
            totalData.push(totalD(thisData));
        });

        return Promise.all(totalData).then(async function () {
            let result = arr.filter(function (a) {
                let r = a.Outlets && a.Outlets.length > 0 && a.Outlets.filter(function (b) {
                    return (!this[b.id]) && (this[b.id] = true);
                }, Object.create(null));
                a.Outlets = r;
                return (!this[a.day]) && (this[a.day] = true);
            }, Object.create(null));

            result.sort(function (a, b) {
                return weekorder[a.day] - weekorder[b.day];
            });

            if (!req.query.search) {
                let promise = [];
                let other = await exports.getVisit(req.user.id, null, req.query.project_id, 'others', ids, today.toLowerCase());

                if (other && other.length > 0) {
                    let otherD = async function (item) {
                        let out = await Outlets.findOne({ where: { id: item.outlet_id } });
                        out.dataValues.checkInStatus = item ? item.type == 0 ? "Ongoing" : "Visited" : null;
                        out.dataValues.visitation_id = item ? parseInt(item.id) : null;
                        out.dataValues.day = 'others';

                        let current = new Date(item.check_in).getDay();

                        let currDay = "";
                        for (key in weekorder) {
                            if (weekorder.hasOwnProperty(key)) {
                                let value = weekorder[key];

                                if (value == (current + 1)) {
                                    currDay = key;
                                }
                            }
                        }


                        if (result && result.length > 0) {
                            let foundDay = false;
                            await result.map(item => {
                                if (item.day === currDay) {
                                    foundDay = true;
                                    item.Outlets.push(out);
                                }
                            });

                            if (foundDay == false) {
                                let obj = {
                                    day: currDay,
                                    date: daysArr[current],
                                    Outlets: []
                                }
                                obj.Outlets.push(out);
                                result.push(obj);
                            }

                        } else if (result.length == 0 && item) {
                            let obj = {
                                day: currDay,
                                Outlets: []
                            }
                            obj.Outlets.push(out);
                            result.push(obj);
                        }
                        return item;
                    }

                    await _.each(other, async function (thisItem) {
                        promise.push(otherD(thisItem));
                    })
                }
                return Promise.all(promise).then(async function () {
                    let resultD = Object.values(
                        result.reduce((r, c) => {
                            r[c.day] = r[c.day] || {
                                day: c.day,
                                date: c.date,
                                Outlets: new Set()
                            };

                            c.Outlets.forEach((item) => r[c.day].Outlets.add(item));
                            return r;
                        }, Object.create(null))
                    )
                        .map((x) => ({
                            day: x.day,
                            date: x.date,
                            Outlets: [...x.Outlets]
                        }));

                    resultD.filter(function (a) {
                        let r = a.Outlets && a.Outlets.length > 0 && a.Outlets.filter(function (b) {
                            return (!this[b.id]) && (this[b.id] = true);
                        }, Object.create(null));
                        a.Outlets = r;
                        return (!this[a.day]) && (this[a.day] = true);
                    }, Object.create(null));

                    return ReS(res, "Outlet list fetched successfully!", {
                        payload: resultD
                    });
                });
            } else {
                let others = [];
                if (result.length > 0) {
                    let ot = result[0];
                    others = result[0].Outlets;
                    result.splice(0, 1);

                    for (let i = others.length - 1; i >= 0; i--) {
                        for (let j = 0; j < result.length; j++) {
                            for (let k = 0; k < result[j].Outlets.length; k++) {
                                if (others[i] && (others[i].id === result[j].Outlets[k].dataValues.id)) {
                                    others.splice(i, 1);
                                }
                            }
                        }
                    }
                    if (others.length > 0) {
                        result.push({ ...ot, Outlets: others });
                    }
                }

                result.filter(function (a) {
                    let r = a.Outlets && a.Outlets.length > 0 && a.Outlets.filter(function (b) {
                        return (!this[b.id]) && (this[b.id] = true);
                    }, Object.create(null));
                    a.Outlets = r;
                    return (!this[a.day]) && (this[a.day] = true);
                }, Object.create(null));

                return ReS(res, "Outlet list fetched successfully!", {
                    payload: result
                });
            }


        }).catch(function (err) {
            return ReE(res, err, 400);
        });

    })

};

module.exports.createOutlet = async function (req, res, next) {
    let postdata = req.body;

    req.checkBody({
        'project_id': {
            notEmpty: true,
            errorMessage: 'Project id is required'
        },
        'outlet_name': {
            notEmpty: true,
            errorMessage: 'Outlet name is required'
        },
        'outlet_email': {
            notEmpty: true,
            errorMessage: 'Outlet Email is required'
        },
        'outlet_contact': {
            notEmpty: true,
            errorMessage: "Outlet contact information is required"
        }
    });

    let errors = req.validationErrors();

    if (errors) {
        return ReE(res, errors[0].msg, 400);
    }

    postdata.outlet_url = req.file ? req.file.filename : null;
    postdata.status = 1;
    let coverage = postdata.coverage_days && JSON.parse(postdata.coverage_days);
    delete postdata.coverage_days;

    let arrayOfData = [];
    let projectDays = [];
    let projectOutletDay = [];
    postdata.outlet_name = postdata.outlet_name && postdata.outlet_name.trim();
    postdata.owner_name = postdata.owner_name && postdata.owner_name.trim();

    await Outlets.create(postdata).then(async (results) => {
        for (let i = 0; i < coverage.length; i++) {
            arrayOfData.push({
                outlet_id: results.id,
                days: coverage[i].days.toLowerCase(),
                status: 1,
                // start_time: coverage[i].start_time.toLowerCase().replace(/\s/g, ''),
                // end_time: coverage[i].end_time.toLowerCase().replace(/\s/g, '')
            });
            projectDays.push(coverage[i].days.toLowerCase());
        }
        projectOutletDay.push(projectDays[0]);

        await ProjectOutlets.create({
            project_id: postdata.project_id,
            outlet_id: results.id,
            project_days: JSON.stringify(projectOutletDay)
        }).then(() => {

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
    });
};

module.exports.addFeedback = async function (req, res, next) {
    let postdata = req.body;

    req.checkBody({
        'project_id': {
            notEmpty: true,
            errorMessage: 'Project id is required'
        },
        'outlet_id': {
            notEmpty: true,
            errorMessage: 'Outlet id is required'
        },
        'feedback_title': {
            notEmpty: true,
            errorMessage: 'Feedback Ttile is required'
        }
    });

    let errors = req.validationErrors();

    if (errors) {
        return ReE(res, errors[0].msg, 400);
    }

    await VisitationHistory.create({
        project_id: postdata.project_id,
        outlet_id: postdata.outlet_id,
        feedback_title: postdata.feedback_title,
        feedback_description: postdata.feedback_description,
        check_in: new Date(),
        check_out: new Date(),
        type: 2,
        user_id: req.user.id,
        day: postdata.day ? postdata.day : null
    }).then(result => {
        if (result.id) {
            return ReS(res, "Feedback submitted successfully!");
        } else {
            return ReE(res, "Feedback failed to submit!");
        }
    })

};

module.exports.changeStatus = async function (req, res, next) {
    let postdata = req.body;
    let startOfWeek = moment().startOf('week').toDate();
    let endOfWeek = moment().endOf('week').toDate();

    let logData = req.body;
    logData.date = new Date() + "\n";
    logData.user_id = req.user;
    let fpath = path.join(process.cwd(), 'public/analyze-log.txt')
    const myConsole = new console.Console(fs.createWriteStream(fpath, { flags: 'a' }));
    myConsole.log(logData);

    req.checkBody({
        'project_id': {
            notEmpty: true,
            errorMessage: 'Project id is required'
        },
        'outlet_id': {
            notEmpty: true,
            errorMessage: 'Outlet id is required'
        },
        'type': {
            notEmpty: true,
            errorMessage: 'Type is required'
        },
        'day': {
            notEmpty: true,
            errorMessage: 'Day is required'
        }
    });

    let errors = req.validationErrors();

    if (errors) {
        return ReE(res, errors[0].msg, 400);
    }

    let usersArr = await UserProjects.findAll({
        where: {
            project_id: postdata.project_id,
            user_id: { [Op.ne]: req.user.id }
        }
    });
    let outletD = await Outlets.findOne({ where: { id: postdata.outlet_id }, attributes: ['outlet_name'] });
    let projectD = await Projects.findOne({ where: { id: postdata.project_id }, attributes: ['title'] });
    let oname = outletD && outletD.outlet_name && outletD.outlet_name;
    let projname = projectD && projectD.title && projectD.title;
    usersArr = _.pluck(usersArr, 'user_id');

    if (postdata.type == 0) {
        await VisitationHistory.create({
            project_id: postdata.project_id,
            outlet_id: postdata.outlet_id,
            check_in: new Date(),
            type: postdata.type,
            user_id: req.user.id,
            reason: postdata.reason ? postdata.reason : null,
            day: postdata.day ? postdata.day : null
        }).then(async result => {
            if (result.id) {
                let data = {
                    title: oname + " outlet has been checked-in!",
                    body: oname + " outlet has been checked-in successfully for project " + projname + " !",
                    data: {
                        title: oname + " outlet has been checked-in!",
                        body: oname + " outlet has been checked-in successfully for project " + projname + " !",
                    },
                    usersArr: usersArr,
                    type: "Check-in"
                }
                await notificationEvents.emit("sendNotification", data, async function (responseData) {
                    return ReS(res, "Check-In successfully!", { payload: { visitation_id: parseInt(result.id) } });
                });

            } else {
                return ReE(res, "Failed to check-in!");
            }
        });

    } else {
        await VisitationHistory.update({
            project_id: postdata.project_id,
            outlet_id: postdata.outlet_id,
            check_out: new Date(),
            type: postdata.type,
            user_id: req.user.id
        }, {
            where: {
                id: postdata.visitation_id,
                type: 0
            }
        }).then(async result => {
            let data = {
                title: oname + " outlet has been checked-out!",
                body: oname + " outlet has been checked-out successfully for project " + projname + " !",
                data: {
                    title: oname + " outlet has been checked-out!",
                    body: oname + " outlet has been checked-out successfully for project " + projname + " !",
                },
                usersArr: usersArr,
                type: "Check-out"
            }
            await notificationEvents.emit("sendNotification", data, async function (responseData) {
                return ReS(res, "Check-Out successfully!", { payload: { visitation_id: parseInt(postdata.visitation_id) } });
            });

        }).catch(err => {
            return ReE(res, "Failed to check-out!");
        });
    }

};

module.exports.executionUrl = async function (req, res, next) {
    let postdata = req.body;
    let visitD = await VisitationHistory.findOne({
        where: {
            id: postdata.visitation_id
        }
    });

    if (req.file) {
        let visit_img = visitD.execution_url;
        let allQR = [];

        for (let i = 0; i < visit_img.length; i++) {
            let u = (visit_img[i].url).substring(
                (visit_img[i].url).lastIndexOf("/") + 1, (visit_img[i].url).length);
            allQR.push(u);
        }

        allQR.push(req.file.filename)

        let pdata = {
            execution_url: JSON.stringify(allQR)
        };

        await VisitationHistory.update(pdata, {
            where: {
                id: postdata.visitation_id
            }
        }).then(async () => {
            await VisitationHistory.findOne({
                where: {
                    id: postdata.visitation_id
                },
                attributes: ['execution_url']
            }).then(result => {
                return ReS(res, "Execution image uploaded successfully!", {
                    payload: result.execution_url
                });
            })

        }).catch(err => {
            return ReE(res, err, 400);
        });

    } else {
        return ReE(res, "Execution image failed to upload!");
    }
}

module.exports.deleteExecutionUrl = async function (req, res, next) {
    let postdata = req.body;
    if (postdata.visitation_id) {
        await VisitationHistory.findOne({
            where: {
                id: postdata.visitation_id
            },
            attributes: ['execution_url']
        }).then(result => {
            let found = false;
            if (result.execution_url.length > 0) {
                let allQR = [];
                let visit_img = result.execution_url;
                for (let i = 0; i < visit_img.length; i++) {
                    let u = (visit_img[i].url).substring(
                        (visit_img[i].url).lastIndexOf("/") + 1, (visit_img[i].url).length);
                    allQR.push(u);
                }
                let qr_array = allQR;

                for (let j = 0; j < qr_array.length; j++) {
                    if (postdata.url.includes(qr_array[j])) {
                        const pathToFile = "public/media/thumbnail/" + qr_array[j];
                        found = true;
                        fs.unlink(pathToFile, async function (err) {
                            if (err) {
                                console.log(err)
                                return ReS(res, "Failed to delete!");
                            } else {
                                qr_array.splice(j, 1);
                                await VisitationHistory.update({
                                    execution_url: qr_array.length > 0
                                        ? JSON.stringify(qr_array) : null
                                }, {
                                    where: {
                                        id: postdata.visitation_id
                                    }
                                });
                                await VisitationHistory.findOne({
                                    where: {
                                        id: postdata.visitation_id
                                    },
                                    attributes: ['execution_url']
                                }).then(result => {
                                    return ReS(res, "Execution image deleted successfully!", {
                                        payload: result.execution_url
                                    });
                                })
                            }
                        });
                        break;
                    }
                }
                if (!found) {
                    return ReE(res, "Execution image not found for url provided!");
                }
            }
            else {
                return ReE(res, "Execution images not found for visitation Id provided!")
            }
        });
    }
}

module.exports.getExecutionUrlList = async function (req, res, next) {
    let postdata = req.query;
    if (postdata.visitation_id != "" && postdata.visitation_id != undefined) {
        await VisitationHistory.findOne({
            where: {
                id: postdata.visitation_id
            },
            attributes: ['execution_url']
        }).then(result => {
            return ReS(res, "Execution image fetched successfully!", {
                payload: result.execution_url
            });
        });
    } else {
        return ReE(res, "Visitation Id not provided!")
    }
}

module.exports.getGeneralConfigs = async function (req, res, next) {
    let pdpaD = await PDPA.findAll({ raw: true });
    await GeneralConfigs.findOne({ where: { id: 1 } }).then(async result => {
        if (result) {
            result.dataValues.gender = result.dataValues.gender && JSON.parse(result.dataValues.gender);
            result.dataValues.age_group = result.dataValues.age_group && JSON.parse(result.dataValues.age_group);
            result.dataValues.group_segment = result.dataValues.group_segment && JSON.parse(result.dataValues.group_segment);

            let brands_variant = await BrandsVariant.findAll({
                where: { status: 1 }, attributes: ['id',
                    'brands', 'variants']
            });

            result.dataValues.brands_variant = brands_variant;
            result.dataValues.PDPA = pdpaD;
            return ReS(res, "General configs found!", { payload: result });
        } else {
            return ReE(res, "No general configs found!");
        }
    })
}

module.exports.addSales = async function (req, res, next) {
    let postdata = req.body;

    req.checkBody({
        'project_id': {
            notEmpty: true,
            errorMessage: 'Project id is required'
        },
        'outlet_id': {
            notEmpty: true,
            errorMessage: 'Outlet id is required'
        },
        'visitation_id': {
            notEmpty: true,
            errorMessage: 'Visitation id is required'
        },
    });

    let errors = req.validationErrors();

    if (errors) {
        return ReE(res, errors[0].msg, 400);
    }
    if (postdata.products) {
        postdata.products = await isJSON(postdata.products) ? JSON.parse(postdata.products) : postdata.products;
    }
    let usersArr = await UserProjects.findAll({
        where: { project_id: postdata.project_id }
    });
    usersArr = _.pluck(usersArr, 'user_id');
    let projectD = await Projects.findOne({ where: { id: postdata.project_id }, attributes: ['title'] });

    let projname = projectD && projectD.title && projectD.title;
    let stockPArr = await Stocks.findAll({
        where: {
            project_id: postdata.project_id
        }
    });
    let stockArr = _.uniq(_.pluck(stockPArr, 'id'));
    let prodArr = _.uniq(_.pluck(stockPArr, 'product_id'));
    let promises = [];
    if (postdata.products && postdata.products.length > 0) {
        let products = postdata.products;
        postdata.user_id = req.user.id;
        postdata.status = 1;
        postdata.isEffective = 1;
        delete postdata.products;

        await Orders.create(postdata).then(async result => {
            let arrayOfData = [];
            for (let i = 0; i < products.length; i++) {
                await OrderDetails.create({
                    order_id: result.id,
                    product_id: products[i].product_id,
                    quantity: products[i].quantity,
                    amount: products[i].amount,
                    total_amount: products[i].amount * products[i].quantity,
                    isOutletStock: products[i].isOutletStock === "false" ? 0 : products[i].isOutletStock == false ? 0 : products[i].isOutletStock
                });
            }

            let totalD = async function (valuei) {
                if (valuei.isOutletStock == 0 || valuei.isOutletStock === "false" || valuei.isOutletStock == false) {
                    let productFound = await Products.findOne({
                        where: {
                            id: valuei.product_id, status: 1
                        }
                    });
                    if (productFound) {

                        let found = await Stocks.findOne({
                            where: {
                                product_id: valuei.product_id,
                                project_id: postdata.project_id
                            }
                        });
                        if (found) {
                            let created = await StocksHistory.create({
                                stock_id: found.id,
                                quantity: "-" + valuei.quantity,
                                status: 1,
                                order_id: result.id
                            });
                            promises.push(created);
                            return created;
                        }
                    }
                }
            }

            await _.each(products, async function (valuei) {
                await promises.push(totalD(valuei))
            })
            return Promise.all(promises).then(async function () {
                let open = await StocksHistory.findAll({
                    where: {
                        stock_id: { [Op.in]: stockArr },
                        status: { [Op.in]: [0, 1] }
                    },
                    attributes: [[sequelize.fn('sum', sequelize.col('quantity')), 'total_sales']]
                }).then(response => {
                    return response[0] ? response[0].dataValues.total_sales : null;
                });
                if (open && (parseInt(open) === 0)) {
                    let data = {
                        title: "Congratulations! Target achieved!",
                        body: "Target achieved for project " + projname + " !",
                        data: {
                            title: "Congratulations! Target achieved!",
                            body: "Target achieved for project " + projname + " !",
                        },
                        usersArr: usersArr,
                        type: "Target achieved"
                    }
                    await notificationEvents.emit("sendNotification", data, async function (responseData) {
                        return ReS(res, "Sales order placed successfully!");
                    });
                } else {
                    return ReS(res, "Sales order placed successfully!");
                }

            }).catch(function (err) {
                return ReE(res, err, 400);
            });
        })


    } else {
        postdata.user_id = req.user.id;
        postdata.status = 1;
        postdata.isEffective = 0;
        await Orders.create(postdata).then(result => {
            return ReS(res, "Sales order placed successfully!");
        }).catch(function (err) {
            return ReE(res, err, 400);
        });
    }

}

module.exports.getOutletDetailsById = async function (req, res, next) {
    let postdata = req.body;

    req.checkBody({
        'project_id': {
            notEmpty: true,
            errorMessage: 'Project id is required'
        },
        'outlet_id': {
            notEmpty: true,
            errorMessage: 'Outlet id is required'
        },
        'day': {
            notEmpty: true,
            errorMessage: 'Day is required'
        },
    });

    let errors = req.validationErrors();

    if (errors) {
        return ReE(res, errors[0].msg, 400);
    }

    if (postdata.visitation_id) {
        let effectiveCount = await Orders.count({
            where: {
                visitation_id: postdata.visitation_id,
                project_id: postdata.project_id,
                outlet_id: postdata.outlet_id,
                user_id: req.user.id,
                isEffective: 1,
                status: { [Op.ne]: 2 }
            }
        });
        let totalO = await Orders.findAll({
            where: {
                visitation_id: postdata.visitation_id,
                project_id: postdata.project_id,
                outlet_id: postdata.outlet_id,
                user_id: req.user.id,
                status: 1
            },
        });
        let order_id = _.pluck(totalO, 'id');
        let packSold = await OrderDetails.findAll({
            where: {
                order_id: { [Op.in]: order_id }
            },
            attributes: [[sequelize.fn('sum', sequelize.col('quantity')), 'total_sales']]
        });

        let visitHis = await VisitationHistory.findAll({
            where: {
                id: postdata.visitation_id,
                project_id: postdata.project_id,
                outlet_id: postdata.outlet_id,
                user_id: req.user.id,
                day: postdata.day
            },
            limit: 1,
            order: [['id', 'DESC']]
        });
        let effectiveData = await Orders.findAll({
            where: {
                visitation_id: postdata.visitation_id,
                project_id: postdata.project_id,
                outlet_id: postdata.outlet_id,
                user_id: req.user.id,
                isEffective: 1,
                status: { [Op.ne]: 2 }
            },
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [{
                model: OrderDetails,
                required: true,
                include: [{
                    model: Products,
                    attributes: ["name"]
                }]
            }]
        });
        let non_effectiveData = await Orders.findAll({
            where: {
                visitation_id: postdata.visitation_id,
                project_id: postdata.project_id,
                outlet_id: postdata.outlet_id,
                user_id: req.user.id,
                isEffective: 0,
                status: { [Op.ne]: 2 },
            },
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        await effectiveData.map(async thisD => {
            let sum = 0;
            await thisD.OrderDetails.map(thisDa => {
                thisDa.dataValues.product_name = thisDa.dataValues.Product.name;
                sum = sum + thisDa.dataValues.total_amount;
                thisD.dataValues.orderTotalAmount = sum;
                delete thisDa.dataValues.Product;
                return thisDa;
            })
        });

        return ReS(res, "", {
            payload: {
                total_sold: packSold.length > 0 ? packSold[0].dataValues.total_sales ? parseInt(packSold[0].dataValues.total_sales) : 0 : 0,
                effectiveCount,
                effectiveData: effectiveData ? effectiveData : [],
                non_effectiveData: non_effectiveData ? non_effectiveData : [],
                visitation_id: parseInt(postdata.visitation_id),
                checkInStatus: visitHis ? visitHis[0].type == 0 ? "Ongoing" : "Visited" : null
            }
        });
    } else {
        let start = moment().set({ hours: 0, minute: 0, second: 0 });
        let end = moment().set({ hours: 23, minute: 59, second: 59 });
        await VisitationHistory.findAll({
            where: {
                project_id: postdata.project_id,
                outlet_id: postdata.outlet_id,
                user_id: req.user.id,
                type: { [Op.ne]: 2 },
                check_in: { [Op.between]: [start, end] },
                day: postdata.day
            },
            limit: 1,
            order: [['id', 'DESC']]
        }).then(result => {
            if (result && result.length > 0) {
                return ReS(res, "Visitation Id fetched!", {
                    payload: {
                        total_sold: 0,
                        effectiveCount: 0,
                        effectiveData: [],
                        non_effectiveData: [],
                        visitation_id: parseInt(result[0].id),
                        checkInStatus: result[0].type == 0 ? "Ongoing" : "Visited"
                    }
                });
            } else {
                return ReS(res, "Visitation Id fetched!", {
                    payload: {
                        total_sold: 0,
                        effectiveCount: 0,
                        effectiveData: [],
                        non_effectiveData: [],
                        visitation_id: null,
                        checkInStatus: null
                    }
                });
            }
        });
    }
}

module.exports.cancelOrder = async function (req, res, next) {
    let postdata = req.body;

    await Orders.update({ status: 2 }, {
        where: {
            id: postdata.order_id,
            user_id: req.user.id,
        }
    }).then(async updated => {
        let promises = [];
        if (updated) {
            let data = await OrderDetails.findAll({
                where: {
                    order_id: postdata.order_id
                }
            });
            Object.entries(data).forEach(async ([keyi, valuei]) => {
                let found = await Stocks.findOne({
                    where: {
                        product_id: valuei.product_id, project_id: postdata.project_id
                    }
                });
                if (found) {
                    let created = await StocksHistory.update({ status: 2 }, {
                        where: {
                            stock_id: found.id,
                            status: 1,
                            order_id: postdata.order_id
                        }
                    });
                    promises.push(created);
                    return created;
                }

            });
            return Promise.all(promises).then(function () {
                return ReS(res, "Order canceled successfully!");
            }).catch(function (err) {
                return ReE(res, err, 400);
            });

        } else {
            return ReE(res, "Failed to update order!");
        }
    }).catch(err => {
        return ReE(res, "Failed to update order!");
    });
}

module.exports.getEffectiveOrders = async function (req, res, next) {
    let query = req.query;

    req.checkQuery({
        'project_id': {
            notEmpty: true,
            errorMessage: 'Project id is required'
        },
        'outlet_id': {
            notEmpty: true,
            errorMessage: 'Outlet id is required'
        },
    });

    let errors = req.validationErrors();

    if (errors) {
        return ReE(res, errors[0].msg, 400);
    }

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

    let count = await Orders.count({
        where: {
            visitation_id: query.visitation_id,
            project_id: query.project_id,
            outlet_id: query.outlet_id,
            user_id: req.user.id,
            isEffective: 1,
            status: { [Op.ne]: 2 }
        },
        include: [{
            model: OrderDetails,
            required: true,
            include: [{
                model: Products,
                attributes: ["name"]
            }]
        }]
    });

    let effectiveData = await Orders.findAll({
        where: {
            visitation_id: query.visitation_id,
            project_id: query.project_id,
            outlet_id: query.outlet_id,
            user_id: req.user.id,
            isEffective: 1,
            status: { [Op.ne]: 2 }
        },
        limit: limit,
        offset: offset,
        order: [[sortBy, sortOrder]],
        include: [{
            model: OrderDetails,
            required: true,
            include: [{
                model: Products,
                attributes: ["name"]
            }]
        }]
    });

    await effectiveData.map(async thisD => {
        let sum = 0;
        await thisD.OrderDetails.map(thisDa => {
            thisDa.dataValues.product_name = thisDa.dataValues.Product.name;
            sum = sum + thisDa.dataValues.total_amount;
            thisD.dataValues.orderTotalAmount = sum;
            delete thisDa.dataValues.Product;
            return thisDa;
        })
    });

    return ReS(res, "Visitation Id fetched!", {
        payload: {
            effectiveCount: count,
            effectiveData: effectiveData ? effectiveData : [],
        }
    });
}

module.exports.getNonEffectiveOrders = async function (req, res, next) {
    let query = req.query;

    req.checkQuery({
        'project_id': {
            notEmpty: true,
            errorMessage: 'Project id is required'
        },
        'outlet_id': {
            notEmpty: true,
            errorMessage: 'Outlet id is required'
        },
    });

    let errors = req.validationErrors();

    if (errors) {
        return ReE(res, errors[0].msg, 400);
    }

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

    let count = await Orders.count({
        where: {
            visitation_id: query.visitation_id,
            project_id: query.project_id,
            outlet_id: query.outlet_id,
            user_id: req.user.id,
            isEffective: 0,
            status: { [Op.ne]: 2 }
        },
    });

    let effectiveData = await Orders.findAll({
        where: {
            visitation_id: query.visitation_id,
            project_id: query.project_id,
            outlet_id: query.outlet_id,
            user_id: req.user.id,
            isEffective: 0,
            status: { [Op.ne]: 2 }
        },
        limit: limit,
        offset: offset,
        order: [[sortBy, sortOrder]],
    });

    return ReS(res, "Non Effective list fetched!", {
        payload: {
            non_effectiveCount: count,
            non_effectiveData: effectiveData ? effectiveData : [],
        }
    });
}

module.exports.sendSMS = async function (req, res, next) {
    let postdata = req.body.number;
    let rand_otp = randomNum(4);
    setRadisByKeyTime(postdata, JSON.stringify(rand_otp), 0.5);

    let user = CONFIG.SMS_USERNAME; //user isms username 
    let pass = CONFIG.SMS_PASSWORD; //user isms password 
    let dstno = postdata; //You are going compose a message to this destination number. 
    let str = "Your verification code is " + rand_otp;
    let msg = str.replace(" ", "%20");
    let type = 1; //for unicode change to 2, normal will the 1. 

    let url = CONFIG.SMS_URL;

    request.get(url, async function (error, response, body) {
        if (body === "2000 = SUCCESS") {
            return ReS(res, "OTP sent successfully.");
        } else {
            return ReE(res, "Failed to send OTP!");
        }
    });
}

module.exports.verifyOTP = async function (req, res, next) {
    let postdata = req.body;
    getRadisByKey(postdata.number, async function (result) {
        if (result != undefined && result == postdata.otp) {
            return ReS(res, "User found with correct OTP");
        }
        else if (result != undefined && result != postdata.otp) {
            return ReE(res, "Incorrect OTP");
        }
        else {
            return ReE(res, "OTP expired");
        }
    });

}

async function syncCancelOrder(data, callback) {
    let postdata = data;

    await Orders.update({ status: data.status }, {
        where: {
            id: postdata.id,
            user_id: data.user_id,
        }
    }).then(async updated => {
        let promises = [];
        if (updated) {
            let data = await OrderDetails.findAll({
                where: {
                    order_id: postdata.id
                }
            });
            Object.entries(data).forEach(async ([keyi, valuei]) => {
                let found = await Stocks.findOne({
                    where: {
                        product_id: valuei.product_id, project_id: postdata.project_id
                    }
                });
                if (found) {
                    let created = await StocksHistory.update({ status: 2 }, {
                        where: {
                            stock_id: found.id,
                            status: 1,
                            order_id: postdata.id
                        }
                    });
                    promises.push(created);
                    return created;
                }

            });
            return Promise.all(promises).then(function () {
                return callback({ code: 200, data: "Order canceled successfully!" });
            }).catch(function (err) {
                return callback({ code: 400, data: null });
            });

        } else {
            return callback({ code: 400, data: null });
        }
    }).catch(err => {
        return callback({ code: 400, data: null });
    });
}

module.exports.sync = async function (req, res, next) {
    let data = req.body;

    let logData = req.body;
    logData.date = new Date() + "\n";
    let fpath = path.join(process.cwd(), 'public/analyze-log.txt')
    const myConsole = new console.Console(fs.createWriteStream(fpath, { flags: 'a' }));
    myConsole.log(logData);

    data.outlets = data.outlets && await isJSON(data.outlets)
        ? JSON.parse(data.outlets) : data.outlets;

    let promises = [];

    try {
        if (data.outlets && data.outlets.length > 0) {

            data.outlets = data.outlets.filter((item) => item.checkInStatus != null);

            if (data.OrderData && data.OrderData.length > 0) {
                data.OrderData = data.OrderData && await isJSON(data.OrderData)
                    ? JSON.parse(data.OrderData) : data.OrderData;

                data.OrderDetails = data.OrderDetails && await isJSON(data.OrderDetails)
                    ? JSON.parse(data.OrderDetails) : data.OrderDetails;
                let newVisitOrders = data.OrderData && data.OrderData.filter(async item => {
                    let visitF = await VisitationHistory.findOne({ where: { id: item.visitation_id } });
                    if (!visitF) {
                        return item;
                    }
                });

                data.OrderData = data.OrderData.filter(function (el) {
                    return !newVisitOrders.includes(el);
                });
            }


            for (let i = 0; i < data.outlets.length; i++) {
                let postdata = data.outlets[i];

                let foundone = await VisitationHistory.findOne({
                    where: {
                        id: postdata.visitation_id
                    }
                });

                if (postdata.checkInStatus == "Ongoing" || (postdata.checkInStatus == "Visited" && !foundone)) {

                    await VisitationHistory.create({
                        project_id: postdata.project_id,
                        outlet_id: postdata.id,
                        check_in: postdata.updatedAt,
                        check_out: postdata.checkInStatus == "Ongoing" ? null : postdata.updatedAt,
                        type: postdata.checkInStatus == "Ongoing" ? 0 : 1,
                        user_id: req.user.id,
                        createdAt: postdata.updatedAt,
                        updatedAt: postdata.updatedAt,
                        day: postdata.day ? postdata.day : null
                    }).then(result => {
                        if (newVisitOrders && newVisitOrders.length > 0) {
                            let data1 = newVisitOrders.filter(item => {
                                if (item.project_id == postdata.project_id && item.outlet_id == postdata.id) {
                                    return item;
                                }
                            })

                            Object.entries(data1).forEach(async ([keyi, valuei]) => {
                                if (valuei.project_id == postdata.project_id && valuei.outlet_id == postdata.id) {
                                    let o_id = valuei.id;
                                    delete valuei.id;
                                    valuei.visitation_id = result.id;
                                    return Orders.create(valuei).then(async oResult => {
                                        if (data.OrderDetails && data.OrderDetails.length > 0) {
                                            let d = data.OrderDetails && data.OrderDetails.filter(item => {
                                                if (item.o_id == o_id) {
                                                    return item;
                                                }
                                            });
                                            Object.entries(d).forEach(async ([keyi, valuei]) => {
                                                valuei.order_id = oResult.id;
                                                let newPromise = await OrderDetails.create(valuei);
                                                if (valuei.isOutletStock == 0 || valuei.isOutletStock === "false" || valuei.isOutletStock == false) {
                                                    let productFound = await Products.findOne({
                                                        where: {
                                                            id: valuei.product_id, status: 1
                                                        }
                                                    });
                                                    if (productFound) {

                                                        let found = await Stocks.findOne({
                                                            where: {
                                                                product_id: valuei.product_id, project_id: postdata.project_id
                                                            }
                                                        });
                                                        if (found) {
                                                            let created = await StocksHistory.create({
                                                                stock_id: found.id,
                                                                quantity: "-" + valuei.quantity,
                                                                status: 1,
                                                                order_id: valuei.order_id
                                                            });
                                                            promises.push(created);
                                                            return created;
                                                        }
                                                    }
                                                } else {
                                                    promises.push(newPromise);
                                                    return newPromise;
                                                }
                                            });
                                        }

                                    });

                                }
                            });
                        }
                    });



                } else {
                    await VisitationHistory.update({
                        project_id: postdata.project_id,
                        outlet_id: postdata.id,
                        check_out: postdata.updatedAt,
                        type: postdata.checkInStatus == "Ongoing" ? 0 : 1,
                        user_id: req.user.id,
                        updatedAt: postdata.updatedAt,
                        day: postdata.day ? postdata.day : null
                    }, {
                        where: {
                            id: postdata.visitation_id,
                            type: 0
                        }
                    }).then(result => {
                        promises.push(result);
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }

            if (data.OrderData && data.OrderData.length > 0) {
                Object.entries(data.OrderData).forEach(async ([keyi, valuei]) => {
                    let o_id = valuei.id;
                    let project_id = valuei.project_id;

                    let orderExist = await Orders.findOne({
                        where: { id: o_id, visitation_id: valuei.visitation_id }
                    });
                    if (orderExist) {
                        await syncCancelOrder(valuei, async function (req, responseData) {
                            promises.push(responseData);
                            return responseData;
                        });
                    } else {
                        delete valuei.id;
                        return Orders.create(valuei).then(async oResult => {
                            if (data.OrderDetails && data.OrderDetails.length > 0) {
                                let d = data.OrderDetails && data.OrderDetails.filter(item => {
                                    if (item.o_id == o_id) {
                                        return item;
                                    }
                                });
                                Object.entries(d).forEach(async ([keyi, valuei]) => {
                                    valuei.order_id = oResult.id;
                                    let newPromise = await OrderDetails.create(valuei);
                                    if (valuei.isOutletStock == 0 || valuei.isOutletStock === "false" || valuei.isOutletStock == false) {
                                        let productFound = await Products.findOne({
                                            where: {
                                                id: valuei.product_id, status: 1
                                            }
                                        });
                                        if (productFound) {

                                            let found = await Stocks.findOne({
                                                where: {
                                                    product_id: valuei.product_id, project_id: project_id
                                                }
                                            });
                                            if (found) {
                                                let created = await StocksHistory.create({
                                                    stock_id: found.id,
                                                    quantity: "-" + valuei.quantity,
                                                    status: 1,
                                                    order_id: valuei.order_id
                                                });
                                                promises.push(created);
                                                return created;
                                            }
                                        }
                                    } else {
                                        promises.push(newPromise);
                                        return newPromise;
                                    }
                                })
                            }
                        });
                    }

                });
            }

            return Promise.all(promises).then(function () {
                return ReS(res, "Data synced successfully!");
            }).catch(function (err) {
                let logData = { err };
                logData.date = new Date() + "\n";
                let fpath = path.join(process.cwd(), 'public/analyze-err.txt')
                const myConsole = new console.Console(fs.createWriteStream(fpath, { flags: 'a' }));
                myConsole.log(logData);
                return ReE(res, err, 400);
            });
        } else {
            if (data.OrderData && data.OrderData.length > 0) {
                data.OrderData = data.OrderData && await isJSON(data.OrderData)
                    ? JSON.parse(data.OrderData) : data.OrderData;

                data.OrderDetails = data.OrderDetails && await isJSON(data.OrderDetails)
                    ? JSON.parse(data.OrderDetails) : data.OrderDetails;

                Object.entries(data.OrderData).forEach(async ([keyi, valuei]) => {
                    let o_id = valuei.id;
                    let project_id = valuei.project_id;
                    delete valuei.id;
                    let found = await Orders.findOne({ where: { id: o_id } });
                    if (found) {
                        return Orders.update(valuei, { where: { id: o_id } }).then(async oResult => {
                            if (data.OrderDetails && data.OrderDetails.length > 0) {
                                let d = data.OrderDetails && data.OrderDetails.filter(item => {
                                    if (item.o_id == o_id) {
                                        return item;
                                    }
                                });
                                Object.entries(d).forEach(async ([keyi, valuei]) => {
                                    valuei.order_id = valuei.o_id;
                                    let newPromise = await OrderDetails.create(valuei);
                                    if (valuei.isOutletStock == 0 || valuei.isOutletStock === "false" || valuei.isOutletStock == false) {
                                        let productFound = await Products.findOne({
                                            where: {
                                                id: valuei.product_id, status: 1
                                            }
                                        });
                                        if (productFound) {

                                            let found = await Stocks.findOne({
                                                where: {
                                                    product_id: valuei.product_id, project_id: project_id
                                                }
                                            });
                                            if (found) {
                                                let created = await StocksHistory.create({
                                                    stock_id: found.id,
                                                    quantity: "-" + valuei.quantity,
                                                    status: 1,
                                                    order_id: valuei.order_id
                                                });
                                                promises.push(created);
                                                return created;
                                            }
                                        }
                                    } else {
                                        promises.push(newPromise);
                                        return newPromise;
                                    }
                                })
                            } else if (valuei.status == 2) {

                                let dataOd = await OrderDetails.findAll({
                                    where: {
                                        order_id: o_id
                                    }
                                });
                                Object.entries(dataOd).forEach(async ([keyi, valuei]) => {
                                    let founds = await Stocks.findOne({
                                        where: {
                                            product_id: valuei.product_id, project_id: project_id
                                        }
                                    });
                                    if (founds) {
                                        let created = await StocksHistory.update({ status: 2 }, {
                                            where: {
                                                stock_id: founds.id,
                                                status: 1,
                                                order_id: o_id
                                            }
                                        });
                                        promises.push(created);
                                        return created;
                                    }
                                });
                            }
                        });
                    } else {
                        return Orders.create(valuei).then(async oResult => {
                            let project_id = oResult.project_id;
                            if (data.OrderDetails && data.OrderDetails.length > 0) {
                                let d = data.OrderDetails && data.OrderDetails.filter(item => {
                                    if (item.o_id == o_id) {
                                        return item;
                                    }
                                });
                                Object.entries(d).forEach(async ([keyi, valuei]) => {
                                    valuei.order_id = oResult.id;
                                    let newPromise = await OrderDetails.create(valuei);
                                    if (valuei.isOutletStock == 0 || valuei.isOutletStock === "false" || valuei.isOutletStock == false) {
                                        let productFound = await Products.findOne({
                                            where: {
                                                id: valuei.product_id, status: 1
                                            }
                                        });
                                        if (productFound) {

                                            let found = await Stocks.findOne({
                                                where: {
                                                    product_id: valuei.product_id, project_id: project_id
                                                }
                                            });
                                            if (found) {
                                                let created = await StocksHistory.create({
                                                    stock_id: found.id,
                                                    quantity: "-" + valuei.quantity,
                                                    status: 1,
                                                    order_id: valuei.order_id
                                                });
                                                promises.push(created);
                                                return created;
                                            }
                                        }
                                    } else {
                                        promises.push(newPromise);
                                        return newPromise;
                                    }
                                })
                            }

                        });
                    }

                });

                return Promise.all(promises).then(function () {
                    return ReS(res, "Data synced successfully!");
                }).catch(function (err) {
                    let logData = { err };
                    logData.date = new Date() + "\n";
                    let fpath = path.join(process.cwd(), 'public/analyze-err.txt')
                    const myConsole = new console.Console(fs.createWriteStream(fpath, { flags: 'a' }));
                    myConsole.log(logData);
                    return ReE(res, err, 400);
                });

            }
        }
    } catch (err) {
        let logData = { err };
        logData.date = new Date() + "\n";
        let fpath = path.join(process.cwd(), 'public/analyze-err.txt')
        const myConsole = new console.Console(fs.createWriteStream(fpath, { flags: 'a' }));
        myConsole.log(logData);
    }
}

module.exports.offlineExecutionUrl = async function (req, res, next) {
    let postdata = req.body && req.body.execution_url && await isJSON(req.body.execution_url) ? JSON.parse(req.body.execution_url) : req.body.execution_url;
    let promises = [];

    if (postdata.length > 0) {

        let logData = { execution_url: postdata.length };
        logData.date = new Date() + "\n";
        let fpath = path.join(process.cwd(), 'public/analyze-log.txt')
        const myConsole = new console.Console(fs.createWriteStream(fpath, { flags: 'a' }));
        myConsole.log(logData);


        for (let i = 0; i < postdata.length; i++) {

            if (postdata[i].visitation_id != 0) {
                async function doSomething(item) {
                    return new Promise(async (resolve, reject) => {
                        await imageUpload.uploadBase64(item.base64image, async function (responseD) {
                            if (responseD) {
                                resolve(responseD);
                            } else {
                                reject();
                            }
                        });
                    })
                }
                if (postdata[i].base64 && postdata[i].base64.length > 0) {
                    Promise.all(postdata[i].base64.map((item) => doSomething(item))).then(async result => {
                        let visitD = await VisitationHistory.findOne({
                            where: {
                                id: postdata[i].visitation_id
                            }
                        });
                        let visit_img = visitD.execution_url;
                        let allQR = [];

                        for (let j = 0; j < visit_img.length; j++) {
                            let u = (visit_img[j].url).substring(
                                (visit_img[j].url).lastIndexOf("/") + 1, (visit_img[j].url).length);
                            allQR.push(u);
                        }
                        allQR.push(result);
                        let merged = [].concat.apply([], allQR);
                        let updated = await VisitationHistory.update({ execution_url: JSON.stringify(merged) }, {
                            where: {
                                id: postdata[i].visitation_id
                            }
                        });
                        promises.push(updated);
                    }).catch(err => {
                        console.log(err);
                        let logData = { err };
                        logData.date = new Date() + "\n";
                        let fpath = path.join(process.cwd(), 'public/analyze-err.txt')
                        const myConsole = new console.Console(fs.createWriteStream(fpath, { flags: 'a' }));
                        myConsole.log(logData);
                    });
                }


            } else {
                async function doSomething(item) {
                    return new Promise(async (resolve, reject) => {
                        await imageUpload.uploadBase64(item.base64image, async function (responseD) {
                            if (responseD) {
                                resolve(responseD);
                            } else {
                                reject();
                            }
                        });
                    })
                }
                if (postdata[i].base64 && postdata[i].base64.length > 0) {
                    Promise.all(postdata[i].base64.map((item) => doSomething(item))).then(async result => {
                        let whereeq = { project_id: postdata[i].project_id, outlet_id: postdata[i].outlet_id, user_id: req.user.id };
                        whereeq[Op.and] = [
                            sequelize.where(sequelize.fn('date', sequelize.col('check_in')), '=', moment().format('YYYY-MM-DD'))
                        ]
                        let found = await VisitationHistory.findOne({
                            where: whereeq
                        });
                        if (found) {
                            let updated = await found.update({ execution_url: JSON.stringify(result) });
                            promises.push(updated);
                        }
                    }).catch(err => {
                        console.log(err);
                        let logData = { err };
                        logData.date = new Date() + "\n";
                        let fpath = path.join(process.cwd(), 'public/analyze-err.txt')
                        const myConsole = new console.Console(fs.createWriteStream(fpath, { flags: 'a' }));
                        myConsole.log(logData);
                    });
                }
            }
        }

        Promise.all(promises).then(result => {
            return ReS(res, "Execution urls uploaded successfully!");
        }).catch(err => {
            console.log(err);
            let logData = { err };
            logData.date = new Date() + "\n";
            let fpath = path.join(process.cwd(), 'public/analyze-err.txt')
            const myConsole = new console.Console(fs.createWriteStream(fpath, { flags: 'a' }));
            myConsole.log(logData);
            return ReE(res, "Not able to upload execution urls!")
        })
    }
}
