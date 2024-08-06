let express = require('express');
let router = express.Router();
let controller = require("./index.controller");


/**
 * @api {get} admin/roles/ A. All Roles List
 * @apiName All Roles List
 * @apiGroup Roles(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *
 * @apiSuccessExample Success Response
 * {
        "payload": {
        "data": {
            "count": 8,
            "rows": [
                {
                    "id": 16,
                    "name": "Administrator",
                    "status": 1,
                    "accept_request": 0,
                    "deletedAt": null,
                    "createdAt": "2022-02-03T07:14:33.000Z",
                    "updatedAt": "2022-02-03T07:14:33.000Z"
                },
                {
                    "id": 14,
                    "name": "ADMIN",
                    "status": 1,
                    "accept_request": 0,
                    "deletedAt": null,
                    "createdAt": "2022-01-25T04:09:49.000Z",
                    "updatedAt": "2022-02-02T07:04:52.000Z"
                },
                {
                    "id": 12,
                    "name": "hacker",
                    "status": 1,
                    "accept_request": 0,
                    "deletedAt": null,
                    "createdAt": "2022-01-21T12:42:44.000Z",
                    "updatedAt": "2022-01-24T05:20:47.000Z"
                },
                {
                    "id": 6,
                    "name": "BA",
                    "status": 1,
                    "accept_request": 0,
                    "deletedAt": null,
                    "createdAt": "2022-01-04T10:20:24.000Z",
                    "updatedAt": "2022-01-04T10:20:24.000Z"
                },
                {
                    "id": 5,
                    "name": "SV",
                    "status": 1,
                    "accept_request": 0,
                    "deletedAt": null,
                    "createdAt": "2022-01-04T10:20:17.000Z",
                    "updatedAt": "2022-01-04T10:20:17.000Z"
                },
                {
                    "id": 4,
                    "name": "sales",
                    "status": 1,
                    "accept_request": 0,
                    "deletedAt": null,
                    "createdAt": "2021-12-29T06:04:58.000Z",
                    "updatedAt": "2021-12-29T06:04:58.000Z"
                },
                {
                    "id": 2,
                    "name": "Supervisersss",
                    "status": 1,
                    "accept_request": 0,
                    "deletedAt": null,
                    "createdAt": "2021-12-14T08:07:58.000Z",
                    "updatedAt": "2021-12-22T12:38:10.000Z"
                },
                {
                    "id": 1,
                    "name": "Agent",
                    "status": 1,
                    "accept_request": 1,
                    "deletedAt": null,
                    "createdAt": "2021-12-14T08:07:58.000Z",
                    "updatedAt": "2021-12-14T08:07:58.000Z"
                }
            ]
        }
    },
    "success": true,
    "message": "Roles fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Roles",
    "code": 401
}
 */

router.get('/', controller.rolesList);

/**
 * @api {post} admin/roles/addRole B. Add Role
 * @apiName Add Role
 * @apiGroup Roles(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {string}  name   Role Name.

 * @apiSuccessExample Success Response
 * { 
    "success": true,
    "message": "Role created successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to create role",
    "code": 401
}
 */

router.post('/addRole', controller.addRole);

/**
 * @api {post} admin/roles/deleteRole D. Delete Role
 * @apiName Delete Role
 * @apiGroup Roles(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 
 * @apiParam {Number} id     Role ID.


 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Role deleted successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to delete role!",
    "code": 401
}
 */

router.post('/deleteRole', controller.deleteRole);

/**
 * @api {post} admin/roles/editrole C. Edit Role
 * @apiName Edit Role
 * @apiGroup Roles(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 *
 * 
 * @apiParam {Number} id             Role ID.
 * @apiParam {String} name           Role Name.
 * @apiParam {String} status         Role Status.



 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Role updated successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to update role!",
    "code": 400
}
 */

router.post('/editRole', controller.editRole);

/**
 * @api {get} admin/roles/getAllRoles E. Get All Role
 * @apiName  Get All Role
 * @apiGroup Roles(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *


 * @apiSuccessExample Success Response
 * {
        "payload": {
        "data": {
            "count": 11,
            "rows": [
                {
                    "id": 1,
                    "name": "Supervisersss"
                },
                {
                    "id": 2,
                    "name": "Agent"
                },
                {
                    "id": 3,
                    "name": "ttt"
                },
                {
                    "id": 4,
                    "name": "sales"
                },
                {
                    "id": 5,
                    "name": "SV"
                },
                {
                    "id": 6,
                    "name": "BA"
                },
                {
                    "id": 12,
                    "name": "hacker"
                },
                {
                    "id": 14,
                    "name": "ADMIN"
                },
                {
                    "id": 16,
                    "name": "Administrator"
                },
                {
                    "id": 17,
                    "name": "test-11"
                },
                {
                    "id": 21,
                    "name": "test1"
                }
            ]
        }
    },
    "success": true,
    "message": "Roles fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to fetch Roles",
    "code": 401
}
 */

router.get('/getAllRoles', controller.getAllRoles);

module.exports = router;