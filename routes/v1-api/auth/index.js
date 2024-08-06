let express = require('express');
let router = express.Router();
let controller = require("./index.controller");
let AuthMiddleware = require("../../../middleware/api-auth").AuthMiddleware;
/**
 * @api {post} v1/auth/login A. Log In
 * @apiName Login
 * @apiGroup Auth(v1)
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Content-Type application/json

 * @apiParam {String} username       User email address or username.
 * @apiParam {String} password       Password of user.
 * @apiParam {String} device_token   User device token.
 * @apiParam {String} device_type    User device type.

 * @apiSuccessExample Success Response
 * {
    "payload": {
        "profile_picture": "http://127.0.0.1:8005/media/thumbnail/GqtyoNg6hu.png",
        "qr_code": [
            {
                "url": "http://127.0.0.1:8005/media/thumbnail/eg9TbSyYbe.jpg"
            }
        ],
        "id": 2,
        "system_id": "#6545554",
        "email": "abc@app.com",
        "username": "def",
        "contact_number": "1234567890",
        "resetToken": null,
        "last_login": null,
        "is_verified": null,
        "status": 1,
        "role_id": 1,
        "deletedAt": null,
        "createdAt": "2021-08-24T06:35:12.000Z",
        "updatedAt": "2022-03-02T12:31:47.000Z",
        "region_id": null,
        "accept_request": 0,
        "Notifications": [],
        "LoginHistories": [],
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUwNDM0NTk2LCJleHAiOjQyNDI0MzQ1OTZ9.reDYai_H4rK8nkDTYt3zwx1-7LHYOgNCAfpXjjLJ-cU",
        "device_type": "android",
        "device_token": "6364645645"
    },
    "success": true,
    "message": "",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Username/Email  is required",
    "code": 400
}
 */
router.post('/login', controller.login);

/**
 * 
 * @api {post} v1/auth/logout  B. Logout
 * @apiName Logout
 * @apiGroup Auth(v1)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam  {String} device_type     User device type
 * @apiParam  {String} device_token    User device token


 * @apiSuccessExample Success Response

*{
    "success": true,
    "message": "Logout Successfull.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Unauthorised user.",
     "code": 400
}
 */
module.exports = router;