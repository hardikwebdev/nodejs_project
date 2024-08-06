let express = require('express');
let router = express.Router();
let controller = require("./index.controller");
let upload = require("../../../middleware/image_upload");


/**
 * @api {get} admin/users A. Users List
 * @apiName Users List
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *


 * @apiSuccessExample Success Response
 * {
     "payload": {
        "data": {
            "count": 2,
            "rows": [
                {
                    "profile_picture": "",
                    "qr_code": [],
                    "id": 112,
                    "system_id": "#51615984",
                    "email": "kamal@app.com",
                    "password": "$2a$10$bG9tLgSrWwkNDGGgpRz81.YbCDUJ0Pvhlg4qAmdJCzSocf7SZCFS.",
                    "username": "Kamal",
                    "contact_number": "1231231231",
                    "resetToken": null,
                    "last_login": null,
                    "is_verified": null,
                    "status": 1,
                    "role_id": 1,
                    "deletedAt": null,
                    "createdAt": "2022-03-04T12:04:33.000Z",
                    "updatedAt": "2022-03-04T12:04:33.000Z",
                    "region_id": 2,
                    "UserProjects": [
                        {
                            "project_id": 78,
                            "Project": {
                                "title": "Water Bottle",
                                "description": "Water"
                            }
                        }
                    ],
                    "Role": {
                        "name": "Supervisersss"
                    }
                },
                {
                    "profile_picture": "",
                    "qr_code": [],
                    "id": 111,
                    "system_id": "#22568317",
                    "email": "hiten@app.com",
                    "password": "$2a$10$bhF7oIUoA3nuPoP.HQmU4OYUddmB.NklueXhfQHRyiXE3Xu8jxAQe",
                    "username": "Hiten",
                    "contact_number": "1231231230",
                    "resetToken": null,
                    "last_login": null,
                    "is_verified": null,
                    "status": 1,
                    "role_id": 1,
                    "deletedAt": null,
                    "createdAt": "2022-03-04T10:52:46.000Z",
                    "updatedAt": "2022-03-04T10:55:13.000Z",
                    "region_id": 2,
                    "UserProjects": [
                        {
                            "project_id": 78,
                            "Project": {
                                "title": "Water Bottle",
                                "description": "Water"
                            }
                        }
                    ],
                    "Role": {
                        "name": "Supervisersss"
                    }
              ]
        }
    },
    "success": true,
    "message": "Users fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Users",
    "code": 401
}
 */
router.get('/', controller.usersList);

/**
 * @api {get} admin/users/allUsers B. All Users
 * @apiName All Users
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *


 * @apiSuccessExample Success Response
 * {
        "payload": {
        "data": {
            "count": 2,
            "rows": [
                {
                    "profile_picture": "",
                    "qr_code": [],
                    "id": 112,
                    "system_id": "#51615984",
                    "email": "kamal@app.com",
                    "password": "$2a$10$bG9tLgSrWwkNDGGgpRz81.YbCDUJ0Pvhlg4qAmdJCzSocf7SZCFS.",
                    "username": "Kamal",
                    "contact_number": "1231231231",
                    "resetToken": null,
                    "last_login": null,
                    "is_verified": null,
                    "status": 1,
                    "role_id": 1,
                    "deletedAt": null,
                    "createdAt": "2022-03-04T12:04:33.000Z",
                    "updatedAt": "2022-03-04T12:04:33.000Z",
                    "region_id": 2
                },
                {
                    "profile_picture": "",
                    "qr_code": [],
                    "id": 111,
                    "system_id": "#22568317",
                    "email": "hiten@app.com",
                    "password": "$2a$10$bhF7oIUoA3nuPoP.HQmU4OYUddmB.NklueXhfQHRyiXE3Xu8jxAQe",
                    "username": "Hiten",
                    "contact_number": "1231231230",
                    "resetToken": null,
                    "last_login": null,
                    "is_verified": null,
                    "status": 1,
                    "role_id": 1,
                    "deletedAt": null,
                    "createdAt": "2022-03-04T10:52:46.000Z",
                    "updatedAt": "2022-03-04T10:55:13.000Z",
                    "region_id": 2
                },
              ]
        }
    },
    "success": true,
    "message": "Users fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Users",
    "code": 401
}
 */

router.get('/allUsers', controller.allUsers);

/**
 * @api {post} admin/users/add C. Add User
 * @apiName Add User
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {Number} id                User ID.
 * @apiParam {String} email             User Email.
 * @apiParam {String} username          User Username.
 * @apiParam {String} password          User Password.
 * @apiParam {String} contact_number    User Contact Number.


 * @apiSuccessExample Success Response
 * {
        "payload": {
            {
                 user_id: 5 
            }
        
    },
    "success": true,
    "message": "User added successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "User already exist with same email address or username",
    "code": 401
}
 */

router.post('/add', upload.single('file'), controller.addUser);

/**
 * @api {post} admin/users/editUser D. Edit User
 * @apiName Edit User
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {Number} id                User ID.
 * @apiParam {String} email             User Email.
 * @apiParam {String} username          User Username.
 * @apiParam {String} password          User Password.
 * @apiParam {String} contact_number    User Contact Number.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "User updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to update User",
    "code": 401
}
 */

router.post('/editUser', controller.editUser);

/**
 * @api {post} admin/users/editUserImg E. edit User Image
 * @apiName Edit User Image
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * 
 * @apiParam {Number} id                      User ID.
 * @apiParam {file} profile_picture           User Profile Picture Image.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "User Image updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "User Image not updated!",
    "code": 401
}
 */

router.post('/editUserImg', upload.single('file'), controller.editUserImg);

/**
 * @api {post} admin/users/addQRCode F. Add QR Image
 * @apiName Add QR Image
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * 
 * @apiParam {Object} data           Contains User ID for whom to upload file.
 * @apiParam {file}   file           Image for QR Code.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "QR Image updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "QR Image not updated!",
    "code": 401
}
 */
router.post('/addQRCode', upload.single('file'), controller.addQRCode);

/**
 * @api {post} admin/users/deleteQRCode G. Delete QR Image
 * @apiName DElete QR Image
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * 
 * @apiParam {String} user_id        User ID for whom to delete file.
 * @apiParam {String} url            Image url to be deleted


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "QR Image deleted successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "QR Image not deleted!",
    "code": 401
}
 */
router.post('/deleteQRCode', controller.deleteQRCode);

/**
 * @api {post} admin/users/deleteuser H. Delete User
 * @apiName Delete User
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * 
 * @apiParam {Integer} Id       User ID.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "User deleted successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to delete User!",
    "code": 401
}
 */

router.post('/deleteUser', controller.deleteUser);


/**
 * @api {get} admin/users/loginLogs I. Login User Logs
 * @apiName Login User Logs
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 


 * @apiSuccessExample Success Response
 * {
    "payload": {
        "data": {
            "count": 0,
            "rows": []
        }
    },
    "success": true,
    "message": "Login logs fetched successfully.",
    "code": 200
}
 * @apiErrorExample Error Response
{
    "success": false,
    "message": "User not found!",
    "code": 401
}
 */
router.get('/loginLogs', controller.loginLogs);

/**
 * @api {post} admin/users/handleUserStatus J. Update User Status
 * @apiName Update User Status
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * 
 * @apiParam {Number} id       User ID.
 * @apiParam {Number} status   User Status.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "User status updated successfully!",
    "code": 200
}
 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to update user status!",
    "code": 400
}
 */

router.post('/handleUserStatus', controller.handleUserStatus);


/**
 * @api {get} admin/users/effectiveUsers K. List Of EffectiveUsers
 * @apiName List Of EffectiveUsers
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *


 * @apiSuccessExample Success Response
 * {
     "payload": {
        "effectiveCount": 1,
        "effectiveData": [
            {
                "brands_variant": [],
                "project_id": 78,
                "outlet_id": 661,
                "id": 12110,
                "visitation_id": 3328,
                "user_id": 112,
                "status": 1,
                "isEffective": 1,
                "isFree": 0,
                "isVerified": 0,
                "description": null,
                "gender": "Male",
                "age_group": "25-35",
                "group_segment": "Hipsters",
                "effective_name": null,
                "effective_email": null,
                "effective_contact": null,
                "deletedAt": null,
                "createdAt": "2022-03-09T12:06:53.000Z",
                "updatedAt": "2022-03-09T12:06:53.000Z",
                "Project": {
                    "title": "Water Bottle"
                },
                "User": {
                    "username": "Kamal",
                    "system_id": "#51615984"
                },
                "OrderDetails": [
                    {
                        "quantity": 1,
                        "total_amount": 5000,
                        "Product": {
                            "id": 51,
                            "name": "teass"
                        }
                    },
                    {
                        "quantity": 1,
                        "total_amount": 17.4,
                        "Product": {
                            "id": 2,
                            "name": "Mevius LSS Menthol White"
                        }
                    }
                ],
                "Outlet": {
                    "address": "3 Rue Paul Chenavard, Lyon, 69001, France",
                    "outlet_name": "Gamer3",
                    "city": "Lyon",
                    "state": "France",
                    "postal_code": "69001"
                },
                "contact_tags": [
                    "Effective FC"
                ]
            },            
        ]
    },
    "success": true,
    "message": "Effective Users fetched!",
    "code": 200    

}
 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Effective Users!",
    "code": 400
}
 */

router.get('/effectiveUsers', controller.effectiveUsers);

/**
 * @api {get} users/effectiveUsers L. Get list effectiveUsers
 * @apiName list of effectiveUsers
 * @apiGroup Users(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *


 * @apiSuccessExample Success Response
 * {
     "payload": {
      url: http://127.0.0.1:8005/media/download/EXPORT_EFFECTIVE_USERS.csv
    },
    "success": true,
    "message": "CSV file exported successfully.",
    "code": 200    

}
 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to create CSV!",
    "code": 400
}
 */

router.post('/exportEffectiveUsersCSV', controller.exportEffectiveUsersCSV);

module.exports = router;