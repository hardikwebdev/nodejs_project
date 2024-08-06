let express = require('express');
let router = express.Router();
let controller = require("./index.controller");

/**
 * @api {get} admin/ A. Get Profile
 * @apiName Get Profile
 * @apiGroup Admin Profile(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *
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
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwMzUxNjc4LCJleHAiOjQyNDIzNTE2Nzh9.fdN5b5VJBmeeuaeEJ0phQhwL7QnYHt4vbDkBQvL7FWU"
    },
    "success": true,
    "message": "",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "User not found.",
    "code": 401
}
 */
router.get('/', controller.getUser);

/**
 * @api {post} admin/updatePassword B. Admin Update Password
 * @apiName Admin Update Password
 * @apiGroup Admin Profile(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {String} email           Email address of admin.
 * @apiParam {String} password        Password for admin to be changed.

 * @apiSuccessExample Success Response
 * { 
    "success": true,
    "message": "Password updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to update Password!",
    "code": 500
}
 */
router.post('/updatePassword', controller.updatePassword);

/**
 * @api {post} users/editUser C. Edit Profile
 * @apiName Edit Profile
 * @apiGroup Admin Profile(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {String} email           email.
 * @apiParam {String} username        username.




 * @apiSuccessExample Success Response
 * { 
    "success": true,
    "message": "Profile updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to update user as user already exist with same email address or username!",
    "code": 500
}
 */
router.post('/editUser', controller.editUser);

module.exports = router;