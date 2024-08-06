let express = require("express");

let controller = require("./user-profile.controller");
let router = express.Router();
let upload = require("../../../middleware/image_upload")


/**
 * 
 * @api {post} v1/user-profile  A. Get User Profile
 * @apiName Get User Profile
 * @apiGroup User-Profile(v1)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token

* @apiSuccessExample Success Response
 * {
       "payload": {
        "profile_picture": "http://127.0.0.1:8005/media/thumbnail/FnYPE1Q4xA.jpeg",
        "qr_code": [],
        "id": 93,
        "system_id": "#19801821",
        "email": "kp@app.com",
        "username": "Cool",
        "contact_number": "1231231230",
        "resetToken": null,
        "last_login": null,
        "is_verified": null,
        "status": 1,
        "role_id": 1,
        "deletedAt": null,
        "createdAt": "2022-02-14T13:03:27.000Z",
        "updatedAt": "2022-02-14T13:03:27.000Z",
        "region_id": 2,
        "LoginHistories": [
            {
                "type": "login",
                "createdAt": "2022-04-20T07:45:52.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-18T10:22:31.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-16T12:23:09.000Z"
            },
            {
                "type": "logout",
                "createdAt": "2022-02-15T11:37:24.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-15T11:26:33.000Z"
            }
        ],
        "Notifications": [
            {
                "id": 1,
                "user_id": 93,
                "title": "game outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 0,
                "deletedAt": null,
                "createdAt": "2022-03-04T10:40:10.000Z",
                "updatedAt": "2022-03-04T10:40:10.000Z"
            },
            {
                "id": 2,
                "user_id": 93,
                "title": "game2 outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 0,
                "deletedAt": null,
                "createdAt": "2022-03-04T10:40:04.000Z",
                "updatedAt": "2022-03-04T10:40:04.000Z"
            },
        ],
        "projectsCount": 1,
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMsImlhdCI6MTY1MDQ0NTg1MywiZXhwIjo0MjQyNDQ1ODUzfQ.yvRGD0Z5S1m-jkl1KXSCxuEYViNGHox4YiWvCMO1GWU"
    },
    "success": true,
    "message": "User Profile",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "User not found!",
    "code": 401
}
 */
router.get("/", controller.getUser);

/**
 * 
 * @api {post} v1/user-profile  B. Update User Profile
 * @apiName Update User Profile
 * @apiGroup User-Profile(v1)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {string} username       User Username.
 * @apiParam {Number} email          Quantity.
 * @apiParam {file}   file           User Profile Image.

* @apiSuccessExample Success Response
 * {
       "payload": {
        "profile_picture": "http://127.0.0.1:8005/media/thumbnail/FnYPE1Q4xA.jpeg",
        "qr_code": [],
        "id": 93,
        "system_id": "#19801821",
        "email": "kp@app.com",
        "username": "Cool",
        "contact_number": "1231231230",
        "resetToken": null,
        "last_login": null,
        "is_verified": null,
        "status": 1,
        "role_id": 1,
        "deletedAt": null,
        "createdAt": "2022-02-14T13:03:27.000Z",
        "updatedAt": "2022-02-14T13:03:27.000Z",
        "region_id": 2,
        "LoginHistories": [
            {
                "type": "login",
                "createdAt": "2022-04-20T07:45:52.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-18T10:22:31.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-16T12:23:09.000Z"
            },
            {
                "type": "logout",
                "createdAt": "2022-02-15T11:37:24.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-15T11:26:33.000Z"
            }
        ],
        "Notifications": [
            {
                "id": 24838,
                "user_id": 93,
                "title": "game outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 0,
                "deletedAt": null,
                "createdAt": "2022-03-04T10:40:10.000Z",
                "updatedAt": "2022-03-04T10:40:10.000Z"
            },
            {
                "id": 24834,
                "user_id": 93,
                "title": "game2 outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 0,
                "deletedAt": null,
                "createdAt": "2022-03-04T10:40:04.000Z",
                "updatedAt": "2022-03-04T10:40:04.000Z"
            },
            {
                "id": 24829,
                "user_id": 93,
                "title": "gamer outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 0,
                "deletedAt": null,
                "createdAt": "2022-03-04T10:39:44.000Z",
                "updatedAt": "2022-03-04T10:39:44.000Z"
            },
            {
                "id": 24780,
                "user_id": 93,
                "title": "QA outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 0,
                "deletedAt": null,
                "createdAt": "2022-03-04T10:25:41.000Z",
                "updatedAt": "2022-03-04T10:25:41.000Z"
            },
            {
                "id": 24721,
                "user_id": 93,
                "title": "gamer outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 0,
                "deletedAt": null,
                "createdAt": "2022-03-04T06:01:37.000Z",
                "updatedAt": "2022-03-04T06:01:37.000Z"
            }
        ],
        "projectsCount": 1,
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMsImlhdCI6MTY1MDQ0NTg1MywiZXhwIjo0MjQyNDQ1ODUzfQ.yvRGD0Z5S1m-jkl1KXSCxuEYViNGHox4YiWvCMO1GWU"
    },
    "success": true,
    "message": "User Profile",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "User not found!",
    "code": 401
}
 */

router.post("/", upload.single('file'), controller.updateUser);

/**
 * 
 * @api {post} v1/user-profile/password  C. Update Password
 * @apiName Update Password
 * @apiGroup User-Profile(v1)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {string} oldPassword       User Old Password.
 * @apiParam {string} Password          User New Password.

* @apiSuccessExample Success Response
 * {
       "data": {
        "profile_picture": "http://127.0.0.1:8005/media/thumbnail/oNv26VFayo.png",
        "qr_code": [],
        "id": 93,
        "system_id": "#19801821",
        "email": "abc@app.com",
        "password": "$2a$10$P1p61te2uKaMZhCCzv.pIumtcHoKmfZFw/tUVIodoioX1ycgYgMQi",
        "username": "abcd",
        "contact_number": "1231231230",
        "resetToken": null,
        "last_login": null,
        "is_verified": null,
        "status": 1,
        "role_id": 1,
        "deletedAt": null,
        "createdAt": "2022-02-14T13:03:27.000Z",
        "updatedAt": "2022-04-20T09:34:15.652Z",
        "region_id": 2
    },
    "success": true,
    "message": "Password Update Successful",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to Update Password!",
    "code": 401
}
 */

router.post("/password", controller.changeUserPassword);

// router.post("/addUserImg", upload.single('file'), controller.addUserImg);

/**
 * 
 * @api {get} v1/user-profile/addQRCode  D. Add QR Code
 * @apiName Add QR Code
 * @apiGroup User-Profile(v1)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json

* @apiSuccessExample Success Response
 * {
        "payload": {
        "profile_picture": "http://127.0.0.1:8005/media/thumbnail/oNv26VFayo.png",
        "qr_code": [
            {
                "url": "http://127.0.0.1:8005/media/thumbnail/K9yieGrXMD.png"
            }
        ],
        "id": 93,
        "system_id": "#19801821",
        "email": "abc@app.com",
        "username": "abcd",
        "contact_number": "1231231230",
        "resetToken": null,
        "last_login": null,
        "is_verified": null,
        "status": 1,
        "role_id": 1,
        "deletedAt": null,
        "createdAt": "2022-02-14T13:03:27.000Z",
        "updatedAt": "2022-04-20T10:21:48.000Z",
        "region_id": 2,
        "LoginHistories": [
            {
                "type": "login",
                "createdAt": "2022-04-20T07:45:52.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-18T10:22:31.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-16T12:23:09.000Z"
            },
            {
                "type": "logout",
                "createdAt": "2022-02-15T11:37:24.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-15T11:26:33.000Z"
            }
        ],
        "Notifications": [
            {
                "id": 1,
                "user_id": 93,
                "title": "game outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 1,
                "deletedAt": null,
                "createdAt": "2022-03-04T10:40:10.000Z",
                "updatedAt": "2022-04-20T09:10:53.000Z"
            },
            {
                "id": 2,
                "user_id": 93,
                "title": "gamer outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 1,
                "deletedAt": null,
                "createdAt": "2022-03-04T06:01:37.000Z",
                "updatedAt": "2022-04-20T09:10:53.000Z"
            }
        ],
        "projectsCount": 1,
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMsImlhdCI6MTY1MDQ1MDEwOCwiZXhwIjo0MjQyNDUwMTA4fQ.PQEwIP7rDB939mgACWBBD4p084Xxa3gF01_2sXv6bNU"
    },
    "success": true,
    "message": "User payment QR uploaded successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "User payment QR failed to upload!",
    "code": 401
}
 */

router.post("/addQRCode", upload.single('file'), controller.addQRCode);

/**
 * 
 * @api {get} v1/user-profile/deleteQRCode  E. Delete QR Code
 * @apiName Delete QR Code
 * @apiGroup User-Profile(v1)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json

* @apiSuccessExample Success Response
 * {
        "payload": {
        "profile_picture": "http://127.0.0.1:8005/media/thumbnail/oNv26VFayo.png",
        "qr_code": [
            {
                "url": "http://127.0.0.1:8005/media/thumbnail/K9yieGrXMD.png"
            }
        ],
        "id": 93,
        "system_id": "#19801821",
        "email": "abc@app.com",
        "username": "abcd",
        "contact_number": "1231231230",
        "resetToken": null,
        "last_login": null,
        "is_verified": null,
        "status": 1,
        "role_id": 1,
        "deletedAt": null,
        "createdAt": "2022-02-14T13:03:27.000Z",
        "updatedAt": "2022-04-20T10:21:48.000Z",
        "region_id": 2,
        "LoginHistories": [
            {
                "type": "login",
                "createdAt": "2022-04-20T07:45:52.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-18T10:22:31.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-16T12:23:09.000Z"
            },
            {
                "type": "logout",
                "createdAt": "2022-02-15T11:37:24.000Z"
            },
            {
                "type": "login",
                "createdAt": "2022-02-15T11:26:33.000Z"
            }
        ],
        "Notifications": [
            {
                "id": 1,
                "user_id": 93,
                "title": "game outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 1,
                "deletedAt": null,
                "createdAt": "2022-03-04T10:40:10.000Z",
                "updatedAt": "2022-04-20T09:10:53.000Z"
            },
            {
                "id": 2,
                "user_id": 93,
                "title": "gamer outlet has been checked-in!",
                "data": "Check-in",
                "isRead": 1,
                "deletedAt": null,
                "createdAt": "2022-03-04T06:01:37.000Z",
                "updatedAt": "2022-04-20T09:10:53.000Z"
            }
        ],
        "projectsCount": 1,
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMsImlhdCI6MTY1MDQ1MDEwOCwiZXhwIjo0MjQyNDUwMTA4fQ.PQEwIP7rDB939mgACWBBD4p084Xxa3gF01_2sXv6bNU"
    },
    "success": true,
    "message": "User payment QR deleted successfully!!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to delete user QR code!",
    "code": 401
}
 */

router.post("/deleteQRCode", controller.deleteQRCode);

/**
 * 
 * @api {get} v1/user-profile/loginLogs  F. Login Logs
 * @apiName Login Logs
 * @apiGroup User-Profile(v1)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token

* @apiSuccessExample Success Response
 * {
        "payload": {
        "data": {
            "count": 3,
            "rows": [
                {
                    "id": 1,
                    "user_id": 93,
                    "type": "login",
                    "deletedAt": null,
                    "createdAt": "2022-04-20T07:45:52.000Z",
                    "updatedAt": "2022-04-20T07:45:52.000Z"
                },
                {
                    "id": 2,
                    "user_id": 93,
                    "type": "login",
                    "deletedAt": null,
                    "createdAt": "2022-02-18T10:22:31.000Z",
                    "updatedAt": "2022-02-18T10:22:31.000Z"
                },
                 {
                    "id": 3,
                    "user_id": 93,
                    "type": "login",
                    "deletedAt": null,
                    "createdAt": "2022-02-14T13:04:13.000Z",
                    "updatedAt": "2022-02-14T13:04:13.000Z"
                }
              
            ]
        }
    },
    "success": true,
    "message": "Login logs fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Login logs!",
    "code": 401
}
 */

router.get("/loginLogs", controller.loginLogs);

/**
 * 
 * @api {get} v1/user-profile/notificationLogs  G. Notification Logs
 * @apiName Notification Logs
 * @apiGroup User-Profile(v1)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token

* @apiSuccessExample Success Response
 * {
        "payload": {
        "data": {
            "count": 3,
            "rows": [
                {
                    "id": 1,
                    "user_id": 93,
                    "title": "game outlet has been checked-in!",
                    "data": "Check-in",
                    "isRead": 1,
                    "deletedAt": null,
                    "createdAt": "2022-03-04T10:40:10.000Z",
                    "updatedAt": "2022-04-20T09:10:53.000Z"
                },
                {
                    "id": 2,
                    "user_id": 93,
                    "title": "QA outlet has been checked-in!",
                    "data": "Check-in",
                    "isRead": 1,
                    "deletedAt": null,
                    "createdAt": "2022-02-25T12:29:36.000Z",
                    "updatedAt": "2022-04-20T09:10:53.000Z"
                },
                {
                    "id": 3,
                    "user_id": 93,
                    "title": "ff outlet has been checked-in!",
                    "data": "Check-in",
                    "isRead": 1,
                    "deletedAt": null,
                    "createdAt": "2022-02-24T10:39:02.000Z",
                    "updatedAt": "2022-04-20T09:10:53.000Z"
                },
              
            ]
        }
    },
    "success": true,
    "message": "Notification logs fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Notification logs!",
    "code": 401
}
 */

router.get("/notificationLogs", controller.notificationLogs);

module.exports = router;
