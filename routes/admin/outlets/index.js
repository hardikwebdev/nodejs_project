let express = require("express");

let controller = require("./index.controller");
let router = express.Router();
let upload = require("../../../middleware/image_upload");


/**
 * @api {get} outlets/getAddress A. Get Address
 * @apiName Get Address
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *
 * @apiSuccessExample Success Response
 * { "payload": {
        "city": "Ahmedabad",
        "state": "India",
        "postal_code": "380054"
    },
    "success": true,
    "message": "Address fetched successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Address not fetched!",
    "code": 401
}
 */
router.post("/getAddress", controller.getAddress);

/**
 * @api {get} admin/outlets/ B. Get Project Outlet List
 * @apiName Get Project Outlet List
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * 
 * @apiParam {Number} project_id Project ID.
 *
 * @apiSuccessExample Success Response
 * {
    "payload": [
        {
            "day": "tuesday",
            "Outlets": [
                {
                    "outlet_url": "",
                    "address": "3 Rue Paul Chenavard, Lyon, 69001, France",
                    "id": 36,
                    "outlet_name": "ggh???????",
                    "outlet_email": "gghh@gmail.com",
                    "outlet_contact": "1234567890",
                    "postal_code": "69001",
                    "city": "Lyon",
                    "state": "France",
                    "owner_name": "hh$\"'\"\"",
                    "owner_email": "?????@gmail.com",
                    "owner_contact": "1234567890",
                    "person_name": "",
                    "person_email": "",
                    "person_contact": "",
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2022-01-04T09:26:57.000Z",
                    "updatedAt": "2022-01-04T09:26:57.000Z",
                    "outlet_open_id": 45
                },
                {
                    "outlet_url": "",
                    "address": "3 Rue Paul Chenavard, Lyon, 69001, France",
                    "id": 41,
                    "outlet_name": "tty",
                    "outlet_email": "ty@gmail.com",
                    "outlet_contact": "1234567890",
                    "postal_code": "69001",
                    "city": "Lyon",
                    "state": "France",
                    "owner_name": "ty",
                    "owner_email": "ty@gmail.com",
                    "owner_contact": "1234567890",
                    "person_name": "",
                    "person_email": "",
                    "person_contact": "",
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2022-01-04T11:28:13.000Z",
                    "updatedAt": "2022-01-04T11:28:13.000Z",
                    "outlet_open_id": 50
                }
            ]
        },
        {
            "day": "thursday",
            "Outlets": [
                {
                    "outlet_url": "http://127.0.0.1:8005/media/thumbnail/IcM22EwIaa.jpg",
                    "address": "3 Rue Paul Chenavard, Lyon, 69001, France",
                    "id": 227,
                    "outlet_name": "as",
                    "outlet_email": "aas@gmail.com",
                    "outlet_contact": "1234567890",
                    "postal_code": "69001",
                    "city": "Lyon",
                    "state": "France",
                    "owner_name": "as",
                    "owner_email": "as@gmail.com",
                    "owner_contact": "1234567890",
                    "person_name": "as",
                    "person_email": "as@gmail.com",
                    "person_contact": "1234567890",
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2022-01-06T06:42:27.000Z",
                    "updatedAt": "2022-01-06T06:42:27.000Z",
                    "outlet_open_id": 235
                }
            ]
        }
    ],
    "success": true,
    "message": "Outlet list fetched successfully!",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Outlets not found",
    "code": 401
}
 */

router.get("/", controller.projectOutletList);

/**
 * @api {get} admin/outlets/list C. Outlet List
 * @apiName Outlets List
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *
 * @apiSuccessExample Success Response
 * {
    "payload": {
        "data": {
            "count": 944,
            "rows": [
                {
                    "outlet_url": "",
                    "address": "18, Jalan Telawi 2, Bangsar, 59000, Wilayah Persekutuan Kuala Lumpur",
                    "id": 966,
                    "outlet_name": "Shuruti Box Kuala Lumpur",
                    "outlet_email": "shurutibox@gmail.com",
                    "outlet_contact": "0143362545",
                    "postal_code": "59000",
                    "city": "Bangsar",
                    "state": "Wilayah Persekutuan Kuala Lumpur",
                    "owner_name": "Dass",
                    "owner_email": "shurutibox@gmail.com",
                    "owner_contact": "0143363545",
                    "person_name": "",
                    "person_email": "",
                    "person_contact": "",
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2022-04-16T14:32:28.000Z",
                    "updatedAt": "2022-04-16T14:32:28.000Z",
                    "addressOrg": "18",
                    "days": [
                        {
                            "name": "saturday",
                            "outlet_open_id": 1683,
                            "checked": true
                        }
                    ],
                    "outlet_days": [
                        "saturday"
                    ]
                },
                {
                    "outlet_url": "",
                    "address": "240 Jalan S2 B10, Seremban, 70300, Malaysia",
                    "id": 965,
                    "outlet_name": "The loft roof top",
                    "outlet_email": "theloftroof_top@live.com",
                    "outlet_contact": "0122833267",
                    "postal_code": "70300",
                    "city": "Seremban",
                    "state": "Malaysia",
                    "owner_name": "Jason",
                    "owner_email": "theloftroof_top@live.com",
                    "owner_contact": "0122833267",
                    "person_name": "Jason",
                    "person_email": "thelooftroof_top@live.com",
                    "person_contact": "0122833267",
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2022-04-16T11:22:47.000Z",
                    "updatedAt": "2022-04-16T11:22:47.000Z",
                    "addressOrg": "240 Jalan S2 B10",
                    "days": [
                        {
                            "name": "saturday",
                            "outlet_open_id": 1682,
                            "checked": true
                        }
                    ],
                    "outlet_days": [
                        "saturday"
                    ]
                },
                {
                    "outlet_url": "",
                    "address": "48 Jalan S2 B16, Seremban, 70300, Malaysia",
                    "id": 964,
                    "outlet_name": "Phoenix",
                    "outlet_email": "keong97@gmail.com",
                    "outlet_contact": "0182431008",
                    "postal_code": "70300",
                    "city": "Seremban",
                    "state": "Malaysia",
                    "owner_name": "Keong",
                    "owner_email": "keong97@gmail.com",
                    "owner_contact": "0182431008",
                    "person_name": "",
                    "person_email": "",
                    "person_contact": "",
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2022-04-16T10:11:11.000Z",
                    "updatedAt": "2022-04-16T10:11:11.000Z",
                    "addressOrg": "48 Jalan S2 B16",
                    "days": [
                        {
                            "name": "saturday",
                            "outlet_open_id": 1681,
                            "checked": true
                        }
                    ],
                    "outlet_days": [
                        "saturday"
                    ]
                },
]
        }
    },
    "success": true,
    "message": "Outlets fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Outlets not found",
    "code": 401
}
 */

router.get("/list", controller.outletList);

/**
 * @api {get} admin/outlets/getAlllist D. Get All List
 * @apiName Get All List
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 *
 * @apiSuccessExample Success Response
 * {
     "payload": {
        "data": {
            "rows": [
                {
                    "outlet_url": "http://127.0.0.1:8005/media/thumbnail/7p0JDyJa0p.jpg",
                    "address": "3 Rue Paul Chenavard, Lyon, 69001, France",
                    "id": 1,
                    "outlet_name": "Resta",
                    "outlet_email": null,
                    "outlet_contact": null,
                    "postal_code": "69001",
                    "city": "Lyon",
                    "state": "France",
                    "owner_name": "abcd",
                    "owner_email": "abc@app.com",
                    "owner_contact": "6436346656",
                    "person_name": "adasa",
                    "person_email": "dsad@g.vom",
                    "person_contact": "654645656",
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2021-12-17T10:30:18.000Z",
                    "updatedAt": "2021-12-17T10:30:18.000Z",
                    "addressOrg": "3 Rue Paul Chenavard",
                    "days": [
                        {
                            "outlet_open_id": 1,
                            "name": "monday",
                            "checked": true
                        },
                        {
                            "outlet_open_id": 2,
                            "name": "tuesday",
                            "checked": true
                        }
                    ],
                    "outlet_days": [
                        "monday",
                        "tuesday"
                    ]
                },
                {
                    "outlet_url": "http://127.0.0.1:8005/media/thumbnail/7p0JDyJa0p.jpg",
                    "address": "3 Rue Paul Chenavard, Lyon, 69001, France",
                    "id": 2,
                    "outlet_name": "Bella",
                    "outlet_email": null,
                    "outlet_contact": null,
                    "postal_code": "69001",
                    "city": "Lyon",
                    "state": "France",
                    "owner_name": "abcd",
                    "owner_email": "abc@app.com",
                    "owner_contact": "6436346656",
                    "person_name": "adasa",
                    "person_email": "dsad@g.vom",
                    "person_contact": "654645656",
                    "status": 1,
                    "deletedAt": null,
                    "createdAt": "2021-12-17T10:30:18.000Z",
                    "updatedAt": "2021-12-17T10:30:18.000Z",
                    "addressOrg": "3 Rue Paul Chenavard",
                    "days": [
                        {
                            "outlet_open_id": 3,
                            "name": "monday",
                            "checked": true
                        },
                        {
                            "outlet_open_id": 4,
                            "name": "wednesday",
                            "checked": true
                        }
                    ],
                    "outlet_days": [
                        "monday",
                        "wednesday"
                    ]
                },
            ]
        }
    },
    "success": true,
    "message": "Outlets fetched successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Outlets not found",
    "code": 401
}
 */
router.get("/getAlllist", controller.getAlllist);

/**
 * @api {post} admin/outlets/createOutlet E. Create Outlet
 * @apiName Create Outlet
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {String} outlet_name      Outlet Name.
 * @apiParam {String} address          Outlet Address.
 * @apiParam {String} city             Outlet City.
 * @apiParam {String} state            Outlet State.
 * @apiParam {String} postal_code      Outlet Postal code.
 * @apiParam {String} owner_name       Outlet Owner name.
 * @apiParam {String} owner_email      Outlet Owner email address.
 * @apiParam {String} owner_contact    Outlet Owner contact number.
 * @apiParam {String} outlet_email     Outlet email address.
 * @apiParam {String} outlet_contact   Outlet contact number.
 * @apiParam {String} person_name      Outlet person in-charge name.
 * @apiParam {String} person_email     Outlet person in-charge email address.
 * @apiParam {String} person_contact   Outlet person in-charge contact number.
 *
 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Outlets created successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Outlets not found",
    "code": 401
}
 */
router.post("/createOutlet", upload.single('file'), controller.createOutlet);

/**
 * @api {post} admin/outlets/createOutlet F. Update Outlet
 * @apiName Update Outlet
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {Number} id               Outlet ID.
 * @apiParam {String} outlet_name      Outlet Name.
 * @apiParam {String} address          Outlet Address.
 * @apiParam {String} city             Outlet City.
 * @apiParam {String} state            Outlet State.
 * @apiParam {String} postal_code      Outlet Postal code.
 * @apiParam {String} owner_name       Outlet Owner name.
 * @apiParam {String} owner_email      Outlet Owner email address.
 * @apiParam {String} owner_contact    Outlet Owner contact number.
 * @apiParam {String} outlet_email     Outlet email address.
 * @apiParam {String} outlet_contact   Outlet contact number.
 * @apiParam {String} person_name      Outlet person in-charge name.
 * @apiParam {String} person_email     Outlet person in-charge email address.
 * @apiParam {String} person_contact   Outlet person in-charge contact number.
 *
 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Outlets updated successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Outlets not found",
    "code": 401
}
 */
router.post("/editOutlet", upload.single('file'), controller.editOutlet);

/**
 * @api {post} admin/outlets/editOutletStatus G. Update Outlet Status
 * @apiName Update Outlet Status
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {Number} id               Outlet ID.
 * @apiParam {Number} status           Outlet Status.
 *
 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Outlet status updated successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to update status!",
    "code": 401
}
 */

router.post("/editOutletStatus", controller.editOutletStatus);

/**
 * @api {post} admin/outlets/deleteOutlet H. Delete Outlet Status
 * @apiName Delete Outlet Status
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {Number} id               Outlet ID.
 *
 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Outlet deleted successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to delete outlet!",
    "code": 401
}
 */

router.post("/deleteOutlet", controller.deleteOutlet);

/**
 * @api {post} admin/outlets/assignOutlet I. Assign Outlet
 * @apiName Assign Outlet
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {Number} id               Outlet ID.
 * @apiParam {Number} project_id       Project ID.
 * @apiParam {Array}  selectedDay      Days array for which day this outlet is working
 *
 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Outlet assigned successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to assign outlet!",
    "code": 401
}
 */
router.post("/assignOutlet", controller.assignOutlet);

/**
 * @api {post} admin/outlets/assignOutlet J. Unassign Outlet
 * @apiName Unassign Outlet
 * @apiGroup Outlets(admin)
 * @apiVersion 0.0.0
 * 
 * @apiHeader {String} Authorization Bearer C_token
 * @apiHeader {String} Content-Type application/json
 * 
 * @apiParam {Number} id               Outlet ID.
 * @apiParam {Number} project_id       Project ID.
 * @apiParam {Array}  day              Days array for which remove outlet
 *
 * @apiSuccessExample Success Response
 * {
    "success": true,
    "message": "Outlet unassigned successfully.",
    "code": 200
}

 * @apiErrorExample Error Response
{
    "success": false,
    "message": "Failed to unassign outlet!",
    "code": 401
}
 */
router.post("/unassignOutlet", controller.unassignOutlet);

module.exports = router;
