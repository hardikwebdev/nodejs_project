let express = require("express");

let controller = require("./index.controller");
let router = express.Router();

/**
 * 
 * @api {get} v1/notification  A. Notification List
 * @apiName Notification List
 * @apiGroup Notification(v1)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token

 * @apiParam {String} deviceId    deviceId of particuler user.
 * @apiParam {String} deviceType    deviceType of user to be login.
 

 * @apiSuccessExample Success Response

    * {
        "payload": {
        "data": {
            "count": 4,
            "rows": [
               
                {
                    "id": 1,
                    "user_id": 2,
                    "title": "Saino Softech outlet has been checked-in!",
                    "data": "Check-in",
                    "isRead": 1,
                    "deletedAt": null,
                    "createdAt": "2022-03-01T12:14:02.000Z",
                    "updatedAt": "2022-03-02T11:48:57.000Z"
                },
                {
                    "id": 2,
                    "user_id": 2,
                    "title": "Sorry! Your trade request has been rejected.",
                    "data": "Trade Request rejected",
                    "isRead": 1,
                    "deletedAt": null,
                    "createdAt": "2022-02-21T06:35:58.000Z",
                    "updatedAt": "2022-02-21T06:36:06.000Z"
                },
                {
                    "id": 3,
                    "user_id": 2,
                    "title": "Sorry! Your trade request has been rejected.",
                    "data": "Trade Request rejected",
                    "isRead": 1,
                    "deletedAt": null,
                    "createdAt": "2022-02-21T06:34:30.000Z",
                    "updatedAt": "2022-02-21T06:34:44.000Z"
                },
                {
                    "id": 4,
                    "user_id": 2,
                    "title": "Sorry! Your trade request has been rejected.",
                    "data": "Trade Request rejected",
                    "isRead": 1,
                    "deletedAt": null,
                    "createdAt": "2022-02-21T05:23:27.000Z",
                    "updatedAt": "2022-02-21T05:23:27.000Z"
                }
            ]
        }
    },
    "success": true,
    "message": "Notifications fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Notifications!",
     "code": 400
}
 */
router.get("/", controller.getList);

module.exports = router;
