let express = require('express');
let router = express.Router();
let controller = require("./index.controller");

/**
 * @api {post} admin/auth/login A. Log In
 * @apiName Login
 * @apiGroup Auth(admin)
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Content-Type application/json

 * @apiParam {String} email       User email address.
 * @apiParam {String} password    Password of user.

 * @apiSuccessExample Success Response
 * {
     "payload": {
        "profile_picture": "http://127.0.0.1:8005/media/thumbnail/qPLtwCBYQe.jpg",
        "qr_code": [],
        "id": 1,
        "system_id": "#6545",
        "email": "admin@app.com",
        "username": "adminsssswSSSS",
        "contact_number": "12345678900",
        "resetToken": null,
        "last_login": "2021-08-24T06:35:12.000Z",
        "is_verified": null,
        "status": 1,
        "role_id": 0,
        "deletedAt": null,
        "createdAt": "2021-08-24T06:35:12.000Z",
        "updatedAt": "2022-02-03T05:37:50.000Z",
        "region_id": null,
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ4NjIyMzc2LCJleHAiOjQyNDA2MjIzNzZ9.h3hcmDlw2o6SJ0V5p0USHFXlxji6iN4TYFOLQHz1B9Y"
    },
    "success": true,
    "message": "",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Email  is required",
    "code": 400
}
 */

router.post('/login', controller.login);

/**
 * 
 * @api {post} admin/auth/forgotPassword  C. Forgot Password
 * @apiName Forgot Password
 * @apiGroup Auth(admin)
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization Bearer C_token
 *

 * @apiParam {String} email    User email address.
 

 * @apiSuccessExample Success Response

*{
    "success": true,
    "message": "Reset password email sent! Please check your email to continue.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Email is required.",
     "code": 400
}
 */

router.post("/forgotPassword", controller.forgotPassword);

/**
 * @api {post}  admin/auth/changePassword  D. Change Password
 * @apiName changePassword
 * @apiGroup Auth(admin)
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Content-Type application/json

 * @apiParam {String} email       User email address.
 * @apiParam {String} password    New password of user which need to set.
 * @apiParam {String} token       Token for change password which is sent to user.

 * @apiSuccessExample Success Response

*{
    "success": true,
    "message": "Password updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to update password!",
    "code": 500
}
 */

router.post("/changePassword", controller.changePassword);

/**
 * 
 * @api {post} admin/auth/logout  B. Logout
 * @apiName Logout
 * @apiGroup Auth(admin)
 * @apiVersion 0.0.0
 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json


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

router.get('/logout', controller.logout);

module.exports = router;