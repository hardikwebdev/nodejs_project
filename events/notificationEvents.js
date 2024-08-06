let admin = require("firebase-admin");
const pathtoServiceAcc = require("../config/certs/certs.json");
let _ = require('underscore');

admin.initializeApp({
    credential: admin.credential.cert(pathtoServiceAcc),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
};

let events = require('events');
const sequelize = require("../models").sequelize;
let notificationEmitter = new events.EventEmitter();
let moment = require("moment");
let Sequelize = require("sequelize");
const Op = Sequelize.Op;

let _ = require('underscore');

const Users = require("../models").Users;
const UserDeviceToken = require("../models").UserDeviceToken;
const Notifications = require("../models").Notifications;

let sendPush = async function (data) {
    let payload = {
        notification: {
            title: data.message.notification.title,
            body: data.message.notification.body
        },
        tokens: data.token,
        apns: {
            payload: {
                aps: {
                    sound: "default",
                },
            },
        },
    };
    await admin.messaging().sendMulticast(payload).then(async respon => {
        console.log("&&&&&&&&&", respon, data);
        if (respon.successCount > 0) {
            await Notifications.create({
                user_id: data.user_id,
                title: data.message.notification.title,
                data: data.type
            });
        }
        return (respon);
    }).catch(err => {
        console.log("************", err)
        return (err);
    });
}

// Bind the connection event with the function
notificationEmitter.on('sendNotification', async function (data, callback) {
    let newNotification = data;
    newNotification.usersArr = _.uniq(newNotification.usersArr);
    if (newNotification.usersArr.length > 0) {
        await _.each(newNotification.usersArr, async function (thisUSer) {
            UserDeviceToken.findAll({
                where: { user_id: thisUSer },
                raw: true
            }).then(async tokens => {
                let totalEx = [];
                let notificationData = {
                    notification: {
                        title: data.title,
                        body: data.body,
                        sound: 'default',
                        priority: 'high',
                        timeToLive: 60 * 60 * 24
                    }
                }

                if (newNotification.data) {
                    notificationData["data"] = newNotification.data
                }
                let tokensArr = _.pluck(tokens, "device_token");

                let thisRoom = { token: tokensArr, message: notificationData, type: newNotification.type, user_id: tokens[0].user_id };
                let sent = await sendPush(thisRoom);
                totalEx.push(sent);

                Promise.all(totalEx).then(result => {
                    return callback({ code: 200, data: "Notification sent!" });
                });

            }).catch(err => {
                return callback({ code: 400, data: "Notification failed to sent!" });
            });
        })
    } else {
        return callback({ code: 400, data: "Notification failed to sent!" });
    }
});

module.exports.notificationEmitter = notificationEmitter;